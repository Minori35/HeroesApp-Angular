import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit  {

  constructor(private router :Router,
              private authService : AuthService) { }

  ngOnInit(): void {
    console.log('hola');

  }
 login(){

  this.authService.login().
    subscribe(data =>{
      console.log(data);
      if(data.id){
        this.router.navigate(['./heroes'])

      }
    })

 }

}
