import { Injectable } from '@angular/core';
import { Recette } from '../modelsInt/recette';

import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { of } from "rxjs";
import 'rxjs/add/operator/delay';
@Injectable({
  providedIn: 'root'
})
export class RecetteServiceService {
  urlBase: string = 'http://localhost:8080/api/v1/Recettes'
  url1: string = 'http://localhost:8080/api/v1/Recette/'
  url2: string = 'http://localhost:8080/api/v1/Recette/updatecoast/'

  urlCreateLigneRecetteAssignMatPrem: string = ''
  urlCreateProductAndAssignFamily: string = ''
  urlCreateRecetteAsignProductAsignLr: string = 'http://localhost:8080/api/v1/Recette/';
  
  constructor(private http: HttpClient) { }




  retreiveAllRecette(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.urlBase);
  }

  retreiveOneRecette(id: number): Observable<Recette> {
    return this.http.get<Recette>(this.url1 + '/' + id);
  }

  getUserId(): Observable<{ id: number, name: string }> {
    return of({ id: 3, name: 'Bob' }).delay(1000);
    /* 
     * replace with http:
     * return this.http.get('http://my.api.com/api/user/id').map(res => res.json());
     */
  }

  getUserPermission(userId: number): Observable<{ permissions: string[] }> {
    return of({ permissions: ['user', 'admin'] }).delay(2000);
    /* return this.http.get(`http://my.api.com/api/user/${userId}/permissions`).map(res => res.json()); */
  }

  getUserInfo(userId: number): Observable<{ info: string }> {
    return of({ info: 'is a nice person'}).delay(2000);
    /* return this.http.get(`http://my.api.com/api/user/${userId}/info`).map(res => res.json()); */
  }


}
