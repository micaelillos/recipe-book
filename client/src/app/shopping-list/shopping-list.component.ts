import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store'
import { AppState } from '../store';
import { StartEditAction } from './store/shopping-list.actions';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>
  ingChangedSub: Subscription
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
 }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index)
    this.store.dispatch(StartEditAction({index}))
  }


}
