import { Injectable } from '@nestjs/common';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Knowledge } from './entities/knowledge.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { GetKnowledgeDto } from './dto/get-knowledge.dto';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(Knowledge)
    private readonly knowledgeRepository: Repository<Knowledge>,
  ) { }
  async create(createKnowledgeDto: CreateKnowledgeDto) {
    return await this.knowledgeRepository.save(createKnowledgeDto);
  }

  async findAll(): Promise<GetKnowledgeDto[]> {
    return await this.knowledgeRepository.find();
  }

  async findOne(id: number) {
    const k = await this.knowledgeRepository.findOneBy({ id });
    return k;
  }

  async update(id: number, updateKnowledgeDto: UpdateKnowledgeDto) {
    await this.knowledgeRepository.update(id, updateKnowledgeDto);
    return await this.findOne(id);
  }


  remove(id: number) {
    return `This action removes a #${id} knowledge`;
  }
}
