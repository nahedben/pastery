import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IFournisseur, Fournisseur } from '../modelsInt/fournisseur';
import { Observable } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import { MatierePremiere } from '../modelsInt/matierePrem';
import { ILigneBonReception } from '../modelsInt/ligneBonReception';
import { BonReception } from '../modelsInt/bonReception';
const httpOptions={
  headers: new HttpHeaders({'Content-type':'Application/json'})

}
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
Url1="http://localhost:8080/api/v1/fourns";
Url2="http://localhost:8080/api/v1/fourn";
Url3="http://localhost:8080/api/v1/four";
Url4="http://localhost:8080/api/v1/mat/four";
Url5="http://localhost:8080/api/v1/Bon/four"
// @GetMapping("/fourns")
//@GetMapping("/fourn/{id}")
// @PostMapping("/fourn")
/***
 *
 * @PutMapping("four/{id}")
 * @GetMapping("mat/four/{id}")
 * @DeleteMapping("/four/{id}")
 */


  constructor(private http : HttpClient) { }

retreiveAllFour():Observable<Fournisseur[]>{
  return this.http.get<Fournisseur[]>(this.Url1);
}
retreivOneFour(id:number):Observable<Fournisseur>{
  return this.http.get<Fournisseur>(this.Url2+'/'+id)
}
createFour(four: Fournisseur):Observable<Fournisseur>{
  return this.http.post<Fournisseur>(this.Url2,four)
}
// @PutMapping("four/{id}")
editFourn(four:Fournisseur, id:number){
  let body= JSON.stringify(four);
  let idfr:number =four.id;
  return this.http.put<Fournisseur>(this.Url3+'/'+id,body,httpOptions)
}
//@DeleteMapping("/four/{id}")
removeFourn(id:number): Observable<any>{
return this.http.delete(this.Url3+'/'+id,{'responseType':'text'})
}
// @GetMapping("mat/four/{id}")
getFourMatList(four:Fournisseur):Observable<MatierePremiere[]>{
  let id =four.id;
  return this.http.get<MatierePremiere[]>(this.Url4+'/'+id)
}

getFourMatListByFourid(idFr:number):Observable<MatierePremiere[]>{
  return this.http.get<MatierePremiere[]>(this.Url4+'/'+idFr)
}
getFourBrList(idfr:number):Observable<BonReception[]>{
return this.http.get<BonReception[]>(this.Url5+'/'+idfr)
}
}
