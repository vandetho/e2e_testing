import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schema/feedback.schema';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: FeedbackSchema, name: Feedback.name },
    ]),
  ],
  providers: [FeedbackService],
  exports: [FeedbackService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
