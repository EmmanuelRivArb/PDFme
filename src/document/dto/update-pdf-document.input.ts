import { GraphQLJSONObject } from 'graphql-type-json';
import { PdfDocument } from '../interfaces/pdf-document.interface';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePdfDocumentInput implements Partial<PdfDocument> {
  @Field(() => ID)
  id: string;

  @Field(() => String, {nullable:true})
  name?: string;

  @Field(() => GraphQLJSONObject, {nullable:true})
  template?: any;
}
