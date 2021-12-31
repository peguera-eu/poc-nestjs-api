import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaRepository } from './idea.repository';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaRepository])],
  providers: [IdeasService],
  controllers: [IdeasController],
})
export class IdeasModule {}
