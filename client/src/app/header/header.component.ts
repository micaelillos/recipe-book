import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { selectUser } from '../auth/store/auth.selectors';
import { RecipeService } from '../recipes/recipe.service';
import { AppState } from '../store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  isAuthenticated = false
  userSub: Subscription

  constructor(private recipeService: RecipeService, private authService: AuthService,

    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('auth')
    .pipe(
      map(user => selectUser(user))
    )
    .subscribe(user => {
      this.isAuthenticated = !!user
    })

  }

  ngOnDestroy(): void {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  saveData() {
    this.recipeService.saveRecipes()
  }
  fetchData() {
    this.recipeService.fetchRecipes().subscribe()
  }

  onLogOut() {
    this.authService.logout()
  }
}
