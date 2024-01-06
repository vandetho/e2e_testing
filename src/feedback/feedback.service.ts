import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './schema/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
  ) {}

  findAll() {
    return this.feedbackModel.find().exec();
  }

  createFeedback(createFeedbackDto: CreateFeedbackDto) {
    const newFeedback = new this.feedbackModel({ ...createFeedbackDto });
    return newFeedback.save();
  }

  findById(id: string) {
    return this.feedbackModel.findById(id).exec();
  }
}
