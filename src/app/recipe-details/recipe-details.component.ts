import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { Recipe } from '../models/recipe.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private ngxUILoaderService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.getRecipeDetails(recipeId);
  }

  async getRecipeDetails(id: string | null) {
    try {
      this.ngxUILoaderService.start();
      const recipeData = await this.apiService.getRecipeByID(id).toPromise();
      if (recipeData?.result) {
        this.recipe = recipeData.result;
        this.recipe.photo = this.apiService.getImageUrl(this.recipe);
        this.recipe.ing = recipeData.result.ingredients.split(',');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      // Handle errors gracefully (e.g., display an error message to the user)
    } finally {
      this.ngxUILoaderService.stop();
    }
  }
}
