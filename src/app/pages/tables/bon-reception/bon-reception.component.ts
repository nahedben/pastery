import { Component, OnInit } from '@angular/core';
import { BonReception } from '../../../modelsInt/bonReception';
import { BonReceptionService } from '../../../stockServices/bon-reception.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import { FournisseurService } from '../../../stockServices/fournisseur.service';
import { Fournisseur } from '../../../modelsInt/fournisseur';

@Component({
  selector: 'bon-reception',
  templateUrl: './bon-reception.component.html',
  styleUrls: ['./bon-reception.component.scss']
})
export class BonReceptionComponent implements OnInit {
  _listFilter:string;
  get listFilter() : string{
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter =value;
    this.filtredBr= this.listFilter ?
                        this.performFilter(this.listFilter):
                        this.Brs;
  }
  x=true;
filtredBr: BonReception[]=[];
Brs: BonReception[];
  constructor(private serviceBr : BonReceptionService,
              private route: ActivatedRoute,
              private _location: Location,
              private serviceFr: FournisseurService) { }

  performFilter(filterBy : string):BonReception[]{
    // filterBy = filterBy.toLocaleLowerCase();
    //             return this.Brs.filter((br:BonReception)=>{
    filterBy =filterBy.toLocaleLowerCase();
    return this.Brs.filter((br:BonReception)=>
    br.numBonRecep.toLocaleLowerCase().indexOf(filterBy)!==-1);
    // br.numBonRecep.indexOf(filterBy) !==-1});
  }
  

  ngOnInit(): void {
    this.getAllBr();
    this.Brs;
  }

getAllBr(){
  this.serviceBr.retreiveAllBr().subscribe({next:data=>{
    this.Brs=data,
    this.filtredBr=this.Brs;},
    error:err=> console.error('fourissur not loade')}
  )}

  onEdit(){
    console.log("Edited");
  }
  Fourn:Fournisseur[]=[];
  onClick(){
    console.log("je propose mettre une methode d'appel de tous les fournisseur ")
    this.serviceFr.retreiveAllFour().subscribe(data=>{
      this.Fourn=data;
    })
  }
  
  br: BonReception={}
  onclicked(event, id){
    this.x=false;
    let a = this.filtredBr.filter(bonrecp =>bonrecp.id ===id)[0]
    this.br= a
    console.log(a)
  }
  onBack(){
    this._location.back();
  }

  onRemove(event){
    if (window.confirm('Etes vous sure de vouloir supprimer ce Bon?')) {
  this.serviceBr.removeBr(this.br.id).subscribe(res=>{
    event.confirm.resolve(event.source.data);
  })
    }this.onBack()}


}
