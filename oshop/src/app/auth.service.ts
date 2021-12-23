import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { ActivatedRoute, Router} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ : Observable <firebase.User | any>;
  constructor( private afAuth: AngularFireAuth, public route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl); 

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
    

    // this.router.navigate(['/']);
  }

  logout() {
    this.afAuth.signOut();
  }
}
