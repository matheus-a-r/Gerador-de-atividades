import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {

    constructor(
      private readonly openAIService: TemplateService,
    ) {}

    @Post()
    generateTemplate(@Req() req, @Body() template) {
      return this.openAIService.getResponse(template);
    }

}
