import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';
import { ChatComponent } from './views/chat-room/component/chat/chat.component';
import { UserViewComponent } from './views/chat-room/component/user-view/user-view.component';
import { TopicComponent } from './views/topic/topic.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    ChatComponent,
    UserViewComponent,
    TopicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
