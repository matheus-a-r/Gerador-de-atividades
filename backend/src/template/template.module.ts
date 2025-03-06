import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './schema/template.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: 'Template', schema: TemplateSchema }]), AuthModule, ImageModule],
  controllers: [TemplateController],
  providers: [TemplateService], 
  exports: [TemplateService],
})
export class TemplateModule {}
