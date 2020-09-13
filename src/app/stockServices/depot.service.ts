import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Depot } from '../modelsInt/depot';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';


const httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

 

@Injectable({
    providedIn:'root'
})
export class DepotService {
     UrlGL1=" http://localhost:8080/api/v1/depots";
     UrlG2="http://localhost:8080/api/v1/depot/"
     
    constructor(private http : HttpClient){}

    getDepotAll():Observable<Depot[]>{
        return this.http.get<Depot[]>(this.UrlGL1);
      }

      getOneDepot(id: number):Observable<Depot>{
        return this.http.get<Depot>(this.UrlG2+id);
      }

      createDepot(dp:Depot):Observable<Depot>{
        return this.http.post<Depot>(this.UrlG2, dp);
      }
      editDepot(dp:Depot, id:number): Observable<Depot>{
        let body =JSON.stringify(dp);
        return this.http.put<Depot>(this.UrlG2+id,body,httpOptions);
      }
      removeDepot(id:number):Observable<any>{
        return this.http.delete(this.UrlG2+id,{responseType:'text'})
      }
}