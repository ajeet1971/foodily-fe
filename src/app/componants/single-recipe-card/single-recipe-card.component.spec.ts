import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRecipeCardComponent } from './single-recipe-card.component';

describe('SingleRecipeCardComponent', () => {
  let component: SingleRecipeCardComponent;
  let fixture: ComponentFixture<SingleRecipeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleRecipeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRecipeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
