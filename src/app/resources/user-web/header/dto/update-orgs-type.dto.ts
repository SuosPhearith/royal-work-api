import { IsNotEmpty } from 'class-validator';

export class UpdateOrgsTypeDto {
  @IsNotEmpty()
  name: string;
}
