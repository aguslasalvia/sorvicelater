/** Payload for the "ticket/incident created" notification. */
export class TicketCreatedDto {
  subject: string; // email subject
  headline: string; // notification title
  ticketCode: string; // e.g. "INC · #1"
  title: string; // incident title

  preheader?: string; // inbox preview text
  kicker?: string; // uppercase orange label
  message?: string; // supporting description
  requestedFor?: string; // "For" value
  assignee?: string; // "Assignee" value
  details?: { label: string; value: string }[]; // extra data grid
  actionUrl?: string; // button link
}
