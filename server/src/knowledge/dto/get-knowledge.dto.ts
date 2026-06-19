import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeDto } from './create-knowledge.dto';

export class GetKnowledgeDto extends PartialType(CreateKnowledgeDto) {
  constructor(id: number, title: string, description: string) {
    super(title, description);
    this.id = id;
  }
  id: number;
}