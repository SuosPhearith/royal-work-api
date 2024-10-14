import { IsNotEmpty } from 'class-validator';

export class UpdateLogoDto {
  @IsNotEmpty()
  logo: string;
}
