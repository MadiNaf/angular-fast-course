import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RestApiService } from 'src/app/common/services/rest-api.service';
import { StoreService } from 'src/app/common/services/store.service';
import { Topic } from 'src/app/model/chat-room.model';
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
              private commonRestApiService: RestApiService,
              private router: Router) { }

  ngOnInit(): void {
    this.getTopics();
  }

  private getTopics(): void {
    this.chatService.getAllTopics().subscribe({
      next: (topics) => this.allTopics = topics,
      error: (error) => this.commonRestApiService.hadleUnauthorizedRequest(error)
    });
  }

  onClickCreateTopic() {
    if (this.isEditMode) this.createTopic().then(() => console.log('%c Topic created.', 'color: green'));
    else this.toggleEditeMode();
  }

  private toggleEditeMode = () => this.isEditMode = !this.isEditMode;

  async createTopic(): Promise<void> {
    const user = await lastValueFrom(this.storeService.user$)
    this.isLoading = true;
    const topic: Topic = {
      userId: user?.id ? user.id : 0,
      author: user?.username ? user.username : '',
      title: this.topicTitle
    }
    console.log(topic)
    this.chatService.createTopic(topic).subscribe({
      next: (value) => {
        console.log('___res :: ', value)
        if (!value) this.isLoading = false;
        this.getTopics();
        this.toggleEditeMode();
        this.isLoading = false;
      },
      error: (e) =>  this.isLoading = false,
    });
  }

  navToChatroom(topic: any) {
    this.storeService.setSelectedTopic(topic);
    this.router.navigate(['chat-room'])
  }

}
