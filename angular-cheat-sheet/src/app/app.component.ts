import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './common/services/rest-api.service';
import { StoreService } from './common/services/store.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  constructor(private commonRestApiService: RestApiService,
              private storeService: StoreService) { }
  
  ngOnInit(): void {
    this.handleReload()
  }

  handleReload(): void {
    const userSession = this.commonRestApiService.getSessionStorage();
    if (!this.storeService.user && userSession) {
      const userId = userSession ? userSession?.id : null;
      console.log(userId)
      if (!userId) return ;
  
      this.commonRestApiService.getUserById(Number(userId)).subscribe(user => {
        this.storeService.user = user;
      });
    }
  }

}
