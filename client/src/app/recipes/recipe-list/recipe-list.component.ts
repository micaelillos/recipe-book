import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  suscription: Subscription
  recipes: Recipe[];

  constructor(public recipeService: RecipeService) {
  }

  ngOnInit() {
    this.suscription = this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes
    })
    this.recipes = this.recipeService.getRecipes()
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
}
