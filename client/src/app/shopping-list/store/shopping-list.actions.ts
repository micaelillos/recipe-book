import { Action, createAction, props} from '@ngrx/store'
import { Ingredient } from 'src/app/shared/ingredient.model'

export enum Actions {
    ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT',
    UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT',
    DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT',
    ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS',
    START_EDIT = '[Shopping List] START_EDIT',
    STOP_EDIT = '[Shopping List] STOP_EDIT',
}



export const AddIngredientAction = createAction(Actions.ADD_INGREDIENT, props<Ingredient>());
export const AddIngredientsAction = createAction(Actions.ADD_INGREDIENTS, props<{ingredients: Ingredient[]}>());
export const UpdateIngredientAction = createAction(Actions.UPDATE_INGREDIENT, props<{ingredient: Ingredient}>())
export const DeleteIngredientAction = createAction(Actions.DELETE_INGREDIENT)
export const StartEditAction = createAction(Actions.START_EDIT, props<{index: number}>())
export const StopEditAction = createAction(Actions.STOP_EDIT)


