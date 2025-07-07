import { UserRole } from 'src/enum/roles.enum';

export class CreateUserDto {
  username: string;
  password: string;
  role: UserRole;
}
