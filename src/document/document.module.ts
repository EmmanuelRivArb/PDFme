import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DocumentResolver, DocumentService],
  imports: [TypeOrmModule.forFeature([Document])],
})
export class DocumentModule {}
