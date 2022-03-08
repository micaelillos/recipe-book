import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store'

import { Ingredient } from '../../shared/ingredient.model';
import { Actions, AddIngredientAction, DeleteIngredientAction, StopEditAction, UpdateIngredientAction } from '../store/shopping-list.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm
  subscription: Subscription;
  editMode = false
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(
    private store: Store<AppState>) { }

  ngOnInit() {
   this.subscription =  this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedItemIndex > -1) {
        this.editMode = true
        this.editedItemIndex = stateData.editedItemIndex
        this.editedItem = stateData.editedItem
      this.form.setValue({ name: this.editedItem.name, amount: this.editedItem.amount })
      }
      else
        this.editMode = false
    })
  }

  onAddItem(form: NgForm) {
    const ingName = form.value.name
    const ingAmount = form.value.amount
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode)
      this.store.dispatch(UpdateIngredientAction({ ingredient: newIngredient }))
    else
      this.store.dispatch(AddIngredientAction(newIngredient))


    this.resetForm()
  }

  resetForm() {
    this.editMode = false
    this.form.resetForm()
    this.store.dispatch(StopEditAction())
  }

  onDeleteItem() {
    // this.slService.deleteIngredient(this.editedItemIndex)
    this.store.dispatch(DeleteIngredientAction())
    this.resetForm()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.store.dispatch(StopEditAction())
  }
}
