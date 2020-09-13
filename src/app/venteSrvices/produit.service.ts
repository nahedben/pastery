import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit, CompletProduit } from '../modelsInt/Produit';
import { id } from '@swimlane/ngx-charts';
import { Recette } from '../modelsInt/recette';
import { LigneRecette } from '../modelsInt/ligne-recette';


const httpOptions= {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
urlBase: string ='http://localhost:8080/api/v1/';
urlSec1: string='produits'
urlSec2: string='produit'

url3: string="http://localhost:8080/api/v1/produit/monocreation/"

// /produit/monocreation/{idf}

  
  constructor(private http: HttpClient) { }

  
  createProduitComplete(idf:number,compPrd: CompletProduit  ): Observable<Produit>{
    return this.http.post<Produit>(this.url3+idf, compPrd);  
    }

  retreiveAllProduit():Observable<Produit[]>{
    return this.http.get<Produit[]>(this.urlBase+this.urlSec1);
  }

retreiveOneProduit(id:number):Observable<Produit>{
  return this.http.get<Produit>(this.urlBase+this.urlSec2+'/'+id);
}
urlSec3: string='/produit/qt/' // pour l'ajout de qty sorti production + methode de modifier stock
// urlSec4: string='produitC/PrdCoast/' // calcule de cout de produit  a partir de la recette
// urlSec5: string='produit/image/' // ajout et retreive d'image
// urlSec6: string='/produit/assignFamille/' //Assigne produit a une famille 
 

createProduit(prd: Produit): Observable<Produit>{
return this.http.post<Produit>(this.urlBase+this.urlSec2, prd);  
}

removeProduit(id:number):Observable<any>{
  return this.http.delete(this.urlBase+this.urlSec2+'/'+id,{responseType:'text'})
}

updateStockPrdSortieProd(idPrd:number, idOp:number):Observable<Produit>{
  return this.http.put<Produit>(this.urlBase+this.urlSec3+idPrd+'/'+idOp,httpOptions)
}

updateStockManuel(id: number, prd: Produit): Observable<Produit>{
  return this.http.put<Produit>(this.urlBase+this.urlSec3+id,prd,httpOptions)  
  
}
//clacule de cout de produit a partir des donnes de recette

urlSec4: string='produitC/PrdCoast/' // calcule de cout de produit  a partir de la recette
urlSec5: string='produit/image/' // ajout et retreive d'image
urlSec6: string='/produit/assignFamille/' //Assigne produit a une famille 
 
calculeCoutPrdFromRecette(idRec: number):Observable<Produit>{
  return this.http.put<Produit>(this.urlBase+this.urlSec4+idRec,httpOptions);
}
// /produit/assignFamille/{idprd}/{idFam}

assignePrdToFam(idPrd: number, idFam: number):Observable<Produit>{
  return this.http.put<Produit>(this.urlBase+this.urlSec6+idPrd+'/'+idFam,httpOptions)
}

ajoutImagePrd(idPrd:number, file: Blob):Observable<Produit>{
 return this.http.put<Produit>(this.urlBase+this.urlSec5+idPrd,file,httpOptions2)
}

getImagePrd(idPrd: number): Observable<Blob>{
  return this.http.get<Blob>(this.urlBase+this.urlSec5+idPrd);
  }
}





const httpOptions2= {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':'application/json'
  })
}