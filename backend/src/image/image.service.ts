import { Injectable, NotFoundException, ServiceUnavailableException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './interface/image.interface';
@Injectable()
export class ImageService {

  @InjectModel('Image') private readonly imageModel: Model<Image>
  

  async findOne(id: string): Promise<Image> {
    const image = await this.imageModel.findById(id);
    console.log()

    if(!image){
      throw new NotFoundException(`The image ${id} does not exist.`)
    }
    
    return image;
  }
}
