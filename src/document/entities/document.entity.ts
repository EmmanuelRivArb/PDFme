import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PdfDocument } from '../interfaces/pdf-document.interface';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GraphQLScalarType } from 'graphql';

@Entity('documents')
@ObjectType()
export class Document implements PdfDocument {
  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    transformer: {
      from: (value) => value,
      to: (value: string) => {
        return value + '.pdf';
      },
    },
  })
  @Field(() => String)
  name: string;

  @Column({ type: 'jsonb' })
  @Field(() => GraphQLScalarType)
  jsonData: any;
}
