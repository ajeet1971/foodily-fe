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
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      image: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)]),
      cookingTime: ['', [Validators.required, Validators.min(1)]],
      prepTime: ['', [Validators.required, Validators.min(1)]],
      instructions: ['', [Validators.required, Validators.minLength(10)]],
      tag: [''],
      difficulty: [''],
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

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.recipeForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      console.log('Recipe Submitted:', this.recipeForm.value);
      let formData = new FormData();
      let ing = this.recipeForm?.value?.ingredients;
      // Add JSON properties as individual form fields
      formData.append('title', this.recipeForm?.value?.title);
      formData.append('image', this.recipeForm?.value?.image); // assuming this image is already uploaded or available
      formData.append(
        'ingredients',
        this.recipeForm.value.ingredients.join(', ')
      );
      formData.append('cookingTime', this.recipeForm?.value?.cookingTime);
      formData.append('prepTime', this.recipeForm?.value?.prepTime);
      formData.append('instructions', this.recipeForm?.value?.instructions);
      formData.append('tag', this.recipeForm?.value?.tag);
      formData.append('difficulty', this.recipeForm?.value?.difficulty);
      // Handle form submission logic here (e.g., send to API or store locally)
      formData.forEach((value, key) => {
        console.log(key + ' ' + value);
      });
    }
  }
}
