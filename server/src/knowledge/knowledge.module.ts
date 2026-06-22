import { Module } from "@nestjs/common";
import { KnowledgeService } from "./knowledge.service";
import { KnowledgeController } from "./knowledge.controller";
import { Knowledge } from "./entities/knowledge.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

@Module({
  imports: [TypeOrmModule.forFeature([Knowledge])],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
})
export class KnowledgeModule {}
