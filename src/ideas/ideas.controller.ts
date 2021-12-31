import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateIdeaDto } from './dtos/createIdea.dto';
import { Idea } from './idea.entity';
import { IdeasService } from './ideas.service';

@Controller('ideas')
export class IdeasController {
  constructor(private ideasService: IdeasService) {}

  @Get()
  async findAllIdeas(): Promise<Idea[]> {
    return await this.ideasService.findAll();
  }

  @Get('/:tag')
  async findUserById(@Param('tag') tag: string): Promise<Idea[]> {
    return await this.ideasService.findByTag(tag);
  }

  @Post()
  async createIdea(
    @Body() createIdeaDto: CreateIdeaDto,
  ): Promise<Idea> {
    return await this.ideasService.createNewIdea(createIdeaDto);
  }

  @Patch('/:id')
  async updateIdea(
    @Param('id') id: string,
    @Body() newIdea: any
  ): Promise<Idea> {
    return await this.ideasService.updateIdea(id, newIdea)
  }

  @Delete('/:id')
  deleteIdea(
    @Param('id') id: string
  ): void{
    this.ideasService.deleteIdea(id)
  }

}
