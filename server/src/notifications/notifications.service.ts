import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";
import { TicketCreatedDto } from "./dto/ticket-created.dto";

const LOGO_PATH = join(__dirname, "assets", "logo.png");

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly mailer: MailerService) {}

  // ───────────────────────────────────────────────────────────
  // Notification types (add one method per event).
  // Each method decides which channel(s) the notification goes out on.
  // ───────────────────────────────────────────────────────────

  /** Notify that a ticket / incident was created. */
  async ticketCreated(to: string, data: TicketCreatedDto) {
    await this.sendEmail({
      to,
      subject: data.subject,
      template: "ticket-notification", // -> templates/ticket-notification.hbs
      context: { logoUrl: "cid:logo", ...data },
      attachments: [{ filename: "logo.png", path: LOGO_PATH, cid: "logo" }],
    });

    this.logger.log(`ticketCreated → ${to}`);
  }

  // ───────────────────────────────────────────────────────────
  // Channels (how a notification is delivered).
  // Email only for now; later: push, in-app, SMS, etc.
  // ───────────────────────────────────────────────────────────

  private async sendEmail(options: {
    to: string;
    subject: string;
    template: string;
    context: Record<string, unknown>;
    attachments?: { filename: string; path: string; cid: string }[];
  }) {
    await this.mailer.sendMail(options);
  }
}
