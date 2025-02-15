import { Injectable, ServiceUnavailableException  } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion } from 'openai/resources';
import { params } from './types';
import { ConfigService } from '@nestjs/config';
import { PROMPT } from 'src/constants';

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

      const splitIndex = content.indexOf("}");
      const jsonString = content.substring(7, splitIndex + 1).trim();
      const cleanedJsonString = jsonString.replace(/\\n/g, "").replace(/\\r/g, "").replace(/\\"/g, "\"");
      const jsonObject = JSON.parse(cleanedJsonString);
      const html = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);

      console.log(html)

      jsonObject.ano = param.ano;
      jsonObject.assunto = param.assunto;
      jsonObject.tematica = param.tematica;
      jsonObject.layout = param.layout;
      
      return {
        params: jsonObject,
        html: html ? html[1].trim() : ''
      };
    }catch (e) {
      console.error(e);
      throw new ServiceUnavailableException('Failed request to ChatGPT');
    }
  }
}
