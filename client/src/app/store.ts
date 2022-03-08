import { ActionReducerMap } from "@ngrx/store";
import { authReducer, State as authState } from "./auth/store/auth.reducer";
import { shoppingListReducer, State as shoppingListState} from "./shopping-list/store/shopping-list.reducers";

export interface AppState {
    shoppingList: shoppingListState,
    auth: authState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
}