import { Injectable } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Knowledge } from './entities/knowledge.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(Knowledge)
    private readonly knowledgeRepository: Repository<Knowledge>,
  ) { }
  async create(createKnowledgeDto: CreateKnowledgeDto) {
    return await this.knowledgeRepository.save(createKnowledgeDto);
  }

  findAll() {
    return `This action returns all knowledge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} knowledge`;
  }

  update(id: number, updateKnowledgeDto: UpdateKnowledgeDto) {
    return `This action updates a #${id} knowledge`;
  }

  remove(id: number) {
    return `This action removes a #${id} knowledge`;
  }
}
