import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { User } from 'src/model/user.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loging(@Request() req): Promise<User> {
    return this.authService.login(req?.user);
  }

  @Post('/signup')
  async createUser(@Body() user: User): Promise<User> {
    try {
      return await this.authService.SignUp(user);
    } catch (error) {
      return error;
    }
  }
}
