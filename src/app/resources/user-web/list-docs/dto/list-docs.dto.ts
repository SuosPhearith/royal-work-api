import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateListDocsTextDto {
  @IsNotEmpty()
  @IsString()
  home_page?: string;

  @IsNotEmpty()
  @IsString()
  current_page?: string;

  @IsNotEmpty()
  @IsString()
  search_placeholder?: string;

  @IsNotEmpty()
  @IsString()
  docs_id_label?: string;

  @IsNotEmpty()
  @IsString()
  title_label?: string;

  @IsNotEmpty()
  @IsString()
  download_label?: string;

  @IsNotEmpty()
  @IsString()
  previous_label?: string;

  @IsNotEmpty()
  @IsString()
  next_label?: string;
}
