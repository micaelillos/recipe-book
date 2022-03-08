import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export enum Actions {
    LOGIN_INIT = '[Auth] LOGIN INIT',
    LOGIN = '[Auth] LOGIN',
    LOGIN_FAIL = '[Auth] LOGIN_FAIL',
    LOGOUT = '[Auth] LOGOUT',
    CLEAR_ERROR = '[Auth] Clear error'
}

export const LoginFailAction = createAction(Actions.LOGIN_FAIL, props<{message: string}>())
export const LoginStartAction = createAction(Actions.LOGIN_INIT, props<{email: string, password: string, logIn: boolean}>())
export const LoginAction = createAction(Actions.LOGIN, props<{ user: User }>())
export const LogoutAction = createAction(Actions.LOGOUT)
export const ClearErrorAction = createAction(Actions.CLEAR_ERROR)