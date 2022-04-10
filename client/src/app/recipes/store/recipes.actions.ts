import { createAction, on, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

enum RECIPES_ACTIONS {
    FETCH_RECIPES = '[recipes] FETCH_RECIPES' ,
    SET_RECIPES = '[recipes] SET_RECIPES'
}

export const setRecipes = createAction(RECIPES_ACTIONS.SET_RECIPES, props<{recipes: Recipe[]}>() )

