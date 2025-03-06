import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Image extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Template', required: true })
    template_id: Types.ObjectId;

    @Prop({ type: Buffer })
    imageUrl: Buffer;

}

export const ImageSchema = SchemaFactory.createForClass(Image);

ImageSchema.methods.toDTO = function (){
    return {
        imageId: this.id,
        imageUrl: this.imageUrl ? this.imageUrl.toString('base64') : null,
        template_id: this.template_id
    };
};
