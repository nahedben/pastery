import { Component, OnInit } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import { ActivatedRoute } from '@angular/router';
import { DepotService } from '../../../stockServices/depot.service';
import { Depot } from '../../../modelsInt/depot';
import { compilePipeFromMetadata } from '@angular/compiler';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { __values } from 'tslib';

@Component({
  selector: 'ngx-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i  class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
      
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Designation',
        type: 'string',
        width: '25%',
        length:'20',
      },
      details:{
        title: 'Details',
        type:'string',
        width:'25%',
        length:'20',
      },
      location:{
        title:'location',
        type:'string',
  
      },
      capacity:{
        title:'Capacité Stockage',
        type:'number',
      },
      actualcharge:{
        title:"Charge Actuelle",
        type:"number",
        editable:false,
        addable:false,

      },

    },
    attr:{
      class : 'table table-bordered'
    },
  }
depots
  constructor(private service : SmartTableData,
              private depServ: DepotService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getDepots()
  }

  getDepots(){
    this.depServ.getDepotAll().subscribe(
      data=>{this.depots=data},
      err=>console.error(err),
      ()=>console.error('depot loded')
    );

  }
  onCreateConfirm($event){
    console.log($event)
    let dep= new Depot();
    dep.name=$event.newData['name'];
    dep.details=$event.newData['details'];
    dep.location=$event.newData['location'];
    dep.capacity= $event.newData['capacity'];
    let depResolve=new Depot();
    this.depServ.createDepot(dep).subscribe(data=>{
    depResolve.name=data['name'];
    depResolve.details=data['details'];
    depResolve.location=data['location'];
    depResolve.capacity=data['capacity'];
    $event.confirm.resolve(depResolve);
  },
  error=>console.log(error));
  this.getDepots();
}

  onDeleteConfirm($event){  
   let id : number =$event.data['id']
   if(window.confirm('Etes vous sure de vouloir supprimer cette famille?')){
     this.depServ.removeDepot(id).subscribe(res=>{
       $event.confirm.resolve($event.source.data);
     })} 
  }

  onEditConfirm($event){
    console.log($event)
    let depclone= new Depot();
    let depResolve= new Depot();
    depclone.id=$event.newData['id'];
    console.log(typeof($event.newData['name']))
    if(typeof($event.newData['capacity'])!='number'){
      alert('Merci d\'entrer un nombre comforme')
    }
    depclone.name=$event.newData['name'];
    // console.log(Number($event.newData['name'])+"la valeur de nom est: "+$event.newData['name']);
   // if(($event.newData['name'])!='string')
    depclone.details =$event.newData['details'];
    depclone.location=$event.newData['location'];
    depclone.capacity =$event.newData['capacity'];
    
    this.depServ.editDepot(depclone,depclone.id).subscribe(data=>{
      depResolve.name=$event.newData['name'];
      depResolve.details =$event.newData['details'];
      depResolve.location=$event.newData['location'];
      depResolve.capacity =$event.newData['capacity'];
      
      $event.confirm.resolve(depResolve);

      
    })

  }
  // onEditConfirm($event){
  //   console.log($event);
  //   let matPremClone =new MatierePremiere();    
  //   let matPremResolve =new MatierePremiere();
  //   matPremClone.id=$event.newData['id'];
  //   matPremClone.unit = $event.newData['unit'];   
  //   matPremClone.purchaseUnitPrice=$event.newData['purchaseUnitPrice'];   
  //   this.matprService.ModifyMatPrem(matPremClone,matPremClone.id ).subscribe(data=>{
  //                 console.log(data);
  //                 matPremResolve.stockLimit=$event.newData['stockLimit'];
  //                 matPremResolve.name=$event.newData['name'];
  //                 matPremResolve.unit = data['unit'];   
  //                 matPremResolve.purchaseUnitPrice=data['purchaseUnitPrice'];
  //                 $event.confirm.resolve(matPremResolve);
                 
  //   },
  //   error=> console.log('Error'+error)
  //   );
   onEditConfirm2($event){
    console.log("confirmed2")

   }
}
