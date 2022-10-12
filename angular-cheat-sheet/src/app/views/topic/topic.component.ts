import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/common/services/store.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  allTopics: Array<any> = [];
  isEditMode: boolean =  false;
  topicTitle: string = '';
  isLoading: boolean = false;



  constructor(private chatService: ChatService,
              private storeService: StoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.getTopics();
  }

  private getTopics(): void {
    this.chatService.getAllTopics().subscribe(topics => this.allTopics = topics);
  }

  onClickCreateTopic() {
    if (this.isEditMode) this.createTopic();
    else this.toggleEditeMode();
  }

  private toggleEditeMode = () => this.isEditMode = !this.isEditMode;

  createTopic() {
    this.isLoading = true;
    const topic = {
      userId: this.storeService.user?.id,
      author: this.storeService.user?.username,
      title: this.topicTitle
    }
    console.log(topic)
    this.chatService.createTopic(topic).subscribe(res => {
      console.log('___res :: ', res)
      if (!res) this.isLoading = false;
      this.getTopics();
      this.toggleEditeMode();
      this.isLoading = false;
    }, () => { this.isLoading = false;});
  }

  navToChatroom(topic: any) {
    this.storeService.setSelectedTopic(topic);
    this.router.navigate(['chat-room'])
  }

}
