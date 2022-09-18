import { Component, OnInit } from '@angular/core';
import { TAB_USER_VIEW, UserSession } from 'src/app/model/chat-room.model';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  public readonly tabs = TAB_USER_VIEW;

  public allUsers: Array<UserSession> = [
    {username: 'Foo', isConnected: true},
    {username: 'Bar', isConnected: true},
    {username: 'John', isConnected: true},
    {username: 'Doe', isConnected: false}
  ];

  public userToDisplay: Array<UserSession> = [];

  public selectedTabUSer: string;

  constructor() {
    this.userToDisplay = this.allUsers;
    this.selectedTabUSer = this.tabs.ALL;
  }

  ngOnInit(): void {
  }

  public switchTabUserView(tabId: string): void {
    if (tabId === this.tabs.ALL) {
      this.userToDisplay = this.allUsers;
      this.selectedTabUSer = tabId;
    } else if (tabId === this.tabs.CONNECTED) {
      this.userToDisplay = this.allUsers.filter(user => user.isConnected);
      this.selectedTabUSer = tabId;
    }
  }

}
