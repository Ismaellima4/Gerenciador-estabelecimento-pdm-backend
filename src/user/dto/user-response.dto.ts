import { UserRole } from 'src/enum/roles.enum';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: string;
  username: string;
  role: UserRole;
  password: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }
}
