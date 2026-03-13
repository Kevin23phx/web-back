import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ReportDocument = Report & Document;

@Schema({ timestamps: true })
export class Report {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string | User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['plastic', 'organic', 'metal', 'glass', 'other'] })
  category: string;

  @Prop()
  otherCategoryDescription?: string;

  @Prop([String])
  images: string[];

  @Prop({ type: Object, required: false })
  location?: {
    type: string;
    coordinates: number[];
  };

  @Prop({ required: false })
  address?: string;

  @Prop({
    required: true,
    enum: ['pending', 'assigned', 'in_progress', 'completed', 'rejected'],
    default: 'pending',
  })
  status: string;

  @Prop({
    required: true,
    enum: ['none', 'low', 'medium', 'high'],
    default: 'none',
  })
  priority: string;

  @Prop()
  assignedTeam?: string;

  @Prop()
  rejectionReason?: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 0 })
  views: number;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
