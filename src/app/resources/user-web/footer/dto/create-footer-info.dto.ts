import {
  IsOptional,
  IsString,
  IsNumber,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class CreateFooterInfoDto {
  // Foreign Key
  @IsNumber()
  @IsOptional()
  language_id: number;

  // Fields
  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  copyright?: string;

  @IsOptional()
  @IsUrl()
  facebook_link?: string;

  @IsOptional()
  @IsUrl()
  telegram_link?: string;

  @IsOptional()
  @IsUrl()
  youtube_link?: string;
}
