import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // setTimeout(() => {
      //   this.router.navigate(['/secret-random-number']);
       
      // }, 220);
      this.router.navigate(['/secret-random-number']);
      // alert("Login successful");
    }
    return !this.authService.isLoggedIn();
  }
}