import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isSignIn: boolean = true;
  public isSignUp: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public handleAuthForm(isCurrentFormSignIn: boolean): void {
    this.isSignIn = !isCurrentFormSignIn;
    this.isSignUp = isCurrentFormSignIn;
  }
}
