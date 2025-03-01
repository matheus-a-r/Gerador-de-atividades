import { Injectable, ServiceUnavailableException  } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';
import { params } from './types';
import { ConfigService } from '@nestjs/config';
import { PROMPT } from 'src/constants';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class TemplateService {
  
  public openai: OpenAIApi;
  
  constructor(
    private readonly configService: ConfigService) {
    
      this.openai = new OpenAIApi({
      apiKey: this.configService.get<string>('OPENAI_KEY')
    });
  
  }

  async getResponse(param: params) {
  
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
      console.log(html[1].trim())
      
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

            const pathImage = await this.downloadImage(imageUrl);
    
            $(element).attr('src', `http://localhost:${process.env.PORT ?? 3001}/public/${pathImage}`);
          } catch (error) {
            console.error('Erro ao gerar imagem:', error);
          }
        }
      }
      const newHtml = $.html().toString();
      console.log(newHtml)
      jsonObject.ano = param.ano;
      jsonObject.assunto = param.assunto;
      jsonObject.tematica = param.tematica;
      jsonObject.layout = param.layout;
      
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
    const fileName = `img-${Date.now()}.png`;
    const filePath = path.resolve(__dirname, '..', '..', 'public', fileName);

      const response = await axios.get(url, { responseType: 'arraybuffer' });

      fs.writeFileSync(filePath, response.data);

      return fileName;
    }
}
