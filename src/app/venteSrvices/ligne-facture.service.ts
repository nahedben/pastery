import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LigneFacture } from '../modelsInt/fact-clt-bc';
import { Observable } from 'rxjs';
const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class LigneFactureService {
baseUrl:string="http://localhost:8080/api/v1"
urlSec1:string="/ligneFactures";
urlSec2:string="/ligneFacture";
urlSec3:string="/assignProduit/";
urlSec4:string="/calculTotalPrice";
urlSec5:string="/AssignFacture/"

  constructor(private http: HttpClient) { }


retreiveAllLigneFacture():Observable<LigneFacture[]>{
  return this.http.get<LigneFacture[]>(this.baseUrl+this.urlSec1)
}

retreiveOneLigneFacture(id:number):Observable<LigneFacture>{
  return this.http.get<LigneFacture>(this.baseUrl+this.urlSec2+'/'+id)
}

createLigneFacture(lf:LigneFacture):Observable<LigneFacture>{
  return this.http.post<LigneFacture>(this.baseUrl+this.urlSec2,lf)
}
// /ligneFacture/{idLFct}/assignProduit/{idPrd}
assignePrdToLigneFacture(idLfct:number, idPrd:number ):Observable<LigneFacture>{
  return this.http.put<LigneFacture>(this.baseUrl+this.urlSec2+'/'+idLfct+this.urlSec3+idPrd,httpOptions )
}

// /ligneFacture/{id}/calculTotalPrice"

calculTotalPrice(id:number):Observable<LigneFacture>{
  return this.http.put<LigneFacture>(this.baseUrl+this.urlSec2+'/'+id+this.urlSec4,httpOptions)
}

editerQtyLigneFacture(lf:LigneFacture, id:number):Observable<LigneFacture>{
  return this.http.put<LigneFacture>(this.baseUrl+this.urlSec2+'/'+id, lf,httpOptions)
}
// "ligneFacture/{idlgfc}/AssignFacture/{idfc}"
AssignFactureToLignFct(idLfc:number, idfc:number):Observable<LigneFacture>{
  return this.http.put<LigneFacture>(this.baseUrl+this.urlSec2+'/'+idLfc+this.urlSec5+idfc,httpOptions)
}
deleteLigneFacture(id:number):Observable<any>{
  return this.http.delete(this.baseUrl+this.urlSec2+'/'+id)
}

retreiveAllLignFactFromFct(id:number): Observable<LigneFacture[]>{
  return this.http.get<LigneFacture[]>(this.baseUrl+"/ligneFacture/fct/"+id)
}
}
