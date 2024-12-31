import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuard } from './gurd/auth.guard';
import { LoginGuard } from './gurd/login.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
