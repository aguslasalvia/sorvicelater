import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeDto } from './create-knowledge.dto';

export class GetKnowledgeDto extends PartialType(CreateKnowledgeDto) {
  id: number;
}
