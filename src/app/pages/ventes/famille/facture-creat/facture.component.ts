import { Component, OnInit, Input, Output,EventEmitter  } from '@angular/core';
import { LigneFacture, Facture, Client } from '../../../../modelsInt/fact-clt-bc';
import { LigneFactureService } from '../../../../venteSrvices/ligne-facture.service';
import { FactureService } from '../../../../venteSrvices/facture.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { ClientService } from '../../../../venteSrvices/client.service';
import { bind } from 'events';
import { timeout} from 'rxjs/operators';
import {Location} from '@angular/common';
import { Router } from '@angular/router';






@Component({
  selector: 'ngx-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {

@Input() 
lstLignFacture:LigneFacture[]

@Output()
removeligneFactureId:EventEmitter<number>=new EventEmitter<number>();

@Output()
initialiseListLgnFacture: EventEmitter<LigneFacture[]>= new EventEmitter<LigneFacture[]>();
lstLignFactureSend:LigneFacture[]=[]

nonProduit: string
FactureCree: Facture={};
total:number=0;
clicked:boolean=false;
clickedCan:boolean=false;
factureAss:Facture={}
phone:string='';
client:Client[]=[];
r:boolean=false;
idFact:number
validFact:boolean=false
sup:boolean= false
  constructor(private lgFacSer: LigneFactureService,
              private factService: FactureService,
              private clientService:ClientService,
              private router: Router) { }
y:boolean=false
lstTypePay:string[]=['CARTE', 'CHEQUE', 'ESPECE'];
SelTypePay:string='';

  ngOnInit(): void {
  }
  onDelete(idlg:number){
       this.removeligneFactureId.emit(idlg);

  }
  OnClick(){
    this.lstLignFacture.forEach(e=>console.log("l'id de l'emenent de la list est: ",e.id))
    this.y=true
    this.sup=true
  }
  OnCancelClick(id){
  this.y=true;

  this.lstLignFacture.forEach(e=> this.lgFacSer.deleteLigneFacture(e.id).subscribe(data=>{
    console.log("La ligne supprimer: ",e.id)
  }))
  
  if(this.FactureCree.id!==null){
    console.log("Le id de la facture",this.idFact)
    console.log("facture existe pour suppression")
  this.factService.removeOneFacture(id).subscribe(
    data=>{
      
      console.log("facture supprime")
    })
  }

   
    
    this.clickedCan=true;
    setTimeout(()=>{this.router.navigateByUrl('pages/ventes')},100);
    setTimeout(()=>{this.router.navigateByUrl('pages/ventes/famille')},200);
  }

  
createFacture(ph:string){
  let factToCreate= new Facture();
  factToCreate.typePayment=this.SelTypePay;
  console.log(factToCreate);
  this.factService.createFacture(factToCreate).subscribe(data=>{
    this.FactureCree=data;
 
   let idFact=this.FactureCree.id;
   setTimeout(()=>{this.lstLignFacture.forEach(e=> this.lgFacSer.AssignFactureToLignFct(e.id,idFact).subscribe(
      data=>{
      }
    ))},500)

    setTimeout(()=>{
      this.total=0;
    this.factureAss={}
     this.factService.calculTotalPrice(idFact).subscribe(dt=>{
      this.factureAss=dt
      this.total=dt.totalPriceTtc
             
    })
  },1000)
  setTimeout(()=>{this.clientService.findClientByPhoneNumber(ph).subscribe(data=>{
    this.client=data
  })},1200)
  })
  this.clicked=true
  this.validFact=true  
}
 


 valideFact(){
  this.r=true;
    // setTimeout(()=>{console.log("1 le Id client est ", this.client)},2000);
    // await console.log("2 la facture est ",this.factureAss)
    this.client.forEach(c=>this.factService.assignClientToFac(this.factureAss.id, c.id).subscribe(data=>{
      console.log("1 la facture assigne est ",data)
    }) )
    setTimeout(()=>{ this.factService.validerFacture(this.factureAss.id).subscribe(dt=>{
      console.log("2 La facture valider est ", dt)})
    },600)
    setTimeout(()=>{ this.factService.actionnerReglement(this.factureAss.id).subscribe(d=>{
      console.log(" 3 La validation de reglement pour la facture :", d)})
    },800)

    setTimeout(()=>{this.router.navigateByUrl('pages/ventes')},900);
    setTimeout(()=>{this.router.navigateByUrl('pages/ventes/famille')},950);
    this.r=true


}

  
}