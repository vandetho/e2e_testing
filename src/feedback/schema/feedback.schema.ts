import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
    transform: (_, ret) => {
      delete ret._id;
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
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
