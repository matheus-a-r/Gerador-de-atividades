import { BadRequestException, Controller, Get, Param, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './interface/image.interface';
import { Express } from 'express';
import * as sharp from 'sharp';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {

    constructor(
      private readonly imageService: ImageService
    ) {}

    @Get(':id')
    async getImage(@Param('id') id: string){
      const image: Image = await this.imageService.findOne(id);
      return image.toDTO()
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
      FileInterceptor('file', {
        limits: { fileSize: 2 * 1024 * 1024 }, 
        fileFilter: (req, file, cb) => {
          const allowedMimeTypes = ['image/jpeg', 'image/png'];
          if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
              new BadRequestException(
                'Only JPEG or PNG images are allowed!',
              ),
              false,
            );
          }
          cb(null, true);
        },
      }),
    )
    async updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File,){
      if (!file) {
        throw new BadRequestException('No file uploaded.');
      }
      const compressedImageBuffer = await sharp(file.buffer)
        .png({ quality: 80 })
        .jpeg({ quality: 80 })
        .toBuffer();

      await this.imageService.update(id, compressedImageBuffer); 
      
      const image: Image = await this.imageService.findOne(id);
      return image.toDTO()
    }

}
