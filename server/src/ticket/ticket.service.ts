import { Injectable } from "@nestjs/common";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";
import { Repository } from "typeorm";
import { BacklogTicketDto } from "./dto/backlog-ticket.dto";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    return await this.ticketRepository.save(createTicketDto);
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async findOne(id: number) {
    return await this.ticketRepository.findOneBy({ id });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return await this.ticketRepository.update(id, updateTicketDto);
  }

  async remove(id: number) {
    return this.ticketRepository.delete(id);
  }

  async backlog(): Promise<BacklogTicketDto> {
    const rows = await this.ticketRepository
      .createQueryBuilder("ticket")
      .select("ticket.status", "status")
      .addSelect("COUNT(*)", "count")
      .where("ticket.status IN (:...statuses)", {
        statuses: ["new", "pending", "resolved"],
      })
      .groupBy("ticket.status")
      .getRawMany<{ status: string; count: string }>();

    const counts = new Map(rows.map((r) => [r.status, Number(r.count)]));

    return new BacklogTicketDto(
      counts.get("new") ?? 0,
      counts.get("pending") ?? 0,
      counts.get("resolved") ?? 0,
    );
  }

  async findByAssigned(id: string) {
    return await this.ticketRepository.findBy({
      assigned: id,
    });
  }
}
