import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod'
import { AuthResponseData } from '../auth.service'
import { User } from '../user.model'
import { LoginAction, LoginFailAction, LoginStartAction, LogoutAction } from './auth.actions'
// import { Actions as AuthActions } from './auth.actions'

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }
    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoginStartAction),
            exhaustMap(action =>
                this.http.post<AuthResponseData>(`${environment.API_URL}/auth/${action.logIn ? 'login' : 'register'}`, {
                    email: action.email,
                    password: action.password
                })
                    .pipe(
                        map(resData => this.handleAuthentication(resData)),
                        catchError(error => of(LoginFailAction({ message: error.error })))
                    )
            )
        )
    })

    authRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoginAction, LogoutAction),
            tap(() => {
                this.router.navigate(['/'])
            })
        )
    }, { dispatch: false })


    handleAuthentication(resData: AuthResponseData) {
        const userResponse = new User(resData.data.email, resData.data.password, resData.token, resData.expiryDate)
        localStorage.setItem('authData', JSON.stringify(userResponse))
        return LoginAction({ user: new User(resData.data.email, resData.data.password, resData.token, resData.expiryDate) })
    }
}