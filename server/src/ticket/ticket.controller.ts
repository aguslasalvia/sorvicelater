import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // ---------------------------------- //
  // BACKLOG
  // --------------------------------- //

  // Returns the backlog of tickets (new, pending, and resolved)
  @Get("backlog")
  @UseGuards(JwtAuthGuard)
  async backlog() {
    return await this.ticketService.backlog();
  }

  // Returns the last 15 tickets created, ordered by creation date
  @Get("last")
  @UseGuards(JwtAuthGuard)
  async lastTickets() {
    return await this.ticketService.lastTickets();
  }

  // Returns the efficiency of the ticket system (time to resolve tickets)
  @Get("efficiency")
  @UseGuards(JwtAuthGuard)
  async efficiency() {
    return await this.ticketService.efficiency();
  }

  // ---------------------------------- //
  // ASSIGNED
  // --------------------------------- //

  @Get("assigned")
  @UseGuards(JwtAuthGuard)
  findByAssigned(@Req() req) {
    // req.user was set by JwtStrategy.validate() -> { id, username }
    return this.ticketService.findByAssigned(req.user.id);
  }

  // ---------------------------------- //
  // CREATE
  // --------------------------------- //

  @Post("")
  @UseGuards(JwtAuthGuard)
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  // ---------------------------------- //
  // CRUD
  // --------------------------------- //

  @Get("")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.ticketService.remove(+id);
  }
}
