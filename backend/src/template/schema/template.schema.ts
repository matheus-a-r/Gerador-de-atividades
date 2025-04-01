import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Template extends Document {

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  subject: string;
  
  @Prop({ required: true })
  theme: string
  
  @Prop({ required: true })
  layout: string;

  @Prop({ required: true })
  html: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  likes: number;

  @Prop({ required: true })
  dislikes: number

}

export const TemplateSchema = SchemaFactory.createForClass(Template);