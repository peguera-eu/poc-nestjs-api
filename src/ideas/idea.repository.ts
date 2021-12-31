import { EntityRepository, Repository } from 'typeorm';
import { Idea } from './idea.entity';
import { CreateIdeaDto } from './dtos/createIdea.dto';
import {
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Idea)
export class IdeaRepository extends Repository<Idea> {
  async createIdea(idea: CreateIdeaDto): Promise<Idea> {
    
    const newIdea = this.create();
    newIdea.name = idea.name;
    newIdea.description = idea.description;
    newIdea.tags = idea.tags;
    try {
      await newIdea.save();
      return newIdea;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error saving new idea',
      );
    }
  }
}
export class IdeasService{}