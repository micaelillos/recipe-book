import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take} from "rxjs/operators";
import { AppState } from "../store";
import { AuthService } from "./auth.service";
import { selectUser } from "./store/auth.selectors";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .pipe(
               take(1), 
               map(user => selectUser(user)),
                map(user => {
                const isAuth = !!user
                if (isAuth)
                    return true
                else
                    return this.router.createUrlTree(['/auth'])
            }))
    }

}