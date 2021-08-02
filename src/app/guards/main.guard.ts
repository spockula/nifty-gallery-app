import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router) {
  }

  async canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Promise<boolean> {
    return new Promise((resolve) => {
      const isComplete = localStorage.getItem('address');
      if (isComplete === null) {
          this.router.navigateByUrl('/login');
      }
      resolve(true);
    });
  }
}
