import { Test, TestingModule } from "@nestjs/testing";
import { MailerService } from "@nestjs-modules/mailer";
import { NotificationsService } from "./notifications.service";

describe("NotificationsService", () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        // Mock the mailer so no real emails are sent during tests.
        { provide: MailerService, useValue: { sendMail: jest.fn() } },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
