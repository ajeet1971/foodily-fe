import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuard, LoginGuard } from './gurd/aurh.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route to home
  {
    path: 'recipe-details',
    component: RecipeDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuard],
  },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] }, // Redirects logged-in users away
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] }, // Redirects logged-in users away
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Wildcard route for undefined paths
];
