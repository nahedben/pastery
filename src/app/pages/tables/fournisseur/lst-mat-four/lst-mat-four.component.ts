import { Component, OnInit, ViewChild } from '@angular/core';
import { MatierePremiere } from '../../../../modelsInt/matierePrem';
import { FournisseurService } from '../../../../stockServices/fournisseur.service';
import { ActivatedRoute } from '@angular/router';
import { Fournisseur } from '../../../../modelsInt/fournisseur';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-lst-mat-four',
  templateUrl: './lst-mat-four.component.html',
  styles: ['./lst-mat-four.component.scss']
})
export class LstMatFourComponent implements OnInit {
  @ViewChild('item', { static: true }) accordion;
  mats:MatierePremiere[]=[];
  sub:any;
  id:number;
  four: Fournisseur={};
  
  constructor(private fourService : FournisseurService,
              private route : ActivatedRoute,
              private _location: Location ) { }

  ngOnInit(): void {
    // this.sub=this.route.params.subscribe(param=>{
    //   this.id=+param['id']
    // });
    // console.log("l'id est :" + this.id)
    this.retreiveMatOfFour();
  }
  onBack(){
    this._location.back();
  }

  retreiveMatOfFour(){
    this.sub=this.route.params.subscribe(param=>{
      this.id=param['id']
    });
    let idfr:number=this.id;
    this.fourService.retreivOneFour(idfr).subscribe(data=>{
      this.four=data
      this.fourService.getFourMatList(this.four).subscribe(data=>{
        this.mats=data},
        error=>console.error("list mat failed to load"),
        ()=>console.log(" list matiere loaded")
      );
    }
    );
  //Gâteau Rond  Hlou Arbi Boulqngerie Gâteau Morceau
   
  }

}
