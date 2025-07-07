import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() auth: AuthRequestDto) {
    return this.authService.signIn(auth);
  }

  @Post('signup')
  signOut(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
