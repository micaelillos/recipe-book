import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingEditComponent } from './shopping-edit.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AddIngredientAction } from '../store/shopping-list.actions';
import { Ingredient } from 'src/app/shared/ingredient.model';
import 'jest';


describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;
  let storeMock: any;

  beforeEach(async () => {
    storeMock = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of({ editedItemIndex: -1 }))
    };

    await TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      imports: [FormsModule],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch AddIngredientAction on valid form submission', () => {
    const mockForm = {
      value: { name: 'Tomato', amount: 3 },
      resetForm: jest.fn()
    } as unknown as NgForm;

    component.onAddItem(mockForm);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      AddIngredientAction(new Ingredient('Tomato', 3))
    );
  });
});
