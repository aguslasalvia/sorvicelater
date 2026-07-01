import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/adapters/handlebars.adapter";
import { join } from "path";
import { NotificationsService } from "./notifications.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          port: config.get<number>("MAIL_PORT"),
          secure: config.get("MAIL_PORT") === "465",
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASS"),
          },
        },
        defaults: { from: config.get("MAIL_FROM") },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
      }),
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
