import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Knowledge } from "../../knowledge/entities/knowledge.entity";
import { TicketStatus } from "../ticket-status.enum";

@Entity("tickets")
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

  // Stored as the enum's numeric value (0 = New, 1 = Pending, 2 = Resolved)
  @Column({ type: "int", default: TicketStatus.New })
  status: TicketStatus;

  @Column()
  assigned: string;

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

  @Column()
  description: string;

  @Column({ nullable: true })
  worknotes: string;

  @Column({ nullable: true })
  additional: string;

  @Column({ nullable: true })
  kb: number;

  @ManyToOne(() => Knowledge, { nullable: true })
  @JoinColumn({ name: "kb" })
  knowledge: Knowledge;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "assigned_id" })
  assigned_user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Set when the ticket transitions to Resolved; cleared if it is reopened.
  @Column({ type: "datetime", nullable: true })
  resolved_at: Date | null;
}
