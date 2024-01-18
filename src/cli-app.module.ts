import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CliFeedbackModule } from './feedback/cli-feedback.module';
import 'dotenv/config';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), CliFeedbackModule],
})
export class CliAppModule {}
