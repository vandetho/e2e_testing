import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('api/feedbacks')
@ApiTags('Feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getFeedbacks() {
    return this.feedbackService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  }

  @Get(':feedbackId')
  @HttpCode(HttpStatus.OK)
  getFeedback(@Param('feedbackId') id: string) {
    return this.feedbackService.findById(id);
  }
}
