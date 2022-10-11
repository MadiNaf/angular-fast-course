import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserConnected: boolean = false;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.isUserConnected = !!this.storeService.user
  }

}
