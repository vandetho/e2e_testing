import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schema/feedback.schema';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackQuestion } from './question/create-feedback.question';
import { CreateFeedbackCommand } from './command/create-feedback.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: FeedbackSchema, name: Feedback.name },
    ]),
  ],
  providers: [FeedbackService, CreateFeedbackQuestion, CreateFeedbackCommand],
  exports: [FeedbackService, CreateFeedbackQuestion, CreateFeedbackCommand],
})
export class CliFeedbackModule {}
