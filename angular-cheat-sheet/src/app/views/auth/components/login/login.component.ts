import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    usernameControl: new FormControl(''),
    passwordControl: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  get usernameControl(): FormControl {
    return this.loginForm.get('usernameControl') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('passwordControl') as FormControl;
  }

  onSubmitLoginForm(): void {
    console.log(this.usernameControl.value);
    console.log(this.passwordControl.value);
  }

}
