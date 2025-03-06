import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schema/image.schema';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])],
  controllers: [ImageController],
  providers: [ImageService], 
  exports: [ImageService, MongooseModule],
})
export class ImageModule {}
