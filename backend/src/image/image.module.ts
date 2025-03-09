import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './schema/image.schema';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]), AuthModule],
  controllers: [ImageController],
  providers: [ImageService], 
  exports: [ImageService, MongooseModule],
})
export class ImageModule {}
