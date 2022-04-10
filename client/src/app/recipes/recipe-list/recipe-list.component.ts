import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { setRecipes } from '../store/recipes.actions';
import { selectRecipes } from '../store/recipes.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  suscription: Subscription
  recipes: Recipe[];

  constructor(public recipeService: RecipeService, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.suscription = this.store.select('recipes')
    .pipe(map(state => state.recipes))
    .subscribe(recipes => {
      this.recipes = recipes
    })
    // this.recipes = this.recipeService.getRecipes()
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
}
