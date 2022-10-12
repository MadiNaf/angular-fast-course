import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/common/services/store.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';
  public messages: Array<any> = [];

  constructor(private chatService: ChatService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.chatService.messages$.subscribe(messages => this.messages = messages);
  }

  public onChangeMessage(event: Event): void {
    if (!event.target) return ;
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
    console.log('MSG ::: ', this.message);
  }

  public onSendMessage(): void {
    this.storeService.currentTopic$.subscribe(() => {});
    const message = {
      content: this.message,
      author: this.storeService.user?.username,
      topic:''
    }
  }
}
