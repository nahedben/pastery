import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatierePremiere } from '../../../modelsInt/matierePrem';
import { Observable, Subject } from 'rxjs';
import { ɵshimContentAttribute } from '@angular/platform-browser';
import { Depot } from '../../../modelsInt/depot';
import {ActivatedRoute, Params} from '@angular/router'
import { MatpremService } from '../../../stockServices/matprem.service';
import {DepotService} from '../../..//stockServices/depot.service';
import {Location} from '@angular/common';
import { Famille } from '../../../modelsInt/famille';
import { D3PieComponent } from '../../charts/d3/d3-pie.component';
import { FamilleService } from '../../../stockServices/famille.service';
@Component({
  selector: 'ngx-sel-mat',
  templateUrl: './sel-mat.component.html',
  styleUrls: ['./sel-mat.component.scss']
})
export class SelMatComponent implements OnInit {
selTitle= ['id','Nom','Unite', 'Stock','Stock Limit','Prix Achat','Depot','Famille'];
contenu= {"id":5,"name":"levure bouanger","unit":"KG","quantity":2.00,"stockLimit":1.00,"purchaseUnitPrice":8.00,"depot":{"id":2,"name":"frigo Positif Armoire","details":"unite de stockage Kg","location":null,"capacity":500.00,"actualCharge":1910.00},"famille":null};
ctt: MatierePremiere ={};
ct:any
mat;
depotId: number=0;
dp:Depot;
dpret: Depot= {};
dpts:Depot[];
id:number;
Id:number;
addMode: boolean;
actMat:MatierePremiere;
values = '';
index: number;
indexTb:number[]=[];
famille:Famille
famId: number = 0;
fams: Famille[]=[];



// mt: MatierePremiere;

  onKey(event: any) { 
    this.values = event.target.value ;
  }

constructor(private matService: MatpremService,
            private route : ActivatedRoute,
            private _location:Location,
            private depotService: DepotService,
            private familleService: FamilleService ) {}

  ngOnInit() {
 
  this.Id =this.route.snapshot.params['id']
  console.log(this.Id);
  this.getMat();
  // this.getAllDepot();
  this.depotService.getDepotAll().subscribe(data=>{this.dpts=data;
    console.log(this.dpts)}
);
  this.getAllFam();
  this.getDepotIndex();

  //this.setQty();
  }
  getMat(){
    console.log("id a partir de get" +this.Id);
    let Id:number= this.Id
    this.matService.getMatP(Id).subscribe(
      data =>{this.ctt=data;
      console.log(this.ctt)},
    );}
    getAllDepot(){
      this.depotService.getDepotAll().subscribe(data=>{this.dpts=data;
                                                      console.log(this.dpts)}
      );
    }
    getAllFam(){
      this.familleService.retreiveAllFam().subscribe(data=>{this.fams=data;
                                                      console.log(this.fams)}
      );
    }

        //Activer le retour en arriere dans le path
    backClick(){
      this._location.back();
    }
    setQty(newQty : number){   
      if(window.confirm("Attention La modification de la quantite est irreversible")){ 
      console.log("le nombre entrer est "+newQty);  
      let matPremCloner = new MatierePremiere();
      matPremCloner.quantity=newQty; 
      console.log("La quantite a introduire: "+matPremCloner.quantity)
      let matPremResolve = new MatierePremiere();
      this.matService.editerQty(matPremCloner,this.Id).subscribe(data=>{
        console.log(data);
        this.getMat();         
      });}
    }

    getDepotIndex(){
      let dptint :Depot[];
      let dp: Depot
      let dpindexTb:number[]=[];
      let indexInt : number;
      let i :number =0;
      
      this.depotService.getDepotAll().subscribe(
        data=>{dptint=data;
          this.dpts=dptint;
            indexInt= dptint.length
          console.log(indexInt)
          console.log(dptint)
         this.index=indexInt;
         console.log("la valeur de Index"+this.index)
         for(i=0; i<indexInt;i++){
          console.log(i)
          console.log(typeof(i))
          dpindexTb.push(i)
        }
        this.indexTb=dpindexTb
        console.log(this.indexTb)
        });
      }  


      getDeptByIdSelec(){
        console.log(this.depotId)
        let id: number = this.depotId
        console.log(this.ctt)
        let matClone:MatierePremiere = this.ctt;
        this.matService.assignDepotMat(matClone,id).subscribe(
                    data=> {matClone=data;
                    console.log(matClone)
                    this.getMat();}
        )                 
      }
      // setMatIdFamSelec(){
      //   let id: number =this.famId;
      //   let matClone : MatierePremiere =this.ctt;
      //   this.matService.assignFamille(matClone,id).subscribe(
      //         data=>{matClone =data 
      //               this.getMat()}
      //   )      }
        // changeDep($event){

        //   console.log("depot change it"+ $event)
        // }
         

      }