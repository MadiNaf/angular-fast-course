import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISignInRequest } from 'src/app/model/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    usernameControl: new FormControl('', Validators.required),
    passwordControl: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private route: Router) { }

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
    const signInRequest: ISignInRequest = {
      username: this.usernameControl.value,
      password: this.passwordControl.value
    };
    this.authService.signIn(signInRequest).subscribe(signIn => {
      console.log(signIn);
      this.route.navigate(['chat-room']);
    });
  }

}
