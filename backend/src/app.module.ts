import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './template/template.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [DatabaseModule, TemplateModule, UserModule, AuthModule, ImageModule, 
    ConfigModule.forRoot({
      isGlobal: true, 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
