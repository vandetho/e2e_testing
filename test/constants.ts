import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbackModule } from '../src/feedback/feedback.module';

export const database = process.env.MONGO_URI_DEV;

export const imports = [MongooseModule.forRoot(database), FeedbackModule];
