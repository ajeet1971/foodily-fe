import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      image: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      cookingTime: ['', [Validators.required, Validators.min(1)]],
      prepTime: ['', [Validators.required, Validators.min(1)]],
      instructions: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      console.log('Recipe Submitted:', this.recipeForm.value);
      // Handle form submission logic here (e.g., send to API or store locally)
    }
  }
}
