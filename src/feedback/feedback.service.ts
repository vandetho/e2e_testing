import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from '@/tembre/feedback/schema/feedback.schema';
import { CreateFeedbackDto } from '@/tembre/feedback/dto/create-feedback.dto';
import { UserDocument } from '@/tembre/user/schema/user.schema';

@Injectable()
export class FeedbackService {
    constructor(@InjectModel(Feedback.name) private feedbackModel: Model<Feedback>) {}

    findAll() {
        return this.feedbackModel.find().populate('user').exec();
    }

    createFeedback(createFeedbackDto: CreateFeedbackDto, user?: UserDocument) {
        const newFeedback = new this.feedbackModel({ ...createFeedbackDto, user });
        return newFeedback.save();
    }

    findById(id: string) {
        return this.feedbackModel.findById(id).populate('user').exec();
    }
}
