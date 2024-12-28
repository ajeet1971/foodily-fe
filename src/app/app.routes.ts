import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route to home
      { path: 'home', component: HomeComponent },
      { path: 'recipe-details', component: RecipeDetailsComponent },
      { path: 'add-recipe', component: AddRecipeComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  //   { path: '**', redirectTo: 'login' }, // Wildcard route to handle undefined paths
];
