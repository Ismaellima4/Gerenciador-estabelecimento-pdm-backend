import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/enum/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
