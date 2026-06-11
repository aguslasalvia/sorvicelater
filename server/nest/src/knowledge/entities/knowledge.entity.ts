import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("knowledge")
export class Knowledge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
