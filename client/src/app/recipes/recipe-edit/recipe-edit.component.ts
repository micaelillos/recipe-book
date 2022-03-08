import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean
  id?: number
  recipeForm: FormGroup
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.editMode = !!params.id
      this.id = +params.id
      this.initForm()
    })
  }

  private initForm() {
    let recipe = this.editMode ? this.recipeService.getRecipes()[this.id] : null
    let recipeName = this.editMode  && recipe? recipe.name : null
    let recipeImagePath = this.editMode && recipe ? recipe.imagePath : null
    let recipeDescription = this.editMode && recipe ? recipe.description : null
    let recipeIngredients = new FormArray([])
    if (recipe && recipe.ingredients) {
      for (let ingr of recipe.ingredients) {
        recipeIngredients.push(new FormGroup({
          name: new FormControl(ingr.name, Validators.required),
          amount: new FormControl(ingr.amount, Validators.required)
        }))
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    })



  }

  onSubmit() {
    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    else
      this.recipeService.addRecipe(this.recipeForm.value)

    this.onCancel()
  }
  onAddIngredient() {
    let ingredientsArray = <FormArray>this.recipeForm.get('ingredients')
    ingredientsArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    }))
  }

  onDeleteIngredient(i: number) {
(<FormArray> this.recipeForm.get('ingredients')).removeAt(i)
  }
onDelete() {

}

onCancel() {
  this.router.navigate(['../'], {relativeTo:this.route})
}
}
