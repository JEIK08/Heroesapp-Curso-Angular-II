import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

	heroe: Heroe = {
		nombre: '',
		casa: 'Marvel',
		bio: ''
	};

	nuevo: boolean = true;
	id: string;

  constructor(private heroesService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) {
  	this.activatedRoute.params.subscribe(params => {
  		this.id = params['id']
  		if(this.id != 'nuevo'){
  			this.heroesService.obtenerHeroe(this.id).subscribe(heroe => this.heroe = heroe);
  		}
  	});

  }

  ngOnInit() {
  }

  guardar(){
  	console.log(this.heroe);
  	if(this.id == 'nuevo'){
	  	this.heroesService.nuevoHeroe(this.heroe).subscribe(data => {
	  		this.router.navigate(['/heroes', data.name]);
	  	}, error => console.error(error));
  	}else{
  		this.heroesService.actualizarHeroe(this.heroe, this.id).subscribe(data => {
	  		console.log(data);
	  	}, error => console.error(error));
  	}
  }

  agregarNuevo(forma: NgForm){
  	this.router.navigate(['/heroes','nuevo']);
  	forma.reset({casa: 'Marvel'});
  }

}
