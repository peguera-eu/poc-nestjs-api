import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), IdeasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
