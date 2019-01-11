import { Component, OnInit, Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {

  auth: AuthService;

  constructor(auth: AuthService) { 
    this.auth = auth;
  }

  ngOnInit() {
  }

}
