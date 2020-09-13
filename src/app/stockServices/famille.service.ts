import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Famille } from '../modelsInt/famille';
import { identifierModuleUrl } from '@angular/compiler';
import { Produit } from '../modelsInt/Produit';


const httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

 

@Injectable({
    providedIn:'root'
})
export class FamilleService {
     Url1=" http://localhost:8080/api/v1/familles";
     Url2=" http://localhost:8080/api/v1/famille";
    //@GetMapping("/familles")
    //@GetMapping("/famille/{id}")
    //@PostMapping("/famille")
    //@PutMapping("/famille/{id}")
    //@DeleteMapping("/famille/{id}")
     
    constructor(private http : HttpClient){}

    retreiveAllFam():Observable<Famille[]>{
        return this.http.get<Famille[]>(this.Url1);
      }
    retreiveOneFam(id:number):Observable<Famille>{
      return this.http.get<Famille>(this.Url2+'/'+id);
    }
    createFam(fam:Famille):Observable<Famille>{
      return this.http.post<Famille>(this.Url2,fam);
    }
    editFam(fam:Famille,id:number):Observable<Famille>{
      let body = JSON.stringify(fam);
      return this.http.put<Famille>(this.Url2+'/'+id,body,httpOptions);
    }
    removeFam(id:number):Observable<any>{
      return this.http.delete(this.Url2+'/'+id,{responseType:'text'});
    }

    retreiveAllProdFami(id : number): Observable<Produit[]>{
      return this.http.get<Produit[]>('http://localhost:8080/api/v1/fam/produit/'+id);
    }

     
}