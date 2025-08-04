import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRequestDto } from './dto/auth-request.dto';
import { JwtPayload } from './jwt.strategy';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { comparePassword } from 'src/common/encrypted-utils';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(auth: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.userService.findOneByUserName(auth.username);
    const isMatch = await comparePassword(user.password, auth.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return this.generatedJwtToken(user);
  }

  async signUp(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const user = await this.userService.create(createUserDto);
    return this.generatedJwtToken(user);
  }

  private async generatedJwtToken(user: User): Promise<AuthResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const acessToken = await this.jwtService.signAsync(payload);

    return new AuthResponseDto(acessToken, user);
  }
}
