import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConnectedUser, Credentials, User } from 'src/model/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAllUsers(): Promise<User []> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
     return [error]; 
    }
  }

  @Get('/profile/:id')
  async getOneUser(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
     return error; 
    }
  }

  @Post('/new')
  async createUser(@Body() user: User): Promise<User> {
    try {
      return await this.userService.SignUp(user);
    } catch (error) {
      return error;
    }
  }

  @Post('/login')
  async loging(@Body() credentials: Credentials): Promise<User> {
    try {
      // TODO Emmettre un événement pour l'ouverture d'un session.
      return await this.userService.Login(credentials.username, credentials.password);
    } catch (error) {
      return error;
    }
  }

  @Get('/session')
  async getSession(): Promise<ConnectedUser []> {
    try {
      return await this.userService.getConnectedUsers();
    } catch (error) {
     return [error]; 
    }
  }
}
