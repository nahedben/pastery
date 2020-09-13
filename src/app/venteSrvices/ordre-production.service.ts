import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OrdreProduction } from '../modelsInt/Produit';
import { Observable } from 'rxjs';
import { NbLoginComponent } from '@nebular/auth';
import { ThreeColumnsLayoutComponent } from '../@theme/layouts';
const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class OrdreProductionService {
  url1: string = 'http://localhost:8080/api/v1/OrdPrd'
  url2 : string='http://localhost:8080/api/v1/OrdPrd/StartProd/'
  url3:  string='http://localhost:8080/api/v1/OrdPrd/finishProd/'

  url4: string ='http://localhost:8080/api/v1/OrdPrd/assignRecett/'
  
  
  constructor(private http : HttpClient) { }


  retreiveOrdProds(): Observable<OrdreProduction[]>{
    return this.http.get<OrdreProduction[]>(this.url1);
  }

  retreiveOneOrdProd(id:number):Observable<OrdreProduction>{
    return this.http.get<OrdreProduction>(this.url1+id)
  }

  createOrdreProductionAssigneRec(orp: OrdreProduction):Observable<OrdreProduction>{
   return  this.http.post<OrdreProduction>(this.url1,orp)
  }

  lancerOrdreProduction(id: number):Observable<OrdreProduction>{
return this.http.put<OrdreProduction>(this.url2+id,httpOptions)
  }

  temrinerProduction(id:number):Observable<OrdreProduction>{
    return this.http.put<OrdreProduction>(this.url3+id,httpOptions)
  }

  removeOrdreProduction(id:number):Observable<any>{
    return this.http.delete(this.url1+'/'+id,{responseType:'text'})
  }

}
