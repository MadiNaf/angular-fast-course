import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm = new FormGroup({
    firstnameControl: new FormControl('', Validators.required),
    lastnameControl: new FormControl('', Validators.required),
    usernameControl: new FormControl('', Validators.required),
    passwordControl: new FormControl('', Validators.required),
    pwdConfirmationControl: new FormControl('', Validators.required)
  });
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  get firstnameControl(): FormControl {
    return this.signUpForm.get('firstnameControl') as FormControl;
  }

  get lastnameControl(): FormControl {
    return this.signUpForm.get('lastnameControl') as FormControl;
  }

  get usernameControl(): FormControl {
    return this.signUpForm.get('usernameControl') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signUpForm.get('passwordControl') as FormControl;
  }

  get pwdConfirmationControl(): FormControl {
    return this.signUpForm.get('pwdConfirmationControl') as FormControl;
  }

  onSubmitSignUpForm(): void {
    console.log('____signup_form_group :: ', this.signUpForm);
    const user: IUser = {
      firstname: this.firstnameControl.value,
      lastname: this.lastnameControl.value,
      username: this.usernameControl.value,
      password: this.passwordControl.value
    }
    this.authService.signUp(user).subscribe(user => {
      console.log('____signUp_user : ', user);
      this.route.navigate(['chat-room']);
    });
  }

}
