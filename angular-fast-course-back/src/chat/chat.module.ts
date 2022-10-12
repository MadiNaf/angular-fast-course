import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy.ts';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, JwtStrategy]
})
export class ChatModule {}
