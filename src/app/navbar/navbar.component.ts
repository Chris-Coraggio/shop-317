import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  auth: AuthService;

  constructor(auth: AuthService) { 
    this.auth = auth;
  }

  ngOnInit() {
  }

}
