import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  category: string[];

  @Prop({ default: 0 })
  membersCount: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0 })
  assignedMissionsCount: number;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

