import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() auth: AuthRequestDto) {
    return this.authService.signIn(auth);
  }
}
