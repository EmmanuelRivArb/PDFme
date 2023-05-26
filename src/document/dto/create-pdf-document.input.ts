import { InputType, Int, Field } from '@nestjs/graphql';
import { PdfDocument } from '../interfaces/pdf-document.interface';
import { GraphQLScalarType } from 'graphql';

@InputType()
export class CreatePdfDocumentInput implements Omit<PdfDocument, 'id'> {
  @Field(() => String)
  name: string;

  @Field(() => GraphQLScalarType)
  jsonData: any;
}
