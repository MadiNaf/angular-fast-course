import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';
import { ChatComponent } from './views/chat-room/component/chat/chat.component';
import { UserViewComponent } from './views/chat-room/component/user-view/user-view.component';
import { TopicComponent } from './views/topic/topic.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoginComponent } from './views/auth/components/login/login.component';
import { InputCustomComponent } from './common/components/input-custom/input-custom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './views/auth/components/signup/signup.component';
import { AuthGuardService } from './common/services/auth-guard.service';
import { NavbarComponent } from './common/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    ChatComponent,
    UserViewComponent,
    TopicComponent,
    AuthComponent,
    LoginComponent,
    InputCustomComponent,
    SignupComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
