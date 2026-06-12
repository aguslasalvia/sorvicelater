import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UserService);

  try {
    await userService.create({
      name: 'testing',
      username: 'testing',
      first_name: 'testing',
      email: 'testing@testing.com',
      password: 'testing',
    });
    console.log('Usuario "testing" creado (password hasheada con bcrypt)');
  } catch (e) {
    console.log(`No se creo el usuario "testing": ${e.message}`);
  }

  await app.close();
}

seed();
