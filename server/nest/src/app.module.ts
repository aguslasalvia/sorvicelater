import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TicketModule } from './ticket/ticket.module';
import { KnowledgeModule } from './knowledge/knowledge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "better-sqlite3",
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    TicketModule,
    KnowledgeModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
