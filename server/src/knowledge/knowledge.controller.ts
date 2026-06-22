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
import { KnowledgeService } from "./knowledge.service";
import { CreateKnowledgeDto } from "./dto/create-knowledge.dto";
import { UpdateKnowledgeDto } from "./dto/update-knowledge.dto";

@Controller("knowledge")
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Post()
  @UseGuards()
  create(@Body() createKnowledgeDto: CreateKnowledgeDto) {
    return this.knowledgeService.create(createKnowledgeDto);
  }

  @Get("all")
  @UseGuards()
  findAll() {
    return this.knowledgeService.findAll();
  }

  @Get(":id")
  @UseGuards()
  findOne(@Param("id") id: string) {
    return this.knowledgeService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards()
  update(
    @Param("id") id: string,
    @Body() updateKnowledgeDto: UpdateKnowledgeDto,
  ) {
    return this.knowledgeService.update(+id, updateKnowledgeDto);
  }

  @Delete(":id")
  @UseGuards()
  remove(@Param("id") id: string) {
    return this.knowledgeService.remove(+id);
  }
}
