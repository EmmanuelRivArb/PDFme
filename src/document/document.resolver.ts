import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DocumentService } from './document.service';
import { Document } from './entities/document.entity';
import { CreatePdfDocumentInput } from './dto/create-pdf-document.input';
import { UpdatePdfDocumentInput } from './dto/update-pdf-document.input';
import { generate } from '@pdfme/generator';

@Resolver(() => Document)
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Mutation(() => Document)
  createDocument(
    @Args('createPdfDocumentInput')
    createPdfDocumentInput: CreatePdfDocumentInput,
  ): Promise<Document> {
    return this.documentService.create(createPdfDocumentInput);
  }

  @Query(() => [Document], { name: 'documents' })
  findAll(): Promise<Document[]> {
    return this.documentService.findAll();
  }

  @Query(() => Document, { name: 'document' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Mutation(() => Document)
  updateDocument(
    @Args('updatePdfDocumentInput')
    updatePdfDocumentInput: UpdatePdfDocumentInput,
  ): Promise<Document> {
    return this.documentService.update(
      updatePdfDocumentInput,
    );
  }

  @Mutation(() => Document)
  removeDocument(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Boolean> {
    return this.documentService.remove(id);
  }

  @Mutation(() => Document)
  generatePdfDocument(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Document> {
    return this.documentService.generatePdfDocument(id);
  }
}
