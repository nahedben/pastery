import { Component, AfterViewInit, Input } from '@angular/core';
import { BonReception } from '../../../../modelsInt/bonReception';
import { BonReceptionService } from '../../../../stockServices/bon-reception.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LigneBonReceptionService } from '../../../../stockServices/ligne-bon-Reception.service';
import { FournisseurService } from '../../../../stockServices/fournisseur.service';
import { Fournisseur } from '../../../../modelsInt/fournisseur';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatpremService } from '../../../../stockServices/matprem.service';
import { MatierePremiere } from '../../../../modelsInt/matierePrem';
import { LigneBonReception } from '../../../../modelsInt/ligneBonReception';
import { __await } from 'tslib';

@Component({
  selector: 'ngx-add-bon-recep',
  templateUrl: './add-bon-recep.component.html',
  styleUrls: ['./add-bon-recep.component.scss']
})
export class AddBonRecepComponent implements AfterViewInit {
br: BonReception={};
fr:number=0
four:Fournisseur={};
fourns: Fournisseur[]=[]
frleng: number=0;
selectedItem='2';
fourn:Fournisseur={};
frId:number=0;
load:boolean=false;
Selectedfourn: Fournisseur={}


  constructor(private brService: BonReceptionService,
              private lgBRcpService : LigneBonReceptionService,
              private fourService: FournisseurService,
              private route: ActivatedRoute,
              private _location : Location,
              private fb: FormBuilder,
              private matService: MatpremService) {
                
               }
               

               ngAfterViewInit(): void {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],

    });
  
    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

  
    this.retreiveAllMatPrem();
    // this.retreiveAllMatPremFromFour();

    console.log("l'idMat est: ",this.matId);
     this.retreiveAllFourns();
  // this.fourns;
  // this.retreiveAllMatPremFromFour();
  
  }

  backClick(){
    this._location.back();
  }
  onSubmit(){
    console.log("l'id est :",this.four.id)
    if(this.br!==null){
      alert("Le BOn de livraison est Enregiste vous passez au remplissage")
    }
    let date=this.br.dateBr
      let datedd = new Date(date)
      let dd = (datedd.getDate() < 10 ? '0' : '') + datedd.getDate();
      let MM = ((datedd.getMonth() + 1) < 10 ? '0' : '') + (datedd.getMonth() + 1);
      let yyyy = datedd.getFullYear();
      
      let brClone =new BonReception();
      brClone.numBonRecep= this.br.numBonRecep
      console.log("numero de bon de reception",brClone.numBonRecep);
      brClone.dateBr=dd + "-" + MM + "-" + yyyy;
      console.log("la date est dateBr",datedd);
      brClone.nomLivreur= this.br.nomLivreur
      brClone.matLivreur=this.br.matLivreur
      brClone.note=this.br.note
      brClone.fournisseur=this.br.fournisseur
      console.log("LA date de creation", brClone.dateBr)
      this.brService.createBr(brClone).subscribe(data=>{
        this.br=data; console.log("La DATA apres enregistrement",this.br)
        console.log("Creation est terminer avec succe")
        console.log("l'id est bon reception:",data.id)

        console.log("Id fournisseur id ",this.frId)

      this.brService.assignfourtoBr(this.br,this.frId).subscribe(data=>{
        console.log("Le fournisseur est assigne au bonreception",data)
        
        this.fourService.getFourMatListByFourid(this.frId).subscribe(data=>{
          this.lstmat =data; console.log("La list de matiere est :", this.lstmat)
        })

      })
      

  })}

  //la creation de stepper
  firstForm: FormGroup;
  secondForm: FormGroup;

  
  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  retreiveAllFourns(){

    let fournisseurSuery = this.fourService.retreiveAllFour();
    // Promise.all([query]).then(results => {
    //     var link = document.createElement('a');
    //     var deletFirstQuoate = results[0]._body.substring(1, results[0]._body.length - 1);
    //     var deletSecondQuoate = deletFirstQuoate.substring(0, deletFirstQuoate.length - 0);
    //     link.href = '/documents/' + deletSecondQuoate + '.pdf';
    //     link.download = deletSecondQuoate + '.pdf';

    //     link.click();
    // });
    // debugger;
    this.fourService.retreiveAllFour().subscribe(data=> {
      // debugger;
      this.load=true;
      this.fourns=data;
      console.log("liste fourns select",this.fourns) 
      
      console.log("La longueur de la table", this.fourns.length)
    })
  }
  
  mats: MatierePremiere[]=[];
  matId: number =0;
  lbr: LigneBonReception={};
  mat: MatierePremiere={};
  lgBrRes: MatierePremiere={};
  lstmat: MatierePremiere[]=[]

retreiveAllMatPrem(){
  this.matService.getMatPrem().subscribe(data=>{this.mats=data; console.log("La list de matiere Premiere: ", this.mats)
  })
}

// retreiveAllMatPremFromFour(){
//   console.log("L'id de fournisseur pour la nouvelle methode est ",this.frId)
//   this.fourService.getFourMatListByFourid(this.br.id).subscribe(data=>{
//     this.lstmat =data; 
//     console.log("La list de matiere est :", this.lstmat)
//   })
// }

lbrComp: LigneBonReception={}
lstBr: LigneBonReception[]=[]
OnAjoutClick(){
  let lgnBrClone=new LigneBonReception();
  lgnBrClone.quantity= this.lbr.quantity
  let idBr:number= this.br.id
  console.log("le numero de bon de reception est:",this.br.numBonRecep," et l'id est :", idBr)

  this.lgBRcpService.createLbr(lgnBrClone).subscribe(data=>{
    this.lgBrRes=data;console.log("ligne br: ",this.lgBrRes)
    console.log("La ligne de ligne de bon de reception:",this.lgBrRes.id)
    let idlbCrt:number= this.lgBrRes.id
    console.log("l'id de ligne de bon de reception: ",idlbCrt)

    this.lgBRcpService.assignlbrMat(idlbCrt,this.matId).subscribe(data=>{
     this.lbrComp=data; console.log("this la ligne complete est :",this.lbrComp)
     let idComp =data.id

  
     this.lgBRcpService.assignlbrBRecp(idComp, idBr).subscribe(data=>{
       console.log("Ligne bon reception Complet",this.lbrComp)
       this.lbrComp.matierepremier.name
       let idComp: number= this.lbrComp.id
       
       this.lgBRcpService.retreiveAllLbrFronBr(idBr).subscribe(data=>{
         this.lstBr=data
       })     
     })
    })

  })
    // let row = document.createElement('tr');   
    //   row.className = 'row'; 
    //   row.innerHTML = ` 
    //   <td> <input type="text" name="matname" nbInput fullWidth  value="{{lbrComp?.matierepremier?.name}}"> </td>
    //                                                 <td><input type="text" name="qantity" nbInput fullWidth  value="{{lbrComp?.quantity}}"></td>
    //                                                 <td><input type="text" name="total" nbInput fullWidth  value="{{lbrComp?.total}}"></td>`; 
    //   document.querySelector('.espaceAjout').appendChild(row); 
   

}}



