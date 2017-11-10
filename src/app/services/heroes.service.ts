import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/Rx';

import { Heroe } from '../interfaces/heroe.interface';

@Injectable()
export class HeroesService {

	heroesUrl: string = 'https://heroesapp-9.firebaseio.com/heroes.json';
	heroeUrl: string = 'https://heroesapp-9.firebaseio.com/heroes/';

  constructor(private http: Http) { }

  nuevoHeroe(heroe: Heroe){
  	let heroeString = JSON.stringify(heroe);
  	let headers = new Headers({
  		'Content-Type':'application/json'
  	});
  	return this.http.post(this.heroesUrl, heroeString, {headers}).map(res => {
  		console.log(res.json());
  		return res.json();
  	});
  }

  actualizarHeroe(heroe: Heroe, key: string){
  	let heroeString = JSON.stringify(heroe);
  	let headers = new Headers({
  		'Content-Type':'application/json'
  	});
  	let url = this.heroeUrl + key + '.json';
  	return this.http.put(url, heroeString, {headers}).map(res => {
  		console.log(res.json());
  		return res.json();
  	});
  }

  obtenerHeroe(key: string){
  	let url = this.heroeUrl + key + '.json';
  	return this.http.get(url).map(res => res.json());
  }

  obtenerHeroes(){
  	return this.http.get(this.heroesUrl).map(res => res.json());
  }

  borrarHeroe(key: string){
  	let url = this.heroeUrl + key + '.json';
  	return this.http.delete(url).map(res => res.json());
  }

}
