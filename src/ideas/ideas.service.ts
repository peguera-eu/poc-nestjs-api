import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';
import { CreateIdeaDto } from './dtos/createIdea.dto';
import { Idea } from './idea.entity';
import { IdeaRepository } from './idea.repository';

@Injectable()
export class IdeasService {
  constructor(
    @InjectRepository(IdeaRepository)
    private ideaRepository: IdeaRepository,
  ) {}

  async createNewIdea(idea: CreateIdeaDto): Promise<Idea> {
    return await this.ideaRepository.createIdea(idea);
  }

  async findAll(): Promise<Idea[]> {
    return await this.ideaRepository.find({where: {isDeleted: false}})
  }

  async findByTag(tag: string): Promise<Idea[]> {
    return await this.ideaRepository.find({where: 
        [
          {isDeleted: false, tags: ILike(`%,${tag},%`)},
          {isDeleted: false, tags: ILike(`${tag}`)},
          {isDeleted: false, tags: ILike(`%${tag},%`)},
          {isDeleted: false, tags: ILike(`%,${tag}%`)}
        ]
    })
      //TODO refactor this crap
  }

  async updateIdea(id: string, idea: Idea): Promise<Idea> {
    let currentIdea = await this.ideaRepository.findOne(id);
    currentIdea.name = idea.name ? idea.name : currentIdea.name;
    currentIdea.description = idea.description ? idea.description : currentIdea.description;
    currentIdea.tags = idea.tags ? idea.tags : currentIdea.tags;
      return await currentIdea.save();
  }

  async deleteIdea(id: string) {
    let currentIdea = await this.ideaRepository.findOne(id);
    currentIdea.isDeleted = true;
    return await currentIdea.save();
  }
}