import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './interface/image.interface';

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

}
