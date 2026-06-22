import { NestFactory } from "@nestjs/core";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppModule } from "./app.module";
import { UserService } from "./user/user.service";
import { KnowledgeService } from "./knowledge/knowledge.service";
import { Ticket } from "./ticket/entities/ticket.entity";
import { TicketStatus } from "./ticket/ticket-status.enum";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const knowledgeService = app.get(KnowledgeService);
  const ticketRepository = app.get<Repository<Ticket>>(
    getRepositoryToken(Ticket),
  );

  try {
    await userService.create({
      name: "testing",
      username: "testing",
      first_name: "testing",
      email: "testing@testing.com",
      password: "testing",
    });
    console.log('User "testing" created (password hashed with bcrypt)');
  } catch (e) {
    console.log(`Could not create user "testing": ${e.message}`);
  }

  const knowledgeBase = [
    {
      title: "How to reset your password",
      description:
        'Go to the login screen, click "Forgot my password" and follow the instructions sent to your email.',
    },
    {
      title: "Support hours",
      description:
        "Our support team is available Monday to Friday from 9:00 AM to 6:00 PM.",
    },
    {
      title: "How to create a ticket",
      description:
        'From the main panel select "New ticket", fill in the title and the description of the problem and submit it.',
    },
  ];

  for (const knowledge of knowledgeBase) {
    try {
      await knowledgeService.create(knowledge);
      console.log(`Knowledge "${knowledge.title}" created`);
    } catch (e) {
      console.log(
        `Could not create knowledge "${knowledge.title}": ${e.message}`,
      );
    }
  }

  // ===== Tickets ===== //
  const HOUR = 3_600_000;
  const DAY = 24 * HOUR;
  const ago = (ms: number) => new Date(Date.now() - ms);

  type SeedTicket = Partial<Ticket> & { status: TicketStatus };

  const tickets: SeedTicket[] = [
    {
      description: "VPN keeps disconnecting every few minutes",
      service_offering: "Networking",
      item: "Corporate VPN",
      category: "Network",
      symptom: "Connection drops",
      status: TicketStatus.New,
      request_by: "alice",
      request_for: "alice",
      assigned: "testing",
      contact_type: "Discord",
      impact: "high",
      urgency: "high",
      priority: "critical",
    },
    {
      description: "Cannot access shared drive",
      service_offering: "Storage",
      item: "File server",
      category: "Access",
      symptom: "Permission denied",
      status: TicketStatus.New,
      request_by: "bob",
      request_for: "bob",
      assigned: "",
      contact_type: "ingame",
      impact: "medium",
      urgency: "medium",
      priority: "moderate",
    },
    {
      description: "Email client crashes on startup",
      service_offering: "Email",
      item: "Outlook",
      category: "Software",
      symptom: "Application crash",
      status: TicketStatus.Pending,
      request_by: "carol",
      request_for: "carol",
      assigned: "testing",
      contact_type: "other",
      impact: "medium",
      urgency: "high",
      priority: "high",
    },
    {
      description: "Printer on 3rd floor not responding",
      service_offering: "Printing",
      item: "HP LaserJet",
      category: "Hardware",
      symptom: "Device offline",
      status: TicketStatus.Pending,
      request_by: "dave",
      request_for: "dave",
      assigned: "",
      contact_type: "Discord",
      impact: "low",
      urgency: "medium",
      priority: "low",
    },
    {
      description: "Slow performance on the CRM portal",
      service_offering: "CRM",
      item: "Salesforce",
      category: "Performance",
      symptom: "High latency",
      status: TicketStatus.Pending,
      request_by: "erin",
      request_for: "erin",
      assigned: "testing",
      contact_type: "ingame",
      impact: "high",
      urgency: "low",
      priority: "moderate",
    },
    // Resolved — under 24h
    {
      description: "Password reset request",
      service_offering: "Identity",
      item: "Active Directory",
      category: "Access",
      symptom: "Forgotten password",
      status: TicketStatus.Resolved,
      request_by: "frank",
      request_for: "frank",
      assigned: "testing",
      contact_type: "other",
      impact: "low",
      urgency: "high",
      priority: "moderate",
      created_at: ago(6 * HOUR),
      resolved_at: ago(3 * HOUR),
    },
    {
      description: "Monitor not detected after docking",
      service_offering: "End user computing",
      item: "Docking station",
      category: "Hardware",
      symptom: "No display",
      status: TicketStatus.Resolved,
      request_by: "grace",
      request_for: "grace",
      assigned: "testing",
      contact_type: "Discord",
      impact: "medium",
      urgency: "medium",
      priority: "moderate",
      created_at: ago(20 * HOUR),
      resolved_at: ago(2 * HOUR),
    },
    // Resolved — 1 to 3 days
    {
      description: "Software license activation failing",
      service_offering: "Software",
      item: "Adobe Creative Cloud",
      category: "Licensing",
      symptom: "Activation error",
      status: TicketStatus.Resolved,
      request_by: "heidi",
      request_for: "heidi",
      assigned: "testing",
      contact_type: "other",
      impact: "medium",
      urgency: "medium",
      priority: "moderate",
      created_at: ago(4 * DAY),
      resolved_at: ago(2 * DAY),
    },
    {
      description: "New laptop setup for onboarding",
      service_offering: "End user computing",
      item: "Laptop",
      category: "Provisioning",
      symptom: "New hire setup",
      status: TicketStatus.Resolved,
      request_by: "ivan",
      request_for: "ivan",
      assigned: "testing",
      contact_type: "ingame",
      impact: "low",
      urgency: "low",
      priority: "low",
      created_at: ago(5 * DAY),
      resolved_at: ago(3 * DAY + 12 * HOUR),
    },
    // Resolved — over 3 days
    {
      description: "Recurring database backup failures",
      service_offering: "Database",
      item: "PostgreSQL cluster",
      category: "Infrastructure",
      symptom: "Backup job fails",
      status: TicketStatus.Resolved,
      request_by: "judy",
      request_for: "judy",
      assigned: "testing",
      contact_type: "other",
      impact: "high",
      urgency: "high",
      priority: "critical",
      created_at: ago(10 * DAY),
      resolved_at: ago(4 * DAY),
    },
  ];

  for (const { created_at, resolved_at, ...data } of tickets) {
    try {
      const saved = await ticketRepository.save(ticketRepository.create(data));
      // Force the timestamps (created_at is auto-managed, so override after insert)
      if (created_at || resolved_at) {
        await ticketRepository.update(saved.id, { created_at, resolved_at });
      }
      console.log(`Ticket "${data.description}" created`);
    } catch (e) {
      console.log(
        `Could not create ticket "${data.description}": ${e.message}`,
      );
    }
  }

  await app.close();
}

seed();
