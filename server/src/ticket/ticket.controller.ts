import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@Controller("ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get("backlog")
  @UseGuards()
  async backlog() {
    return await this.ticketService.backlog();
  }

  @Get("efficiency")
  @UseGuards()
  async efficiency() {
    return await this.ticketService.efficiency();
  }

  @Get("assigned/:id")
  @UseGuards()
  findByAssigned(@Param("id") id: string) {
    return this.ticketService.findByAssigned(id);
  }

  @Post("")
  @UseGuards()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get("all")
  @UseGuards()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(":id")
  @UseGuards()
  findOne(@Param("id") id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards()
  update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(":id")
  @UseGuards()
  remove(@Param("id") id: string) {
    return this.ticketService.remove(+id);
  }
}
