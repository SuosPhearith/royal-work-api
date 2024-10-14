import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSearchMiddleTextDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
