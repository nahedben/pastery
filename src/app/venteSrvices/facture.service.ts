import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Facture } from '../modelsInt/fact-clt-bc';
import { Observable } from 'rxjs';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  baseUrl:string='http://localhost:8080/api/v1'
  url1:string=this.baseUrl+'/facture';
  url2:string=this.baseUrl+'/factures';
  url3:string='/assignClient/';
  url4:string='/TotalPrice';
  url5:string='/reglement';
  url8:string='/validation';
  url6:string='/annulerlignFc/';
  url7:string='/editerlignFc/';


  
  
  
  // Put ::: "facture/{id}/reglement" valider le reglement
 // Put :: /facture/{idfc}/annulerlignFc/{LinFID}
 //put ::: "/facture/{idfc}/editerlignFc/{LinFID}"
 ///Delete :::facture/{id}
  constructor(private http: HttpClient) { }

  retreiveOneFacture(id:number):Observable<Facture>{
    return this.http.get<Facture>(this.url1+'/'+id)    
  }
  retreiveAllFacture():Observable<Facture[]>{
    return this.http.get<Facture[]>(this.url2)
  }

  removeOneFacture(id:number):Observable<any>{
    return this.http.delete(this.url1+'/'+id)
  }

  createFacture(fct: Facture):Observable<Facture>{
    return this.http.post<Facture>(this.url1,fct)
  }
// Put:::/facture/{idfct}/assignClient/{idcl}
  assignClientToFac(idfct: number, idClt:number):Observable<Facture> {
    return this.http.put<Facture>(this.url1+'/'+idfct+this.url3+'/'+idClt,httpOptions)
  }
//// Put:::"facture/{id}/TotalPrice"
calculTotalPrice(id:number):Observable<Facture>{
  return this.http.put<Facture>(this.url1+'/'+id+'/'+this.url4,httpOptions)
}


// url5:string='/reglement';
// put :: facture/{id}/validation : pour validation facture on applique la mise a jour de stock

validerFacture(id:number):Observable<Facture>{
  return this.http.put<Facture>(this.url1+'/'+id+'/'+this.url8, httpOptions)
}


// Put :: /facture/{idfc}/annulerlignFc/{LinFID}
// url6:string='/annulerlignFc/';

annulereligneFactureInFact(idfc:number, idlf:number): Observable<Facture>{
  return this.http.put<Facture>(this.url1+'/'+idfc+'/'+this.url6+'/'+idlf,httpOptions)
}

//put ::: "/facture/{idfc}/editerlignFc/{LinFID}"
// url7:string='/editerlignFc/';

editerLigneFactureInFacture(idfc:number, idlf:number):Observable<Facture>{
  return this.http.put<Facture>(this.url1+'/'+idfc+'/'+this.url7+'/'+idlf,httpOptions)
}

// facture/{id}/reglement"
actionnerReglement(id: number):Observable<Facture>{
  return this.http.put<Facture>(this.url1+'/'+id+'/reglement',httpOptions)
}


}
