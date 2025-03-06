import { Injectable, ServiceUnavailableException  } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';
import { params } from './types';
import { ConfigService } from '@nestjs/config';
import { PROMPT } from 'src/constants';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template } from './interface/template.interface';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Image } from 'src/image/schema/image.schema';
@Injectable()
export class TemplateService {
  
  @InjectModel('Template') private readonly templateModel: Model<Template>

  @InjectModel('Image') private readonly imageModel: Model<Image>
  
  public openai: OpenAIApi;
  
  constructor(
    private readonly configService: ConfigService) {
    
      this.openai = new OpenAIApi({
      apiKey: this.configService.get<string>('OPENAI_KEY')
    });
  
  }

  async getResponse(param: params, user_id: string) {
  
    const para = `
      level: ${param.ano},
      subject: ${param.assunto},
      theme: ${param.tematica},
      sheet width: 800px,
      layout: ${param.layout}
    `
    const prompt = PROMPT.replace("<parameters>", para);
    
    try{
      const completion: ChatCompletion = await this.openai.chat.completions.create({
        model: this.configService.get<string>('MODEL_ID'),
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
        temperature: 0.5,
      });

      const [content] = completion.choices.map((choice) => choice.message.content);

      console.log(content)

      const imgPrompt = 'Generate a image '

      const splitIndex = content.indexOf("}");
      const jsonString = content.substring(7, splitIndex + 1).trim();
      const cleanedJsonString = jsonString.replace(/\\n/g, "").replace(/\\r/g, "").replace(/\\"/g, "\"");
      const jsonObject = JSON.parse(cleanedJsonString);
      const html = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);

      jsonObject.ano = param.ano;
      jsonObject.assunto = param.assunto;
      jsonObject.tematica = param.tematica;
      jsonObject.layout = param.layout;
      
      const templateCreated = await this.templateModel.create({
        level: param.ano,
        subject: param.assunto,
        theme: param.tematica,
        layout: param.layout,
        html: html ? html[1].trim(): '',
        user_id: user_id
      } as CreateTemplateDto)
      
      const $ = cheerio.load(html ? html[1].trim(): '');
      
      const imgElements = $('img').toArray();
      
      for (const element of imgElements) {
        const alt = $(element).attr('alt');
        if (alt) {
          try {
            const response = await this.openai.images.generate({
              model: "dall-e-3",
              prompt: imgPrompt + alt,
              size: "1024x1024",
              n: 1,
            });
            const imageUrl = response.data[0].url;

            const base64Image = await this.downloadImage(imageUrl);

            const image: Image = await this.imageModel.create({
              template_id: templateCreated.id,
              imageUrl: base64Image
            })
    
            $(element).attr('src', image.id);
          } catch (error) {
            console.error('Erro ao gerar imagem:', error);
          }
        }
      }

      const newHtml = $.html().toString();

      await this.templateModel.findByIdAndUpdate(templateCreated.id, 
        {...templateCreated, html: newHtml},
        { new: true }
      )

      return {
        params: jsonObject,
        html: newHtml
      };
    }catch (e) {
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }

  async downloadImage(url: string) {

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(response.data);

    return base64Image;
    }
}
