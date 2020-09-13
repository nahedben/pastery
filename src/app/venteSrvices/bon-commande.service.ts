import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BonCommande, LigneBonCommande, LigneFacture } from '../modelsInt/fact-clt-bc';
import { Observable } from 'rxjs';
import { LigneBonReception } from '../modelsInt/ligneBonReception';
import { LigneBonReceptionService } from '../stockServices/ligne-bon-Reception.service';
import { Produit } from '../modelsInt/Produit';


const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BonCommandeService {
 //    /api/v1
//    /BonCommandes
//    /BonCommande/{id}
//    /BonCommande/{id} =====>> calculeTempRestantBonCommande
//    /BonCommande/tempsRestant/{id} =====>> updateTempsRestantBc
//    /BonCommande/putInf/{id}======>> addtheInf
//    /BonCommande/{id}/calculTotal =====>> calculTotalBC
//    /BonCommande/{id}/restPayer =====> calculRestPayer
//    /BonCommande/{idbc}/Client/{idcl}=======>> assignClientToBC
// /BonCommande/tpsRestInfo===> createBonCommmande
url1: string = 'http://localhost:8080/api/v1/BonCommandes'
url2: string = 'http://localhost:8080/api/v1/BonCommande/';
url3: string = 'http://localhost:8080/api/v1/ligneBC/prodBCID/';
url4: string='http://localhost:8080/api/v1/BonCommande/tot/restpay/assClt/'
// url5: string='http://localhost:8080/api/v1/BonCommande/{idbc}/ListLignBc'


  constructor(private http: HttpClient) { }

  retreiveAllBonCommande():Observable<BonCommande[]>{
    return this.http.get<BonCommande[]>(this.url1)    
  }

  retreiveOneBonCommande(id:number): Observable<BonCommande>{
    return this.http.get<BonCommande>(this.url2+id)
  }
  createBonCommande(bc: BonCommande):Observable<BonCommande>{
    return this.http.post<BonCommande>(this.url2+'tpsRestInfo', bc)
  }

  createLigneBonCommande(lbc: LigneBonReception, idprd:number, idbc:number):Observable<LigneBonCommande>{
    return this.http.post<LigneBonCommande>(this.url3+idprd+'/'+idbc,lbc)
  }
  calcuTotRestAssiCl(id: number, idcl: number):Observable<BonCommande> {
    return this.http.put<BonCommande>(this.url4+id+'/'+idcl,httpOptions)
  }
  retreiveAllLigneOfBc(idbc:number):Observable<LigneBonCommande[]>{
    return this.http.get<LigneBonCommande[]>(this.url2+idbc+'/ListLignBc')
  }

  // removeFourn(id:number): Observable<any>{
  //   return this.http.delete(this.Url3+'/'+id,{'responseType':'text'})
  //   }


  removeBc(id:number): Observable<any>{
    return this.http.delete(this.url2+'/'+id,{'responseType':'text'})
  }


  // editBonCommande(bc:BonCommande, id:number):Observable<BonCommande>{
  //   // let body = JSON.stringify(fam);
  //   //   return this.http.put<Famille>(this.Url2+'/'+id,body,httpOptions);
  //   let body =JSON .stringify(bc)
  //   return this.http.put<BonCommande>(this.url2)
  // }


}
