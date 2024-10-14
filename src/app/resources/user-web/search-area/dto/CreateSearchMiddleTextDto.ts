import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSearchMiddleTextDto {
  @IsNumber()
  texts_id: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}
