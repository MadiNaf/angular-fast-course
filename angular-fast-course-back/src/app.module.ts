import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UserModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
