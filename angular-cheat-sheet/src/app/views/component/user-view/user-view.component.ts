import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  public connectedUsers = [
    {username: 'Foo', isConnected: true},
    {username: 'Bar', isConnected: false}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
