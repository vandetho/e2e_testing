import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMediaDto } from '@/tembre/shared/dto/create-media.dto';

export class CreateFeedbackDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    email?: string;

    @ApiProperty({ required: false })
    telephone?: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    @ApiProperty({
        required: false,
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    images?: CreateMediaDto[];
}
