import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { MatpremService } from '../../../stockServices/matprem.service';
import { ActivatedRoute } from '@angular/router';
import {MatierePremiere} from '../../../modelsInt/matierePrem';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './matiere-premiere.component.html',
  styleUrls: ['./matiere-premiere.component.scss'],
})
export class MatierePremiereComponent {
  listOfUnit: any[]=["KG","UNIT","LITER","NONE"];
  // public source;
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
        unit: {
          title: 'Unit',
          type: 'string',
          defaultValue:'Unit',
          editor:{
            type:'list',
              config:{
                list: [{title: 'KG', value: 'KG'}, {title: 'UNIT', value: 'UNIT'},{title: 'LITER', value: 'LITER'},{title:'METER',value: 'METER'}],
                
            
                      },
                  },
                },      
        stockLimit:{
          title:'Stock Limit',
          type:'number',
        },       
        purchaseUnitPrice: {
          title: 'Prix Achat',
          type: 'number',
        },
        // quantity:{
        //   title : 'Stock',
        //   type: 'number',
        //   add:false,
        //   editable: false,
        // }
      },
      attr:{
        class : 'table table-bordered'
      },
      // actions:{
      //   add:false,
      //   edit:false,
      //   delete:false,
      // },
    };
    
  
    public matReg : MatierePremiere;
  
  matPrems
  mt : MatierePremiere = new MatierePremiere() ;
  submitted =false;

 

      constructor (private service: SmartTableData,
      private matprService : MatpremService,
      private route :ActivatedRoute){
         
    }
    ngOnInit(){
        this.getMatPrems();
        //this.getMatptemRegist(this.route.snapshot.params.id);
          
    }

    getMatPrems(){
      this.matprService.getMatPrem().subscribe(
        data =>{this.matPrems=data},
        err => console.error(err),
        () => console.error('mat prem loaded')
      );
    }
  
  onDeleteConfirm($event):void{
    console.log($event.data)
   let id:number = $event.data['id']
    console.log("l'id existant"+id)
    if (window.confirm('Etes vous sure de vouloir supprimer cet article?')) {
      this.matprService.removeMatPrem(id).subscribe(res=>{
      $event.confirm.resolve($event.source.data);
    
  }
      )}}
     
  

  newMatierePremiere():void{
    this.submitted =false;
    this.mt =new MatierePremiere();

  }
  onCreateConfirm($event){
console.log($event);
  let matPremClone = new MatierePremiere();
  let matPremToResolve = new MatierePremiere();
  matPremClone.name = $event.newData['name'];
  matPremClone.unit = $event.newData['unit'];
  matPremClone.stockLimit = $event.newData['stockLimit'];
  matPremClone.purchaseUnitPrice=$event.newData['purchaseUnitPrice'];

 console.log(matPremClone)
    this.matprService.createMatPrem(matPremClone).subscribe(data=> {
      matPremToResolve.name = data['name'];
      matPremToResolve.unit = data['unit'];
      matPremToResolve.stockLimit = data['stockLimit'];
      matPremToResolve.purchaseUnitPrice=data['purchaseUnitPrice'];
      $event.confirm.resolve(matPremToResolve)
    },
    error => console.log(error));

  }

   onEditConfirm($event){

    console.log($event);
    let matPremClone =new MatierePremiere();    
    let matPremResolve =new MatierePremiere();
    matPremClone.id=$event.newData['id'];
    matPremClone.unit = $event.newData['unit'];   
    matPremClone.purchaseUnitPrice=$event.newData['purchaseUnitPrice'];
   
    this.matprService.ModifyMatPrem(matPremClone,matPremClone.id ).subscribe(data=>{
                  console.log(data);
                  matPremResolve.stockLimit=$event.newData['stockLimit'];
                  matPremResolve.name=$event.newData['name'];
                  matPremResolve.unit = data['unit'];   
                  matPremResolve.purchaseUnitPrice=data['purchaseUnitPrice'];
                  $event.confirm.resolve(matPremResolve);
                 
    },
    error=> console.log('Error'+error)
    );
    
  }
  onEditConfirm2($event){

    console.log($event);
    let matPremClone =new MatierePremiere();    
    let mtRes= new MatierePremiere();
    matPremClone.id=$event.newData['id'];
    console.log(" c'est l 'id "+matPremClone.id);
   matPremClone.name = $event.newData['name'];
   matPremClone.stockLimit = $event.newData['stockLimit'];    
   console.log("c'est le prix actuel"+matPremClone.stockLimit);
    this.matprService.ModifyMatPrem2(matPremClone,matPremClone.id ).subscribe(data=>{
                  console.log(data);
                  mtRes.unit=$event.newData['unit'];
                  mtRes.purchaseUnitPrice=$event.newData['purchaseUnitPrice']
                  mtRes.name = data['name'];
                  mtRes.stockLimit = data['stockLimit'];
                  $event.confirm.resolve(mtRes);
                  console.log("Confirm2 : "+mtRes)
    },
    error=> console.log('Error'+error)
    );}

}

