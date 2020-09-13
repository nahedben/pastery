import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../../../stockServices/fournisseur.service';
import { ActivatedRoute } from '@angular/router';
import { IFournisseur, Fournisseur } from '../../../modelsInt/fournisseur';
import { NbComponentStatus, NbComponentShape } from '@nebular/theme';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  statuses: NbComponentStatus[] = [ 'primary', 'success', 'info', 'warning', 'danger' ];
  shapes: NbComponentShape[] = [ 'rectangle', 'semi-round', 'round' ];
_listFilter:string;
get listFilter() : string{
  return this._listFilter;
}
set listFilter(value: string){
  this._listFilter =value;
  this.filtredFourns= this.listFilter ?
                      this.performFilter(this.listFilter):
                      this.fourns;
}
x=true;
filtredFourns: Fournisseur[];
fourns: Fournisseur[]=[];
  constructor(private serviceFr:FournisseurService,
              private route: ActivatedRoute,
              private _location : Location) { }

              performFilter(filterBy : string): Fournisseur[]{
                filterBy = filterBy.toLocaleLowerCase();
                return this.fourns.filter((fr : Fournisseur)=>
                fr.name.toLocaleLowerCase().indexOf(filterBy) !==-1);
                }

  ngOnInit(): void {
    this.getAllFour();
   this.fourns
    
    // this.countFourNumber();
  }

  getAllFour(){

    this.serviceFr.retreiveAllFour().subscribe({next:data=>{
      this.fourns=data,
      console.log("fourns data is : "+ data),
      this.filtredFourns=this.fourns;},
      error: err=> console.error('fournisseur loaded')
    })
  }
  
  fr:Fournisseur={}
  id:number;
  onclicked(event,id){
    console.log("hide clicked"+event+"le id : "+id)
    this.x =false;
    this.id=id;
  let a :Fournisseur= this.filtredFourns.filter(fourn => fourn.id === id)[0]
  this.fr = a;
   console.log(a);
  }
  onEdit(){
    console.log("Id fournisseur"+this.fr.id)
  }
  onBack(){
    this._location.back();
  }
  onRemove(event){
    if (window.confirm('Etes vous sure de vouloir supprimer cet article?')) {
      this.serviceFr.removeFourn(this.fr.id).subscribe(res=>{
      event.confirm.resolve(event.source.data);
  }
      )}
    this.onBack()}
  

}
