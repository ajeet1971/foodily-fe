import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { GlobalEmmiterServiceService } from '../global-emmiter-service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSubscribe: Subject<any> = new Subject<any>();

  isLoggedIn: boolean = false;
  userName: string = '';
  dropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private globalEmmiterServiceService: GlobalEmmiterServiceService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.globalEmmiterServiceService.userLoggedIn
      .pipe(takeUntil(this.isSubscribe))
      .subscribe((res) => {
        this.checkLoginStatus();
      });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  checkLoginStatus() {
    if (typeof window !== 'undefined' && localStorage) {
      // Safe to use localStorage
      const token = localStorage.getItem('access_token'); // Check token existence
      if (token) {
        this.isLoggedIn = true;

        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken);
        this.userName = decodedToken.useName; // Assuming 'name' is a field in the token
      }
    } else {
      // Handle SSR or non-browser environments gracefully
      this.isLoggedIn = false;
    }
  }

  logout() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('access_token');
      sessionStorage.clear();
    }
    this.globalEmmiterServiceService.userLoggedIn.next(false);

    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login page
  }
}
