import { IsOptional, IsString } from 'class-validator';

export class UpdateSearchTextDto {
  @IsOptional()
  @IsString()
  start_text?: string;

  @IsOptional()
  @IsString()
  search_text?: string;

  @IsOptional()
  @IsString()
  end_text?: string;
}
