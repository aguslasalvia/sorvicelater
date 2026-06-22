import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserService } from "./user/user.service";
import { KnowledgeService } from "./knowledge/knowledge.service";

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);
  const knowledgeService = app.get(KnowledgeService);

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

  await app.close();
}

seed();
