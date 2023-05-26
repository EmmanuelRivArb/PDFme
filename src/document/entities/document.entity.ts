import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PdfDocument } from '../interfaces/pdf-document.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';

@Entity({ name: 'documents' })
@ObjectType()
export class Document implements PdfDocument {
  @PrimaryGeneratedColumn('uuid')
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
  @Field(() => GraphQLJSONObject)
  template: any;
}
