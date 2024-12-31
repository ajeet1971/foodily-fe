import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Check if running in browser
      const isLoggedIn = !!localStorage.getItem('access_token');
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true; // Return true on server or if localStorage is unavailable
  }
}
