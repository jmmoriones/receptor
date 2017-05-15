import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {
  constructor(public http: Http) {
    
  }
  validar(user:any){
  	console.log(user);
  	
  	return this.http.post("http://192.168.0.16:3000/api/receiver/sign-in", user)
  	.map((response:Response)=>response.json());
  }

  getUsers(){	
  	return this.http.get("http://192.168.0.16:3000/api/receivers")
  	.map((response:Response)=>response.json());
  }
}
