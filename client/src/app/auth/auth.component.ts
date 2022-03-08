import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from '../store';
import { AuthResponseData, AuthService } from './auth.service';
import { ClearErrorAction, LoginStartAction } from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogInMode = false
  token: string
  isLoading = false
  error: string = null
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading
      this.error = authState.errorMessage
    })
  }




  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode
  }


  clearError() {
    this.store.dispatch(ClearErrorAction())
  }
  onSubmit(form: NgForm) {
    this.isLoading = true
    const { email, password } = form.value
    if (this.isLogInMode) {
      this.store.dispatch(LoginStartAction({email, password, logIn: true}))
    }
    else {
      this.store.dispatch(LoginStartAction({email, password, logIn: false}))
    }
    form.reset()
  }
}
