import { Heroe } from './../../interfaces/heroes.interfaces';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
    mat-card{
      margin-top:20px
    }
  `]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[]= [];
  constructor(private heroesServices : HeroesService) { }

  ngOnInit(): void {

    this.heroesServices.getHeroes()
    .subscribe( data => {
      console.log("🚀 ~ file: listado.component.ts ~ line 20 ~ ListadoComponent ~ ngOnInit ~ data", data)
      this.heroes = data
      console.log("🚀 ~ file: listado.component.ts ~ line 20 ~ ListadoComponent ~ ngOnInit ~ this.heroes", this.heroes)
    })
  }

}
