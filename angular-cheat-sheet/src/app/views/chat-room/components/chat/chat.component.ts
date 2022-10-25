import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { StoreService } from 'src/app/common/services/store.service';
import { Message, Topic } from 'src/app/model/chat-room.model';
import { User } from 'src/app/model/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';
  public messages: Array<Message> = [];
  public user: User | undefined;
  public topic: Topic | undefined;

  constructor(private chatService: ChatService,
              private storeService: StoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.chatService.startListenMessageEvent();
    combineLatest([this.storeService.user$, this.storeService.currentTopic$]).subscribe(combineCtx => {
      const [ user, topic]  = combineCtx;
      if (topic?.id) {
        this.user = user;
        this.topic = topic;
        this.chatService.getMessages((topic.id));
      } else this.router.navigate(['topics']);
    });
    this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
      this.navToAnchor(this.messages.length )
    });
  }

  public onChangeMessage(event: Event): void {
    if (!event.target) return ;
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
  }

  public onSendMessage(): void {
    const { id, username } = this.user ? this.user : {username: '', id: 0 }
    const message: Message = {
      content: this.message,
      author: username,
      userId:  id ? id : 0,
      topicId: this.topic?.id ? this.topic.id : 0,
    }

    this.chatService.createMessage(message).subscribe(() => { });
  }

  public navToAnchor(lastMsgId: number): void {
    console.log('lastMsgId', lastMsgId)
    location.hash = `#msg${lastMsgId}`; 
  }
}
