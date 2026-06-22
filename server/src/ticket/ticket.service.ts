import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { Repository } from "typeorm";
import { BacklogTicketDto } from "./dto/backlog-ticket.dto";
import { EfficiencyDto } from "./dto/efficiency.dto";
import { TicketStatus } from "./ticket-status.enum";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    return await this.ticketRepository.save({
      ...createTicketDto,
      resolved_at:
        createTicketDto.status === TicketStatus.Resolved ? new Date() : null,
    });
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async findOne(id: number) {
    return await this.ticketRepository.findOneBy({ id });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const patch: Partial<Ticket> = { ...updateTicketDto };

    // Never let the client overwrite server-managed fields
    delete patch.id;
    delete patch.created_at;
    delete patch.updated_at;
    delete patch.resolved_at;

    // Only touch resolved_at on a real status transition, so editing an
    // already-resolved ticket doesn't reset its resolution time.
    if (updateTicketDto.status !== undefined) {
      const current = await this.ticketRepository.findOneBy({ id });
      const wasResolved = current?.status === TicketStatus.Resolved;
      const willBeResolved = updateTicketDto.status === TicketStatus.Resolved;

      if (willBeResolved && !wasResolved) {
        patch.resolved_at = new Date();
      } else if (!willBeResolved && wasResolved) {
        patch.resolved_at = null;
      }
    }

    return await this.ticketRepository.update(id, patch);
  }

  async remove(id: number) {
    return this.ticketRepository.delete(id);
  }

  async backlog(): Promise<BacklogTicketDto> {
    const rows = await this.ticketRepository
      .createQueryBuilder("ticket")
      .select("ticket.status", "status")
      .addSelect("COUNT(*)", "count")
      .groupBy("ticket.status")
      .getRawMany<{ status: number; count: string }>();

    const counts = new Map(
      rows.map((r) => [Number(r.status), Number(r.count)]),
    );

    return new BacklogTicketDto(
      counts.get(TicketStatus.New) ?? 0,
      counts.get(TicketStatus.Pending) ?? 0,
      counts.get(TicketStatus.Resolved) ?? 0,
    );
  }

  async findByAssigned(id: string) {
    return await this.ticketRepository.findBy({
      assigned: id,
    });
  }

  // Resolution-time breakdown of resolved tickets: < 24h, < 72h (3 days), > 72h
  async efficiency(): Promise<EfficiencyDto> {
    const resolved = await this.ticketRepository.findBy({
      status: TicketStatus.Resolved,
    });

    let under24h = 0;
    let under72h = 0;
    let over72h = 0;

    for (const ticket of resolved) {
      if (!ticket.resolved_at || !ticket.created_at) continue;
      const hours =
        (new Date(ticket.resolved_at).getTime() -
          new Date(ticket.created_at).getTime()) /
        3_600_000;
      if (hours < 24) under24h++;
      else if (hours < 72) under72h++;
      else over72h++;
    }

    return { under24h, under72h, over72h };
  }
}
