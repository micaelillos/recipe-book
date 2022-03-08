import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import { ClearErrorAction, LoginAction, LoginFailAction, LoginStartAction, LogoutAction } from "./auth.actions";

export interface State {
    user: User,
    errorMessage: string,
    loading: boolean
}

const initalState: State = {
    user: null,
    errorMessage: '',
    loading: false
}
export const authReducer = createReducer(initalState,
    on(LoginStartAction, (state) => ({ ...state, errorMessage: null, loading: true })),
    on(LoginAction, (state, { user }) => ({
        ...state,
        errorMessage: null,
        loading: false,
        user: new User(user.email, user.password, user.token, user.tokenExpiry)
    })),
    on(LoginFailAction, (state, payload) => ({ ...state, user: null, errorMessage: payload.message, loading: false })),
    on(LogoutAction, (state) => ({ ...state, user: null })),
    on(ClearErrorAction, (state) => ({...state, errorMessage: null}))
)