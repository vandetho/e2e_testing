import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { FeedbackService } from '@/tembre/feedback/feedback.service';
import { CreateFeedbackDto } from '@/tembre/feedback/dto/create-feedback.dto';
import { UserRequest } from '@/tembre/auth/types/user-request.type';
import { Public } from '@/tembre/auth/decorators/public.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, parse } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { TokenHelper } from '@/tembre/shared/helpers/token.helper';

const MAX_IMAGES_COUNT = 10;

const localOptions = {
    storage: diskStorage({
        destination: (_: UserRequest, _1, callback) => {
            const uploadPath = join('public', process.env.FEEDBACK_IMAGE_FOLDER);
            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath, { recursive: true });
            }
            callback(null, uploadPath);
        },
        filename: (_: UserRequest, file, callback) => {
            callback(
                null,
                `${parse(file.originalname).name.toLowerCase()}-${TokenHelper.generateToken()}-${
                    process.env.IMAGE_PREFIX
                }${extname(file.originalname)}`,
            );
        },
    }),
};

@Controller('api/feedbacks')
@ApiTags('Feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Get()
    @Public()
    @HttpCode(HttpStatus.OK)
    getFeedbacks() {
        return this.feedbackService.findAll();
    }

    @Public()
    @Post()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('images', MAX_IMAGES_COUNT, localOptions))
    @HttpCode(HttpStatus.CREATED)
    createFeedback(@Req() req: UserRequest, @Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(createFeedbackDto, req.user);
    }

    @Get(':feedbackId')
    @Public()
    @HttpCode(HttpStatus.OK)
    getFeedback(@Param('feedbackId') id: string) {
        return this.feedbackService.findById(id);
    }
}
