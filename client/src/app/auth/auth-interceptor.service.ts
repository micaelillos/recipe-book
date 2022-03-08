import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take, exhaustMap, map } from 'rxjs/operators'
import { AppState } from "../store";
import { AuthService } from "./auth.service";
import { selectUser } from "./store/auth.selectors";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService, private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .pipe(
                take(1),
                map(user => selectUser(user)),
                exhaustMap(user => {
                    if(!user) return next.handle(req)
                    console.log('token: ',user.token)
                    const modifiedReq = req.clone({ headers: new HttpHeaders().set('auth-token', user.token) })
                    return next.handle(modifiedReq)
                })
            )
    }

}