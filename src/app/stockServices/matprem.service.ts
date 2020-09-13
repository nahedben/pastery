import { Injectable, RendererStyleFlags2 } from '@angular/core';
import {HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { MatierePremiere,IMatierePrem } from '../modelsInt/matierePrem';

const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MatpremService {
  matprems
 private  baseUrlG2= 'http://localhost:8080/api/v1/matprem';
 private UrlGL1='http://localhost:8080/api/v1/matprems';
 private UrlCQt='http://localhost:8080/api/v1/matprem/qty';
 private UrlAssDepot='http://localhost:8080/api/v1/matprem/assignDepot';
 private UrlAssFam='http://localhost:8080/api/v1/matprem/assignFamille';

  constructor(private http : HttpClient) { }


getMatPrem():Observable<MatierePremiere[]>{
  return this.http.get<MatierePremiere[]>(this.UrlGL1);
}

getMatP(id: number):Observable<MatierePremiere>{
  return this.http.get<MatierePremiere>(this.baseUrlG2+'/'+id);
}
createMatPrem ( mtPrem:MatierePremiere):Observable<MatierePremiere>{
  return this.http.post<MatierePremiere>( this.baseUrlG2,mtPrem)
}
//non encore appliquer 
editerQty(mtPrem:MatierePremiere, id: number):Observable<MatierePremiere>{
  let body =JSON.stringify(mtPrem);
  return this.http.put<MatierePremiere>(this.UrlCQt+'/'+id,body,httpOptions)
}
//non encore appliquer
assignDepotMat(mt: MatierePremiere, idDep: number):Observable<MatierePremiere>{
 
  let body=JSON.stringify(mt);
  let id:number =mt.id;
    return this.http.put<MatierePremiere>(this.UrlAssDepot+'/'+id+'/'+idDep,body,httpOptions)
}

//non encore appliquer
assignFamille(mt: MatierePremiere,idF: number):Observable<MatierePremiere>{
  let body= JSON.stringify(mt);
  let id : number =mt.id;
  return  this.http.put<MatierePremiere>(this.UrlAssFam+'/'+id+'/'+idF,body,httpOptions)
}

ModifyMatPrem(mat: MatierePremiere,id:number):Observable<MatierePremiere>{
  let body = JSON.stringify(mat)
    return this.http.put<MatierePremiere>(this.baseUrlG2+'/'+id ,body,httpOptions);
}

ModifyMatPrem2(mat: MatierePremiere,id:number):Observable<MatierePremiere>{
  let body = JSON.stringify(mat)
    return this.http.put<MatierePremiere>('http://localhost:8080/api/v1/matprem/name/stLimit/'+id ,body,httpOptions);
}

removeMatPrem(id:number):Observable<any>{
  return this.http.delete(this.baseUrlG2+'/'+id,{responseType:'text'});
}
}