import { Statement } from '@angular/compiler';
import { Action, createReducer, createSelector, on } from '@ngrx/store'
import { Ingredient } from "src/app/shared/ingredient.model";
import { Actions, AddIngredientAction, AddIngredientsAction, DeleteIngredientAction, StartEditAction, StopEditAction, UpdateIngredientAction } from './shopping-list.actions';


export interface State {
    ingredients: Ingredient[],
    editedItem?: Ingredient
    editedItemIndex?: number
}


const initalState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedItem: null,
    editedItemIndex: -1
}


export const shoppingListReducer = createReducer(initalState,
    on(AddIngredientAction, (state, payload) => ({
        ...state,
        ingredients: [...state.ingredients, payload]
    })),

    on(AddIngredientsAction, (state, { ingredients }) => ({
        ...state,
        ingredients: [...state.ingredients, ...ingredients]
    })),
    on(UpdateIngredientAction, (state, payload) => {
        const newIngredients = [...state.ingredients]
        newIngredients[state.editedItemIndex] = payload.ingredient
        return {
            ...state,
            editedItem: null,
            editedItemIndex: -1,
            ingredients: newIngredients
        }
    }),
    on(DeleteIngredientAction, (state) => ({
            ...state,
            editedItem: null,
            editedItemIndex: -1,
            ingredients: state.ingredients.filter((_,i) => i !== state.editedItemIndex)
    })),
    on(StartEditAction, (state, { index }) => ({
            ...state,
            editedItemIndex: index,
            editedItem: { ...state.ingredients[index] }
    })),
    on(StopEditAction, (state) => ({
        ...state,
        editedItemIndex: -1,
        editedItem: null
    }))


)

