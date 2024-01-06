import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@/tembre/user/user.module';
import { AuthModule } from '@/tembre/auth/auth.module';
import { Feedback, FeedbackSchema } from '@/tembre/feedback/schema/feedback.schema';
import { FeedbackService } from '@/tembre/feedback/feedback.service';
import { FeedbackController } from '@/tembre/feedback/feedback.controller';

@Module({
    imports: [MongooseModule.forFeature([{ schema: FeedbackSchema, name: Feedback.name }]), UserModule, AuthModule],
    providers: [FeedbackService],
    exports: [FeedbackService],
    controllers: [FeedbackController],
})
export class FeedbackModule {}
