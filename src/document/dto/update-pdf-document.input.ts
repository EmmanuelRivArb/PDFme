import { CreatePdfDocumentInput } from './create-pdf-document.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePdfDocumentInput extends PartialType(
  CreatePdfDocumentInput,
) {
  @Field(() => ID)
  id: string;
}
