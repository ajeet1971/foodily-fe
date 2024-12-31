import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toastr: ToastrService
  ) {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [],
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

  async onSubmit(): Promise<void> {
    if (this.recipeForm.valid) {
      console.log('Recipe Submitted:', this.recipeForm.value);
      let formData = new FormData();
      let ing = this.recipeForm?.value?.ingredients;

      formData.append('title', this.recipeForm?.value?.title);
      formData.append('Photo', this.recipeForm?.value?.image); // assuming this image is already uploaded or available
      formData.append('Description', this.recipeForm?.value?.description);
      formData.append('Cooktime', this.recipeForm?.value?.image);

      formData.append(
        'Ingredients',
        this.recipeForm.value.ingredients.join(', ')
      );
      formData.append('Cooktime', this.recipeForm?.value?.cookingTime);
      formData.append('Preptime', this.recipeForm?.value?.prepTime);
      formData.append('Instruction', this.recipeForm?.value?.instructions);
      formData.append('Tags', this.recipeForm?.value?.tag);
      formData.append('Difficulty', this.recipeForm?.value?.difficulty);

      await this.addRecipeApiCall(formData);
    }
  }

  async addRecipeApiCall(formData: any) {
    this.ngxUiLoaderService.start();
    try {
      let data = await this.apiService.addRecipe(formData).toPromise();

      this.imagePreview = '';
      this.recipeForm.get('image')?.setValue('');
      let ingForm = this.recipeForm.get('ingredients') as FormArray;
      ingForm.push(this.fb.control('', Validators.required));
      this.ngxUiLoaderService.stop();
      this.toastr.success('Recipe added successfully!');
    } catch (e: any) {
      this.toastr.error(e.error.message);
      this.ngxUiLoaderService.stop();
    } finally {
      this.recipeForm.reset();
      this.ngxUiLoaderService.stop();
    }
  }
}
