import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authServices: AuthService,
              private router :Router){}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean {
      return this.authServices.verificaAutentificacion().
        pipe(
          tap( estaAutentico=>{
            if(!estaAutentico){}
            this.router.navigate(['./auth/login'])
          }
        )

        )

    //   if(this.authServices.auth.id){
    //     return true;
    //   }
    //   console.log('Bloqueado por el AUTHGUARD-CanActivate');


    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean > | Promise<boolean> | boolean {
      return this.authServices.verificaAutentificacion().
        pipe(
          tap( estaAutentico=>{
            if(!estaAutentico){}
            this.router.navigate(['./auth/login'])
          }
        )

        )
  }
}
