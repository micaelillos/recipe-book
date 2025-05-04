import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingEditComponent } from './shopping-edit.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredientAction, StopEditAction } from '../store/shopping-list.actions';
import { AppState } from 'src/app/store';

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let store: any;

  beforeEach(async () => {
    store = {
      select: jest.fn().mockReturnValue(of({
        editedItemIndex: -1,
        editedItem: null
      })),
      dispatch: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule],
      providers: [{ provide: Store, useValue: store }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch AddIngredientAction when adding a new item', () => {
    const mockedForm = {
      value: {
        name: 'Avocado',
        amount: 5
      },
      resetForm: jest.fn()
    } as unknown as NgForm;

    component.editMode = false;

    component.onAddItem(mockedForm);

    expect(store.dispatch).toHaveBeenCalledWith(AddIngredientAction(new Ingredient('Avocado', 5)));
  });
});
