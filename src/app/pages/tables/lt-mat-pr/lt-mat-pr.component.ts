import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { MatpremService } from '../../../stockServices/matprem.service';
import { MatierePremiere } from '../../../modelsInt/matierePrem';
import { Depot } from '../../../modelsInt/depot';
import { NbLayoutHeaderComponent } from '@nebular/theme';
import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Famille } from '../../../modelsInt/famille';


@Component({
  selector: 'ngx-lt-mat-pr',
  templateUrl: './lt-mat-pr.component.html',
  styleUrls: ['./lt-mat-pr.component.scss']
})
export class LtMatPrComponent {
  
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
        id:{
          title:'id',
          type:'string',
          width:'10%',
          
        },
        name: {
          title: 'Designation',
          type: 'string',
          width: '15%',
          // length:'10',
          // size:'5px',
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
        quantity:{
          title : 'Stock',
          type: 'number',
          add:false,
          editable: false,
        },
        // depot:{
        //   title: 'Depot',       
        //   type:'string',
        //   editor: {
        //     type: 'list',
        //     config: {
        //       list: []
        //     },
        //   },
        //   valuePrepareFunction: (value) => {
        //     for (let i = 0; i <= this.settings.columns.depot.editor.config.list.length - 1; i++) {
        //       if(this.settings.columns.depot.editor.config.list[i].value == value){
        //         return this.settings.columns.depot.editor.config.list[i].title
        //       }
        //     }
        //   },
        // }, 
          
        
          //   filterFunction(depot?: any, search?: string): boolean {
          //     let match = true;
          //     Object.keys(depot).map(u => depot.name).filter(it => {
          //       match = it.toLowerCase().includes(search);
          //     });
    
          //     if (match || search === '') {
          //       return true;
          //     } else {
          //       return false
          //     }
          //   },
          //   filter: true,
          //   compareFunction: (direction: any, a: any, b: any) => {
          //     let first = typeof a.name === 'string' ? a.name.toLowerCase(): a.name;
          //     let second = typeof b.name === 'string' ? b.name.toLowerCase(): b.name;
    
          //     if (first < second) {
          //       return -1 * direction;
          //     }
          //     if (first > second) {
          //       return direction;
          //     }
          //     return 0;
          //   }
        //   }
         
        "depot.name": {
            title: 'Depot',
          
              
                valuePrepareFunction: (cell,row) => {
                  return row.depot?.name;
                
                }
              },
              // "famille.name":{
              //   title:'Famille',
              //   valuePrepareFunction:(cell,row)=>{
              //     return row.famille?.name;
              //   }

            // }
          
                  
        },
      attr:{
        class : 'table table-bordered'
      },
      actions:{
        add:false,
        edit:false,
        delete:false,
      },
    };
    
  
    public matReg : MatierePremiere;
  
  matPrems
  mt : MatierePremiere = new MatierePremiere() ;
  submitted =false;
  depot: Depot;
  // famille:Famille;
  depotName 

 

      constructor (private service: SmartTableData,
      private matprService : MatpremService,
      private route :ActivatedRoute){
         
    }

      // lst :any[]= this.getMatPrems();

    ngOnInit(){
     
        this.getMatPrems();
        this.matPrems
        
      //  this.getDepots();
        
        
        //this.getMatptemRegist(this.route.snapshot.params.id);
          
    }

    getMatPrems(){
      let matprs:MatierePremiere[];
      let dep= new Depot();
     
      this.matprService.getMatPrem().subscribe(
        data =>{this.matPrems=data},
        err => console.error(err),
        () => console.error('mat prem loaded')
        
      );}

      getDepots(){
        this.getMatPrems();
        let matLst=this.getMatPrems();
        // let ltdepot: any[]
        // matLst.forEach(element => {this.depotName=element.depot.name;
        //               ltdepot.fill(this.depotName)}
          
        // );
        //   console.log(ltdepot);
      }

        // getDepot(){
        //   this.matprService.getMatPrem().subscribe(
        //     data => {
        //       this.settings.columns.depot.editor.config.list =data;
        //       this.settings =Object.assign({},this.settings);
        //     }
        //   )
        // }

    }
  

