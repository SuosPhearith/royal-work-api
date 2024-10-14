import { IsNotEmpty } from 'class-validator';

export class UpdateMinistryTitleDto {
  @IsNotEmpty()
  readonly title: string;
}
