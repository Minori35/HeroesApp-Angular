import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../e2e/src/environments/environment';

import { Auth } from '../interfaces/auth.interface';
import { tap, map } from "rxjs/operators";
import { Observable,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private _auth:Auth | undefined;

  get auth():Auth{
    return {...this._auth!}
  }
  constructor(private http:HttpClient) { }

  verificaAutentificacion():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1` ).
      pipe(
        map( auth => {
          this._auth= auth;
          console.log('map', auth);
          return true
        })

      )


  }

  login(){
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1` )
          .pipe(
            tap( data => this._auth = data),
            tap(data =>localStorage.setItem('token', data.id))
          );
  }
}
