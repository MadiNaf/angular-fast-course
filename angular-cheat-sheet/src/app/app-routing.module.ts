import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';
import { TopicComponent } from './views/topic/topic.component';

const routes: Routes = [
  {path: 'authentication', component: AuthComponent},
  {path: 'topics', component: TopicComponent, canActivate:[AuthGuardService]},
  {path: 'chat-room', component: ChatRoomComponent, canActivate:[AuthGuardService]},
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
