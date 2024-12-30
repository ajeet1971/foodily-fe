import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'https://localhost:7088/api/'; // Replace with your API URL
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;
  headers!: HttpHeaders;
  constructor(private http: HttpClient, private router: Router) {
    // Initialize the currentUser with the localStorage data or null
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

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
  // Get current user details
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login method
  login(payload: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}User/Login`, payload, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Signup method
  signup(payload: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}User/RegisterUser`, payload, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  addRecipe(addRecipe: any) {
    return this.http
      .post<any>(`${this.apiUrl}`, addRecipe, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  getRecipe() {
    return this.http
      .get<any>(`${this.apiUrl}Recipe/GetAllRecipes`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: any) {
    let currOrg = localStorage.getItem('selectedOrgId');
    let currInstance = localStorage.getItem('currentInstanceId');
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.message}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
