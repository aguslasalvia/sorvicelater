import { TicketStatus } from "../ticket-status.enum";

export class CreateTicketDto {
  request_by: string;
  request_for: string;
  service_offering: string;
  item: string;
  contact_type: string;
  status: TicketStatus;
  assigned_id: number | null; // id of the assigned user (null = unassigned)
  category_id: number | null; // id of the category (null = none)
  symptom: string;
  impact: string;
  urgency: string;
  priority: string;
  description: string;
  worknotes: string;
  additional: string;
  kb: number;
}
