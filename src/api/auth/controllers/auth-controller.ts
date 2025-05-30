import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth-service';
import { SignUpDto } from 'src/dto/auth-dto/sign-up-dto';
import { SignInDto } from 'src/dto/auth-dto/sign-in-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }
}
