import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CrudEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;
  
  @Column('text') crud: string;
  
  @Column('text') description: string;
}