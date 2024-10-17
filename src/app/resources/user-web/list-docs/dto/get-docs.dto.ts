import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDcosDto {
  @IsString()
  search: string = '';

  @IsString()
  orgs: string = '';

  @IsString()
  orgs_type: string = '';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;
}
