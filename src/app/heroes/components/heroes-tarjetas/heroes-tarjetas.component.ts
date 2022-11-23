import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroes-tarjetas',
  templateUrl: './heroes-tarjetas.component.html',
  styles: [`
    mat-card{
      margin-top:20px
    }
  `]
})
export class HeroesTarjetasComponent  {

  //Input
  @Input() heroe!: Heroe ;

  constructor(){

  }


}
