import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  allTopics: Array<any> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getAllTopics().subscribe(topics => this.allTopics = topics);
  }

}
