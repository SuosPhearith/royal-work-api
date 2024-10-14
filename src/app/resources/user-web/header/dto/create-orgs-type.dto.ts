import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrgsTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  headerLinkId: number;
}
