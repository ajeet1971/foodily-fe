import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-single-recipe-card',
  standalone: true,
  imports: [],
  templateUrl: './single-recipe-card.component.html',
  styleUrl: './single-recipe-card.component.css',
})
export class SingleRecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() viewClick: EventEmitter<number | undefined> = new EventEmitter<
    number | undefined
  >();

  viewRecipe(id: number | undefined) {
    this.viewClick.next(id);
  }
}
