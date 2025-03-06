import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('template')
export class TemplateController {

    constructor(
      private readonly openAIService: TemplateService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    generateTemplate(@Req() req, @Body() template) {
      const userId = req.user.sub;
      return this.openAIService.getResponse(template, userId);
    }

}
