import { IsNotEmpty } from 'class-validator';

export class UpdateHeaderDto {
  @IsNotEmpty()
  title: string;
}
