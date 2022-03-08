import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;


  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {


    this.route.params.subscribe(params => {
      // Deal with invalid params.id todo
      let recipes = this.recipeService.getRecipes()
      // if (params.id > recipes.length - 1) {
      //   this.router.navigate(['../'], { relativeTo: this.route })
      //   return
      // }
      this.recipe = recipes[params.id]
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeService.getRecipeIndex(this.recipe))
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
