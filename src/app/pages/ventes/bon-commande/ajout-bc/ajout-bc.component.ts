import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../../modelsInt/Produit';
import { BonCommandeService } from '../../../../venteSrvices/bon-commande.service';
import { BonCommande, LigneBonCommande } from '../../../../modelsInt/fact-clt-bc';
import { Router } from '@angular/router';
import { ProduitService } from '../../../../venteSrvices/produit.service';
import { LigneBonReception } from '../../../../modelsInt/ligneBonReception';
import { NbIconLibraries } from '@nebular/theme';
import { LigneRecette } from '../../../../modelsInt/ligne-recette';
import { LigneBonReceptionService } from '../../../../stockServices/ligne-bon-Reception.service';
import { Console } from 'console';

@Component({
  selector: 'ngx-ajout-bc',
  templateUrl: './ajout-bc.component.html',
  styleUrls: ['./ajout-bc.component.scss']
})
export class AjoutBcComponent implements OnInit {
prods: Produit[]=[]
bc: BonCommande={}
prd:Produit={}
prId:number=0
lc: LigneBonCommande={}
lstLign: LigneBonCommande[]=[]
affiListLg: boolean =false;
createdLigne: LigneBonCommande={}
lstLigBC:LigneBonCommande[]=[]
labelTwo: boolean = false



evaIcons = [];
  chevronR = "chevron-right";
  chevronL = "chevron-left";



  constructor(private route: Router,
              private prodServivce: ProduitService,
              iconsLibrary: NbIconLibraries) { 
                this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    .filter(icon => icon.indexOf('outline') === -1);

    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
              }

  ngOnInit(): void {
    this.retreiveAllProduit();
    
  }



  onSubmitStp2(bc:BonCommande){
    this.bc=bc
    console.log("le bon de commande taper est :", this.bc);
    


  }

  onSubmit(){
    console.log("submitted");
    this.labelTwo=true
    

  }

  retreiveAllProduit(){
    this.prodServivce.retreiveAllProduit().subscribe(data=>{
      this.prods=data;
      console.log("la liste de produits: ", this.prods)
    })
  }


  removeLineHandler(){
    console.log("chveron de suppression cliquer")
  }

  sendLigne(qty : number):LigneBonCommande[]{
    let lgn:LigneBonCommande={}
    console.log("la quantit recu : ",qty)
    
    console.log("Le nom ",this.prd.name)
   lgn={"quantity":qty,
       "produit":{"id":this.prd.id, 
                  "name":this.prd.name}}

    console.log(" La ligne recuperer est:", lgn)
    this.lstLigBC.push(lgn)
    console.log(this.lstLigBC)
    this.affiListLg=true;
    
     return this.lstLigBC;
  }



  addNewLineHandler(){
    console.log(" shevron")

  }
  receivedEditedLigneBonCom(newLst:LigneBonCommande[]){
    console.log("la nouvelle liste",newLst)
    this.lstLigBC=newLst
  }

  
 
}
