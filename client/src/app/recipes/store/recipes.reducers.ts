import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import { setRecipes } from "./recipes.actions";

export interface recipesState {
    recipes: Recipe[]
}
const initalState: recipesState = {
    recipes: []
}

export const recipeReducer = createReducer(initalState,
    on(setRecipes, (state, payload) => {
        return { ...state, recipes: [...payload.recipes] }
    })
)

