import { Component, OnInit } from '@angular/core';
import { LigneFacture } from '../../../modelsInt/fact-clt-bc';
import { LigneFactureService } from '../../../venteSrvices/ligne-facture.service';

@Component({
  selector: 'ngx-famille-prin',
  templateUrl: './famille-prin.component.html',
  styleUrls: ['./famille-prin.component.scss']
})
export class FamillePrinComponent implements OnInit {
//test de input
lstLignFacture:LigneFacture[]=[]
ligFacture: LigneFacture={}
y:boolean=false;
id:number=0;

  constructor(private lgnFactServ: LigneFactureService) { }

  ngOnInit(): void {    
    
  }
  afficheClickedHandlerY(y:boolean){
    this.y=y
    console.log("La valeur de y de famille",this,y)
  }
  
  afficheCLickedlstPrdY(y:boolean){
    this.y=y;
    console.log("La valeur de y de lstPrd",this,y)
  }
  IdsendedHandler(id:number){
    this.id=id
    console.log(" Id dans principal",this.id)
  }


  addedLigneFacture(lgn: LigneFacture){
    this.ligFacture=lgn
    this.lstLignFacture.push(this.ligFacture);
  }
removeLigneFacture(id:number){
  this.lgnFactServ.deleteLigneFacture(id)
}
  receivedIdHandler(id:number){
    
      this.lstLignFacture=this.lstLignFacture.filter( h => h.id !== id);

      this.lgnFactServ.deleteLigneFacture(id).subscribe(date=>{
      console.log("ligne Facture id:",id," Succesfully deleted")

      })
      }
    
receivedListLgnFactureHandler(lstLg: LigneFacture[]){
  this.lstLignFacture=lstLg
}
  }
   


