import { Controller, Get, Post, Put, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Message, Topic } from 'src/model/chat.model';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

  constructor(private readonly chatService: ChatService) {}

  //   @ApiBearerAuth()
  @Get('/topic/all')
  @UseGuards(AuthGuard('jwt'))
  async getAllTopics(): Promise<Topic []> {
    return await this.chatService.getTopics();
  }

  @Get('/topic/user/:id')
  async getTopicByUserId(@Param('id') userId: number): Promise<Topic []> {
    return await this.chatService.getTopicByUser(userId);
  }

  @Post('/topic/new')
  async createTopic(@Body() topic: Topic): Promise<Topic []> {
    return await this.chatService.addTopic(topic);
  }

  @Put('/topic')
  async updateTopic(@Body() topic: Topic): Promise<Topic> {
    return await this.chatService.updateTopic(topic?.id, topic);
  }

  @Delete('/topic/:id')
  async delteTopic(@Param('id') id: number): Promise<boolean> {
    return await this.chatService.delteTopic(id);
  }

  @Get('/message/:id')
  async getMessagesByTopic(@Param('id') topicId: number): Promise<Message []> {
    return await this.chatService.getMessagesByTopic(topicId);
  }

  @Post('/message/new')
  async createMessage(@Body() message: Message): Promise<Message []> {
    return await this.chatService.sendMessage(message);
  }
}
