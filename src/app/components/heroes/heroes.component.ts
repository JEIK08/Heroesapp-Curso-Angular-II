import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';
// import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

	heroes: any[] = [];
	keys: string[] = [];

  constructor(private heroesService: HeroesService) {
  	this.heroesService.obtenerHeroes().subscribe(data => {
  		console.log(data);
  		this.heroes = data;
  		for(let k in data){
  			this.keys.push(k);
  		}
  	});
  }

  ngOnInit() {
  }

  borrarHeroe(key: string){
  	this.heroesService.borrarHeroe(key).subscribe(data => {
  		if(data) console.log(data);
  		delete this.heroes[key];
  		this.keys.splice(this.keys.indexOf(key), 1);
  	});
  }

}
