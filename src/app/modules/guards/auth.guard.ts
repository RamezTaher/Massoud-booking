import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'sharedServices';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.url[0].path === 'auth' && this.storageService.isLogged()) {
      this.router.navigateByUrl('/pages/home');
      return false;
    }
    if (!this.storageService.isLogged()) {
      return false;
    }

    return this.storageService.isLogged();
  }
}
