import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})

export class BuscarComponent implements OnInit {
  termino : string =''

  heroes: Heroe[]=[];
  heroeSeleccionado : Heroe | undefined;

  constructor( private heroesServices:HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesServices.getFilter(this.termino.trim()).
      subscribe(data => this.heroes = data)
  }

  opcionSelecition(event : any){

    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
  const heroe: Heroe = event.option.value;
  this.termino= heroe.superhero;

  this.heroesServices.getHeroeID(heroe.id).
    subscribe(data => this.heroeSeleccionado=data);
}
}
