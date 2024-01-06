import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
