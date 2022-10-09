import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';

const routes: Routes = [
  {path: 'chat-room', component: ChatRoomComponent},
  {path: '', redirectTo: 'chat-room', pathMatch: 'full'},
  {path: '', redirectTo: 'chat-room', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
