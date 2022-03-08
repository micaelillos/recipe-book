import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppState } from "src/app/store"
import { State } from "./auth.reducer"

export const featureKey = 'auth'

export const selectFeature = (state: State) => state.user

export const selectUser = createSelector(
    selectFeature,
    (user) => user
)