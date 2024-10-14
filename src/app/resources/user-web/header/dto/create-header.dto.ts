import { IsNotEmpty } from 'class-validator';

export class CreateHeaderDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  language: string;
}
