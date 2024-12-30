import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiUrl = 'https://localhost:7088/api/'; // Replace with your API URL
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    // Initialize the currentUser with the localStorage data or null
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // Get current user details
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
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

  // Logout method
  logout(): void {
    // Remove user from local storage and set currentUser to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Store user data in localStorage
  private setSession(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
