import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';
import { ChatComponent } from './views/chat-room/components/chat/chat.component';
import { UserViewComponent } from './views/chat-room/components/user-view/user-view.component';
import { TopicComponent } from './views/topic/topic.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoginComponent } from './views/auth/components/login/login.component';
import { InputCustomComponent } from './common/components/input-custom/input-custom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
