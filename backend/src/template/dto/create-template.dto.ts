import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTemplateDto {
    @ApiProperty({ description: 'Task level', example: '2nd year elementary school' })
    @IsNotEmpty()
    @IsString()
    level: string;

    @ApiProperty({ description: 'Task subject', example: 'Addition' })
    @IsEmail()
    subject: string;

    @ApiProperty({ description: 'Task theme', example: 'Fruits' })
    @IsNotEmpty()
    @MinLength(6)
    theme: string;

    @ApiProperty({ description: 'Task layout', example: 'One image' })
    @IsNotEmpty()
    layout: string;

    @ApiProperty({ description: 'Html'})
    @IsNotEmpty()
    html: string;

    @ApiProperty({ description: 'User id', example: '1' })
    @IsNotEmpty()
    user_id: string
}
