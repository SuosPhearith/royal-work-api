import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateLanguageDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(5)
  readonly code: string;
}
