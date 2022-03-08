import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../store';
import { LoginAction, LogoutAction } from './store/auth.actions';
import { User } from './user.model';



export interface AuthResponseData {
  data: { email: string, password: string },
  token: string
  expiryDate: Date
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User>(null)
  autoLogoutTimer: any
  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

    autoLogin() {
    const userData = localStorage.getItem('authData')
    if (!userData) return
    // convert string date to Date
    const loadedUser = <{ email: string, password: string, _token: string, _tokenExpiry: string }>JSON.parse(userData)
    const parsedUser = new User(loadedUser.email, loadedUser.password, loadedUser._token, new Date(loadedUser._tokenExpiry))
    //Expired token
    if (!parsedUser.token) return
    // auto logout
    const expiryDuration = parsedUser.tokenExpiry.getTime() - new Date().getTime()
    this.autoLogout(expiryDuration)
    this.store.dispatch(LoginAction({user: parsedUser}))
    // this.user.next(parsedUser)
  }

  autoLogout(expiryDuration: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, expiryDuration)
  }


  logout() {
    this.store.dispatch(LogoutAction())
    localStorage.clear()
    if(this.autoLogoutTimer) clearTimeout(this.autoLogoutTimer)
    this.autoLogoutTimer = null
  }
}
