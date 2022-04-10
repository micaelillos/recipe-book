import { ActionReducerMap } from "@ngrx/store";
import { authReducer, State as authState } from "./auth/store/auth.reducer";
import { recipeReducer, recipesState } from "./recipes/store/recipes.reducers";
import { shoppingListReducer, State as shoppingListState} from "./shopping-list/store/shopping-list.reducers";

export interface AppState {
    shoppingList: shoppingListState,
    auth: authState
    recipes: recipesState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer,
    recipes: recipeReducer
}