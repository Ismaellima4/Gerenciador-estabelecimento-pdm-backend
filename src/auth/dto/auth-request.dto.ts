import { IsNotEmpty, IsString } from 'class-validator';

export class AuthRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
