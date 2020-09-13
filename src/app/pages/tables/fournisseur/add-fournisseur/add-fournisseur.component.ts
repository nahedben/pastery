import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FournisseurService } from '../../../../stockServices/fournisseur.service';
import { Fournisseur } from '../../../../modelsInt/fournisseur';
import { ActivatedRoute } from '@angular/router';
import {Location, DatePipe} from '@angular/common';
import { parse } from 'path';
import { CustomDatePipe } from '../../../../custom.datepipe';
@Component({
  selector: 'ngx-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent implements OnInit {
four: Fournisseur={};
dat:Date =null;
st:boolean =true;
  constructor(private fourService :FournisseurService,
              private route:ActivatedRoute,
              private _location: Location,
              private datepipe: DatePipe ) { }
             
                      
  ngOnInit(): void {
   
    }
   clicked: boolean =true;
  onSubmit(){
    
      if(this.four !==null){
      alert("Succés d'ajout de fournisseur! Voir Liste page précédente");
      this.backClick()
      }
      let date=this.four.dateCreation
      let datedd = new Date(date)
      var dd = (datedd.getDate() < 10 ? '0' : '') + datedd.getDate();
      var MM = ((datedd.getMonth() + 1) < 10 ? '0' : '') + (datedd.getMonth() + 1);
      var yyyy = datedd.getFullYear();
       
    let fourClone= new Fournisseur();
    fourClone.dateCreation=dd + "-" + MM + "-" + yyyy;
    fourClone.name=this.four.name;
    fourClone.contactName=this.four.contactName;
    fourClone.email=this.four.email;
    fourClone.phone=this.four.phone;
    fourClone.address=this.four.address;
    fourClone.tax=this.four.tax;
    fourClone.note=this.four.note;
  console.log("DATA TO ADD",fourClone)
this.fourService.createFour(fourClone).subscribe(data=>{
    console.log("Succes!", data)
    error=>console.error("Error!", error)

 })
 

  } 


  backClick(){
    this._location.back();
  }
}


