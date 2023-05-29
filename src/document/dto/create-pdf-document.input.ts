import { InputType, Int, Field } from '@nestjs/graphql';
import { PdfDocument } from '../interfaces/pdf-document.interface';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreatePdfDocumentInput implements Omit<PdfDocument, 'id'> {
  @Field(() => String)
  name: string;

  @Field(() => GraphQLJSONObject)
  template: any;
}
