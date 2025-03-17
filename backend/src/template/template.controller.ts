import { Body, Controller, Get, HttpStatus, Post, Query, Req,  Res, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('template')
export class TemplateController {

    constructor(
      private readonly templateService: TemplateService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    generateTemplate(@Req() req, @Body() template) {
      const userId = req.user.sub;
      return this.templateService.getResponse(template, userId);
    }

    @Get()
    async findAll(
      @Query('page') pageQ?: number,
      @Query('page_size') limitQ?: number,
      @Query('search') searchQ?: string,
      @Query('theme') themeQ?: string,
      @Query('subject') subjectQ?: string,
      @Query('level') levelQ?: string,
      @Query('orderBy') orderByQ?: any,
      @Query('order') orderQ?: 'asc' | 'desc',
    ): Promise<{totalItems: number, items: any, page: number, limit: number,}> {
      const movies = await this.templateService.findAll(pageQ, limitQ, searchQ, themeQ, subjectQ, levelQ, orderByQ, orderQ);
  
      const { totalItems, items, page, limit } = movies;
  
      return { totalItems, items, page, limit };
    }
  

}