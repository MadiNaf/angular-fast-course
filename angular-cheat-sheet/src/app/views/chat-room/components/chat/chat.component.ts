import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public message: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public onChangeMessage(event: Event): void {
    if (!event.target) return ;
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
    console.log('MSG ::: ', this.message);
  }
}
