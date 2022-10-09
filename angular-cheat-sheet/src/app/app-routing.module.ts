import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './common/services/auth-guard.service';
import { AuthComponent } from './views/auth/auth.component';
import { ChatRoomComponent } from './views/chat-room/chat-room.component';

const routes: Routes = [
  {path: 'authentication', component: AuthComponent},
  {path: 'chat-room', component: ChatRoomComponent, canActivate:[AuthGuardService]},
  {path: '', redirectTo: 'authentication', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
