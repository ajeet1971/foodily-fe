import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'https://localhost:7088/api/'; // Replace with your API URL
  imageUrl = 'https://localhost:7088/';

  public currentUser!: Observable<any>;
  headers!: HttpHeaders;
  constructor(private http: HttpClient) {}

  //
  addPostAndPutHeaders() {
    this.headers = new HttpHeaders();
    if (typeof window !== 'undefined' && localStorage.getItem('access_token')) {
      this.headers = this.headers.append(
        'Authorization',
        `Bearer ${localStorage.getItem('access_token')}`
      );
    }
  }

  // Login method
  login(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}User/Login`, payload, {
      observe: 'response',
    });
  }

  // Signup method
  signup(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}User/RegisterUser`, payload, {
      observe: 'response',
    });
  }

  addRecipe(addRecipe: FormData) {
    this.addPostAndPutHeaders();
    return this.http.post<any>(`${this.apiUrl}Recipe/CreateRecipe`, addRecipe, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getRecipe(): Observable<{ result: Recipe[] }> {
    return this.http.get<any>(`${this.apiUrl}Recipe/GetAllRecipes`, {
      headers: this.headers,
    });
  }

  getRecipeByID(id: any): Observable<{ result: Recipe }> {
    let queryParams = new HttpParams().set('id', id.toString());

    return this.http.get<any>(`${this.apiUrl}Recipe/GetRecipeById`, {
      headers: this.headers,
      params: queryParams,
    });
  }

  getImageUrl(recipe: Recipe): string {
    try {
      return new URL(recipe.photo, this.imageUrl).toString();
    } catch (error) {
      console.error('Invalid URL:', recipe.photo, this.imageUrl, error);
      return '';
    }
  }
}
