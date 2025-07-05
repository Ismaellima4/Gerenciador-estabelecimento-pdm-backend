import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRequestDto } from './dto/auth-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(auth: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userService.findOneByUserName(auth.username);

    if (user?.password != auth.pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const acessToken = await this.jwtService.signAsync(payload);

    return new AuthResponseDto(acessToken);
  }
}
