import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipe: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.getRecipeDetails(recipeId);
  }

  getRecipeDetails(id: string | null): void {
    this.recipe = {
      id: '1',
      title: 'Vegetarian Cheese Salad',
      image: 'assets/recipe.jpg',
      prepTime: 15,
      cookTime: 30,
      serves: 8,
      ingredients: [
        '4 Tbsp (57 gr) butter',
        '2 large eggs',
        '2 yogurt containers granulated sugar',
        '1 vanilla or plain yogurt, 170g container',
        '2 yogurt containers unbleached white flour',
        '1.5 yogurt containers milk',
        '1/4 tsp cinnamon',
      ],
      instructions: [
        'Preheat the oven to 350°F (175°C).',
        'Mix butter, sugar, and eggs in a bowl.',
        'Add yogurt, flour, and cinnamon. Mix until smooth.',
        'Pour into a greased pan and bake for 30 minutes.',
      ],
    };
  }
}
