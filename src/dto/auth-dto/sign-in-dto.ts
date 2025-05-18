import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
