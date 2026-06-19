import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { BacklogTicketDto } from './dto/backlog-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) { };

  create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.save(createTicketDto);
  };

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: number) {
    return this.ticketRepository.findOneBy({ id });
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.ticketRepository.update(id, updateTicketDto);
  }

  remove(id: number) {
    return this.ticketRepository.delete(id);
  }

  async backlog(): Promise<BacklogTicketDto> {
    const rows = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('ticket.status IN (:...statuses)', {
        statuses: ['new', 'pending', 'resolved'],
      })
      .groupBy('ticket.status')
      .getRawMany<{ status: string; count: string }>();

    const counts = new Map(rows.map((r) => [r.status, Number(r.count)]));

    return new BacklogTicketDto(
      counts.get('new') ?? 0,
      counts.get('pending') ?? 0,
      counts.get('resolved') ?? 0,
    );

  }
}
