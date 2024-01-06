import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from '@/tembre/user/schema/user.schema';
import { MediaDocument, MediaSchema } from '@/tembre/shared/schema/media.schema';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema({
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: (_, ret) => {
            delete ret._id;
            ret.images = ret.images.map((image: MediaDocument) => image.filename);
        },
    },
})
export class Feedback {
    @Prop({ required: true })
    name: string;

    @Prop()
    email: string;

    @Prop()
    telephone: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: UserDocument;

    @Prop({ type: [MediaSchema] })
    images: MediaDocument[];
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
