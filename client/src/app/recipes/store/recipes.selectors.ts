import { createSelector, State } from "@ngrx/store";
import { recipesState } from "./recipes.reducers";

export const featureKey = 'recipes'
export const selectFeature = (state: recipesState) => state.recipes
export const selectRecipes = createSelector(selectFeature, recipes => recipes)