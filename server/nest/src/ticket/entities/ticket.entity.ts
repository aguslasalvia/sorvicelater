import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  request_by: string;

  @Column()
  request_for: string;

  @Column()
  service_offering: string;

  @Column()
  item: string;

  @Column()
  contact_type: string;

  @Column()
  status: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_id' })
  assigned: User;

  @Column()
  category: string;

  @Column()
  symptom: string;

  @Column()
  impact: string;

  @Column()
  urgency: string;

  @Column()
  priority: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}