import { UserRole } from 'src/enum/roles.enum';
import { User } from 'src/user/entities/user.entity';

export class AuthResponseDto {
  acessToken: string;
  username: string;
  role: UserRole;

  constructor(acessToken: string, user: User) {
    this.acessToken = acessToken;
    this.username = user.username;
    this.role = user.role;
  }
}
