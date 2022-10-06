import { Module } from '@nestjs/common';
import { ChatGateway } from 'src/chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway]
})
export class ChatModule {}
