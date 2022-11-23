import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width:100%;
      border-radius:5px;
    }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;
  id: string ='';
  constructor(private activateRouter : ActivatedRoute,
              private heroesServices:HeroesService,
              private router : Router) { }

  ngOnInit(): void {
    // this.activateRouter.params.
    // pipe(
    //   switchMap(({id}) => this.heroesServices.getHeroeID(id))
    // ).
    // subscribe(heroe => this.heroe = heroe
    // )


    this.heroesServices.getHeroeID(this.id).
      subscribe(data => {
        this.heroe=data
      }
        )


    this.getIfoForId(this.id)



  }
  getIfoForId(id : string){
    this.heroesServices.getHeroeID(this.id).
      subscribe(data =>
      this.heroe=data
      )


  }

  comeBack(){
    this.router.navigate(['heroes/listado'])
  }

}
