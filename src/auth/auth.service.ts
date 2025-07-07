import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRequestDto } from './dto/auth-request.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(auth: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userService.findOneByUserName(auth.username);

    if (user.password != auth.password) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const acessToken = await this.jwtService.signAsync(payload);

    return new AuthResponseDto(acessToken);
  }
}
