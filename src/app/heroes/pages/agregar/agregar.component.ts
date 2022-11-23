import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width:100%;
      boder-radius:5px
    }
    `
  ]
})
export class AgregarComponent implements OnInit {
  publishers =[
    {
    id :'DC Comics',
    desc : 'DC - Comics'
    },
    {
      id :'Marvel Comics',
      desc : 'Marvel - Comics'
    }
  ];

  heroe : Heroe ={
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
    id: '',
    user: '',
    password: ''
  }
  constructor(
              private heroesServices:HeroesService,
              private activatedRoute :ActivatedRoute,
              private router:Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  if(this.router.url.includes('editar')){

    this.activatedRoute.params.
    pipe(
      switchMap(({id}) => {
        console.log("🚀 ~ file: agregar.component.ts ~ line 46 ~ AgregarComponent ~ ngOnInit ~ id", id)
        return this.heroesServices.getHeroeID(id)
      })
    ).
    subscribe( data => {
       this.heroe = data
       console.log("🚀 ~ file: agregar.component.ts ~ line 48 ~ AgregarComponent ~ ngOnInit ~ this.heroe", this.heroe)
    })
  }



}
mostrarSnakBar(mensaje : string){
  this.snackBar.open(mensaje , 'ok!' , {
    duration: 2500
  });
}

  guardar(){
    if(this.heroe.superhero.length === 0){
    console.log("🚀 ~ file: agregar.component.ts ~ line 59 ~ AgregarComponent ~ guardar ~ this.heroe.superhero.trim().length", this.heroe.superhero.trim().length)
    return
    }


      if(this.heroe.id ){
     //Actualizar
      this.heroesServices.putActualizarHeroe(this.heroe).
      subscribe(heroe=> this.mostrarSnakBar('Registro Actualizado')
      )
    }else{
     //crear
    this.heroesServices.postAgregarHeroe(this.heroe).
    subscribe(heroe =>{
      this.router.navigate(['/heroe/editar', heroe.id]);
      this.mostrarSnakBar('Registro Actualizado');
    })
   }
  }

  borrar(){

    this.dialog.open(ConfirmarComponent,{
      width : '250px'
    })
    // this.heroesServices.deleteHeroe(this.heroe.id)
    //   .subscribe(data=>{
    //     this.router.navigate( ['/heroe']);
    //   })
  }
}
