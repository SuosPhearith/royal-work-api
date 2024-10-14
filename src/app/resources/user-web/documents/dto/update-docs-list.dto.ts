import { IsNotEmpty } from 'class-validator';

export class UpdateDocsListDto {
  @IsNotEmpty()
  new_text: string;

  @IsNotEmpty()
  important_text: string;

  @IsNotEmpty()
  all_text: string;
}
