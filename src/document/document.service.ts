import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePdfDocumentInput } from './dto/create-pdf-document.input';
import { UpdatePdfDocumentInput } from './dto/update-pdf-document.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { generate, Template } from '@pdfme/generator';
const fs = require('fs');

@Injectable()
export class DocumentService {
  private logger: Logger = new Logger();
  constructor(
    @InjectRepository(Document)
    private readonly pdfDocumentRepository: Repository<Document>,
  ) {}

  async create(
    createPdfDocumentInput: CreatePdfDocumentInput,
  ): Promise<String> {
    try {
      const pdfDocument = await this.pdfDocumentRepository.create({
        ...createPdfDocumentInput,
      });

      const savedPdfDocument = await this.pdfDocumentRepository.save(pdfDocument);
      return savedPdfDocument.id;
      
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async findAll(): Promise<Document[]> {
    return await this.pdfDocumentRepository.find();
  }

  async findOne(id: string): Promise<Document> {
    try {
      return await this.pdfDocumentRepository.findOneBy({ id });
    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async update(
    updateDocumentInput: UpdatePdfDocumentInput,
  ): Promise<String> {
    try {
      const pdfDocument = await this.pdfDocumentRepository.preload(
        updateDocumentInput,
      );

      if (!pdfDocument) {
        throw new NotFoundException(
          `Pdf Document with id:${updateDocumentInput.id} not found`,
        );
      }

      if(pdfDocument.name.trim() == '')
      {
        throw new BadRequestException(
          'Name of the pdf document can not be empty',
        );
      }
      
      const savedPdfDocument =  await this.pdfDocumentRepository.save(updateDocumentInput);
      return savedPdfDocument.id;

    } catch (error) {
      this.handlerDBError(error);
    }
  }

  async remove(id: string): Promise<Boolean> {
    const pdfDocument = await this.findOne(id);
    this.pdfDocumentRepository.remove(pdfDocument);
    return true;
  }

  async generatePdfDocument(id:string):Promise<Boolean> {

    const pdfDocument = await this.findOne(id);
    this.generatePDF(pdfDocument);
    return true;
  }

  private async generatePDF(pdfDocument: Document) {
    const template: Template = pdfDocument.template;
    const inputs = template.sampledata;

    const pdf = await generate({ template, inputs });
    fs.writeFileSync(pdfDocument.name, pdf);
  }

  private handlerDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new Error(error);
  }
}
