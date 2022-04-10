import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Subscription } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import {Store} from '@ngrx/store'
import { AddIngredientAction, AddIngredientsAction } from '../shopping-list/store/shopping-list.actions';
import { AppState } from '../store';
import { setRecipes } from './store/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipeService  {
  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = []
  constructor(private http: HttpClient, 
    private store: Store<AppState>
    ) {
        // this.fetchRecipes().subscribe()
  }

  
  fetchRecipes() {
    return this.http.get<{ data: Recipe[] }>(`${environment.API_URL}/recipes`, {
      observe: 'response',
      // headers: new HttpHeaders().set('auth-token', this.authService.user?.value?.token || '')
    })
      .pipe(map((response) => {
        return response.body.data.map(recipe => ({ ingredients: [], ...recipe }))
      }), tap(recipes => {
        // this.recipes = recipes
        // this.recipesChanged.next(this.recipes)
        this.store.dispatch(setRecipes({recipes}))
      }))
  }

  saveRecipes() {
    this.http.post<{ data: Recipe[] }>(`${environment.API_URL}/recipes`, {
      recipes: this.recipes
    }, {
      // headers: new HttpHeaders().set('auth-token', this.authService.user?.value?.token || '')
    }
    ).pipe(map(response => {
      return response.data
    }))
      .subscribe(response => console.log(response))

  }
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(AddIngredientsAction({ingredients}))
    // this.slService.addIngredients(ingredients);
  }

  getRecipeIndex(recipe: Recipe): number {
    return this.recipes.findIndex(recipeEl => recipeEl.name === recipe.name)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
