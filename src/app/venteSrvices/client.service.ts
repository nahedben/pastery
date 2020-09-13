import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../modelsInt/fact-clt-bc';
import { basename } from 'path';

const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string='http://localhost:8080/api/v1'
  url1:string=this.baseUrl+'/client/phonenbr';
  url2: string= this.baseUrl+'/clients';
  url3: string= this.baseUrl+'/client';

  constructor(private http: HttpClient) { }

  findClientByPhoneNumber(phone: String): Observable<Client[]>{
    return this.http.get<Client[]>(this.url1+'/'+phone)
  }
  retreiveAllClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.url2)
  }
  retreiveOneClient(id:number):Observable<Client>{
    return this.http.get<Client>(this.url3+'/'+id)
  }
  createClient(cl:Client):Observable<Client>{
    return this.http.post<Client>(this.url3,cl)
  }
  editerClient(id:number, cl:Client):Observable<Client>{
    return this.http.put<Client>(this.url3+'/'+id,cl,httpOptions)
  }
  deleteClient(id:number): Observable<any>{
    return this.http.delete(this.url3+'/'+id)
  }

}
