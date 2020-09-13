import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilleService } from '../../../../stockServices/famille.service';
import { Produit } from '../../../../modelsInt/Produit';
import { ProduitService } from '../../../../venteSrvices/produit.service';
import {Location} from '@angular/common';
import { NbWindowService, NbDialogService } from '@nebular/theme';
import { FenetrQtyComponent } from './fenetr-qty/fenetr-qty.component';
import { DialogNamePromptComponent } from '../../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { LigneFactureService } from '../../../../venteSrvices/ligne-facture.service';
import { LigneFacture } from '../../../../modelsInt/fact-clt-bc';
import { Console } from 'console';


@Component({
  selector: 'ngx-lst-prd-fam',
  templateUrl: './lst-prd-fam.component.html',
  styleUrls: ['./lst-prd-fam.component.scss']
})
export class LstPrdFamComponent implements OnInit {
@Input() 
id:number ;

@Output() 
affichHandlerYlstPrd: EventEmitter<boolean> =new EventEmitter<boolean>();
y:boolean = false;


lstPrd:Produit []=[];
imageData: any;
qty: number;
idprd:number=0;
@Output()
ajouteligneFacture: EventEmitter<LigneFacture> = new EventEmitter<LigneFacture>();
LgFact: LigneFacture={};
@Output() 
ajouterLgFactTolst: EventEmitter<LigneFacture[]> =new EventEmitter<LigneFacture[]>();
lstLgnFacture:LigneFacture[]=[]



  constructor(private route : ActivatedRoute,
              private servFam : FamilleService,
              private serProd: ProduitService,
              private _location: Location,
              private windowService: NbWindowService,
              private dialogService: NbDialogService,
              private lgFctService: LigneFactureService) { }

  ngOnInit(): void {
    let idFam =this.id
      this.servFam.retreiveAllProdFami(idFam).subscribe(data=>{
        this.lstPrd=data       
      })  
      
  }
  openWindowForm(){
  this.windowService.open(FenetrQtyComponent,{title:`Ajoutez Qantité`})
  }
  onBack(){
    this.y=false;
    this.affichHandlerYlstPrd.emit(this.y)    
  }
idLg:number
  prod:Produit ={}
  relatedFam: LigneFacture={}

  onsubmit(event, id){    
    console.log("La quantity est:",this.qty)
this.idprd=id
this.serProd.retreiveOneProduit(this.idprd).subscribe(data=>{
  this.prod=data
})
let lgFact= new LigneFacture();
lgFact.quantity=this.qty
this.lgFctService.createLigneFacture(lgFact).subscribe(data=>{
  console.log("Succes create LigneFacture!", data)
  this.idLg=data.id
error=>console.error("Error!", error)

this.lgFctService.assignePrdToLigneFacture(this.idLg,this.idprd).subscribe(data=>{
  console.log("Succes Assign prod to LigneFacture!", data)
error=>console.error("Error!", error)


  this.lgFctService.calculTotalPrice(this.idLg).subscribe(data=>{
    console.log("success to calcule totalprice!", data.totalPrice)
    this.relatedFam=data;
    error=>console.error("Error", error)

    this.lgFctService.retreiveOneLigneFacture(this.idLg).subscribe(data=>{
      this.LgFact=data;
      this.ajouteligneFacture.emit(this.LgFact);
      this.lstLgnFacture.push(this.LgFact);

      this.ajouterLgFactTolst.emit(this.lstLgnFacture)
      console.log("La liste a envoyer de lst-prd to prod: ",this.lstLgnFacture)

    })
    
    

})

})

})

  }

  createLigFacture(){  
    console.log(" Ligne Created")
    console.log("la quantite selectionner a trvers Create: ",this.qty)
  }

}