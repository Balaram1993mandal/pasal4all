import { Component, OnInit } from '@angular/core';

// import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  constructor(private auth : AuthService) { 
    
  }

 
  //method added
  login() {
    this.auth.login();
  }
}
