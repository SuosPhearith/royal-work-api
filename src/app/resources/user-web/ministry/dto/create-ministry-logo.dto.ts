import { IsNotEmpty } from 'class-validator';

export class CreateMinistryLogoDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly image: string;
}
