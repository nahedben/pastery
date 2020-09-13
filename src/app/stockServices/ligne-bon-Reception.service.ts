import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILigneBonReception, LigneBonReception } from '../modelsInt/ligneBonReception';

const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class LigneBonReceptionService {
Url1="http://localhost:8080/api/v1/LigneBonReceps";
Url2="http://localhost:8080/api/v1/LigneBonRecep";
Url3="http://localhost:8080/api/v1/lignBr/assignMatPrem";
Url4="http://localhost:8080/api/v1/lignebonrecep/assignBonRecep";
  
  constructor(private http:HttpClient) { }


  retreiveAllLbr():Observable<LigneBonReception[]>{
    return this.http.get<LigneBonReception[]>(this.Url1)
  }
  retreiveOneLbr(id:number):Observable<LigneBonReception>{
    return this.http.get<LigneBonReception>(this.Url2+'/'+id)
  }
  createLbr(lbr:LigneBonReception):Observable<LigneBonReception>{
    return this.http.post<LigneBonReception>(this.Url2,lbr);
  }
  editlbrQty(lbr:LigneBonReception, id:number):Observable<LigneBonReception>{
    let body =JSON.stringify(lbr)
    return this.http.put<LigneBonReception>(this.Url2+'/'+id,body,httpOptions);
  }
  removelbr(id:number):Observable<any>{
  return  this.http.delete(this.Url2+'/'+id,{responseType:'text'})
  }
  assignlbrMat(idbr:number,idmat:number):Observable<LigneBonReception>{
    // let body = JSON.stringify(lbr);
    // let idlbr:number=lbr.id;
    return this.http.put<LigneBonReception>(this.Url3+'/'+idmat+'/'+idbr,httpOptions)
  }
  // assignlbrBRecp(lbr:LigneBonReception,idbr:number):Observable<LigneBonReception>{
  //   let body = JSON.stringify(lbr);
  //   let idlbr: number=lbr.id;
  //   return this.http.put<LigneBonReception>(this.Url4+'/'+idlbr+'/'+idbr,body,httpOptions)
  // }
  assignlbrBRecp(idlbr:number,idbr:number):Observable<LigneBonReception>{
    
    return this.http.put<LigneBonReception>(this.Url4+'/'+idlbr+'/'+idbr,httpOptions)
  }
  retreiveAllLbrFronBr(idbr: number): Observable<LigneBonReception[]>{
    return this.http.get<LigneBonReception[]>(this.Url1+'/'+idbr)
  }

}
