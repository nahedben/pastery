import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBonReception, BonReception } from '../modelsInt/bonReception';
import { JsonPipe } from '@angular/common';
import { id } from '@swimlane/ngx-charts';
const httpOptions = {
  headers :new HttpHeaders({'Content-type':'Application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class BonReceptionService {
  // @GetMapping("/bonreceps")
  //@GetMapping("/bonrecep/{id}")
  //@PostMapping("/bonrecep")
 
//@DeleteMapping("/bonrecep/{id}")
Url1="http://localhost:8080/api/v1/bonreceps";
Url2="http://localhost:8080/api/v1/bonrecep";
Url3=this.Url2+"/price/";
Url4=this.Url2+"/four/";
  constructor(private http: HttpClient) { }

  retreiveAllBr():Observable<BonReception[]>{
    return this.http.get<BonReception[]>(this.Url1);
  }

  retreiveOneBr(id:number):Observable<BonReception>{
    return this.http.get<BonReception>(this.Url2+'/'+id);
  }

  createBr(br:BonReception):Observable<BonReception>{
    return this.http.post<BonReception>(this.Url2,br);
  }
  
  removeBr(id:number):Observable<any>{
    return this.http.delete(this.Url2+'/'+id,{responseType:'text'})
  }
   // @PutMapping("/bonrecep/{id}")
 // @PutMapping("/bonrecep/price/{id}")
 //@PutMapping("/bonrecep/four/{idbr}/{idfour}")
 editBr(id:number, br:BonReception):Observable<BonReception>{
   let body =JSON.stringify(br);
   return this.http.put<BonReception>(this.Url2+'/'+id,body,httpOptions)
 }
 calculMontTotal(br:BonReception):Observable<BonReception>{
   let body =JSON.stringify(br)
   let idbr = br.id;
   return this.http.put<BonReception>(this.Url3+id,body,httpOptions);
 }
 assignfourtoBr(br:BonReception, id:number):Observable<BonReception>{
   let body =JSON.stringify(br);
   let idbr= br.id;
   return this.http.put<BonReception>(this.Url4+idbr+'/'+id,body,httpOptions);
 }

}
