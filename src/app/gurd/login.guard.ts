import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Check if running in browser
      const isLoggedIn = !!localStorage.getItem('access_token');
      if (isLoggedIn) {
        this.router.navigate(['/home']);
        return false;
      }
    }
    return true;
  }
}
