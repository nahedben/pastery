import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../../../../modelsInt/fournisseur';
import { FournisseurService } from '../../../../stockServices/fournisseur.service';
import { ActivatedRoute } from '@angular/router';
import {Location, DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-modif-fourn',
  templateUrl: './modif-fourn.component.html',
  styleUrls: ['./modif-fourn.component.scss']
})
export class ModifFournComponent implements OnInit {
four: Fournisseur={};
id: number;
private sub:any
idfr:number
  constructor(private serviceFour: FournisseurService,
              private route :ActivatedRoute,
             private _location: Location,private datePipe: DatePipe) { }

  ngOnInit(): void {
   this.sub=this.route.params.subscribe(params =>{
     this.id= +params['id'];
   });

   this.getTheFour();
  }

  backClick(){
    this._location.back();
  }

  getTheFour(){
    this.serviceFour.retreivOneFour(this.id).subscribe(data=>{
      this.four=data;
      console.log("DAtEEEEEEEEEEEEEEEE",this.four.dateCreation);
      let d = new Date(data.dateCreation);
      let DateCreation = this.datePipe.transform(d, 'yyyy-MM-dd');
    console.log("DAtEEEEEEEEEEEEEEEE",DateCreation);
      
    })}
  editFournisseur(){
    this.sub=this.route.params.subscribe(params =>{
      this.id= +params['id']; console.log("l'id est :"+this.id)
    });
    console.log("La date selectionne :",this.four.dateCreation)
   
    // let date=this.four.dateCreation;
    //   let datedd = new Date(date)
    //   let dd = (datedd.getDate() < 10 ? '0' : '') + datedd.getDate();
    //   let MM = ((datedd.getMonth() + 1) < 10 ? '0' : '') + (datedd.getMonth() + 1);
    //   let yyyy = datedd.getFullYear();
    
    let fourClone= new Fournisseur();
    // fourClone.dateCreation=dd + "-" + MM + "-" + yyyy;
    fourClone.name=this.four.name;
    fourClone.contactName=this.four.contactName;    
    fourClone.email=this.four.email;
    fourClone.phone=this.four.phone;
    fourClone.address=this.four.address;
    fourClone.tax=this.four.tax;
    fourClone.note=this.four.note;
    let id =Number(this.id)
    console.log("le nom de fournisseur est: "+fourClone.name);
    console.log("l'id est : "+ this.id)
    console.log("Fournisseur DATA to Update",fourClone)
  this.serviceFour.editFourn(fourClone,id).subscribe(data=>{
    console.log("Succes!", data),
    error=>console.error("Error!", error)
  })
  alert("Vous avez modifié le fournisseur avec Succé")
this.backClick()
  }
  
}

