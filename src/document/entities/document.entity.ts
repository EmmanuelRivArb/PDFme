import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { PdfDocument } from '../interfaces/pdf-document.interface';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BadRequestException } from '@nestjs/common';

@Entity({ name: 'documents' })
@ObjectType()
export class Document implements PdfDocument {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    unique: true,
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

  @BeforeInsert()
  @BeforeUpdate()
  replaceEmptyStringAsNull() {
    if (this.name.trim() === '') {
      throw new BadRequestException(
        'Name of the pdf document can not be empty',
      );
    }
  }
}
