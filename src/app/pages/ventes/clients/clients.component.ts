
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbLayoutHeaderComponent } from '@nebular/theme';
import { getLocaleExtraDayPeriodRules, DatePipe } from '@angular/common';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Famille } from '../../../modelsInt/famille';
import { Client } from '../../../modelsInt/fact-clt-bc';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../venteSrvices/client.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [DatePipe]
})
export class ClientsComponent implements OnInit {
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
        // id:{
        //   title:'id',
        //   type:'string',
        //   width:'10%',
          
        // },
        nom: {
          title: 'Nom',
          type: 'string',
          width: '15%',
         
        },
      
        prenom: {
          title: 'prenom',

          // title: 'Name' ,
          // type: 'html'      //  <---- hear you have to pass html as a type... 
    //     },
    
          type: 'html',
          width: '15%',
                },                     
              
        phone:{
          title:'Téléphone',
          type:'string',
          width: '15%',
        },       
        email: {
          title: 'Email',
          type: 'email',
          width: '15%',
        },
        
        address:{
          title : 'Adresse',
          type: 'string',
          
        },
        tax:{
          title: 'Taxe',
          type:'number',
          width: '10%',
        },

        matriculeFiscal:{
          title:"MatF",
          type:'string',
          width: '15%',
        },
        
        
        note:{
          title:'Note',
          type:'string',
          
        },
        chiffreAchat:{
          title:'Chiffre Realisé',
          type:'number',
          width: '15%',
          addable:false,
          editable: false,
        },
    
        dateCreation:{
          title : 'Prem_Visite',
          valuePrepareFunction: (Prem_Visite) => {
            return this.datePipe.transform(new Date(Prem_Visite), 'dd-MM-yyyy');
          },

          width: '15%',
          addable:false,
          editable: false,
        },
        lastVisit:{
          title:'Der_Visite',
          valuePrepareFunction: (Der_Visite) => {
            return this.datePipe.transform(new Date(Der_Visite), 'dd-MM-yyyy');
          },
          width: '15%',
          addable:false,
          editable: false,
        },
        credit:{
          title: 'Credit',
          type:'number',
          width: '15%',
          // editable:false,
          addable: false,
          // add:false,
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
         
        // "depot.name": {
        //     title: 'Depot',
          
              
        //         valuePrepareFunction: (cell,row) => {
        //           return row.depot?.name;
                
        //         }
        //       },


              // "famille.name":{
              //   title:'Famille',
              //   valuePrepareFunction:(cell,row)=>{
              //     return row.famille?.name;
              //   }

            // }
          
                  
        },
      attr:{
        class :'table table-bordered',
      },

     
    };
     
  
    public clger : Client;
  
  clients : Client[]=[]
  cl : Client = new Client() ;
  submitted =false;
  source: LocalDataSource
  

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private datePipe: DatePipe) { }
             
             
//  onSearch(query: string = '') {
//                 this.clients.setFilter([
//                   // fields we want to include in the search
//                   {
//                     field: 'nom',
//                     search: query
//                   },
//                   {
//                     field: 'prenom',
//                     search: query
//                   },
//                   {
//                     field: 'phone',
//                     search: query
//                   },
//                   {
//                     field: 'Email',
//                     search: query
//                   }
//                 ], false); }


  ngOnInit(): void {

    this.clientService.retreiveAllClient().subscribe(data=>{
      this.clients =data
    })
   let temp : any =  [];
    for(let i = 0 ; i < this.clients.length ; i++){
      var obj = {
        prenom:'<a href="'+this.clients[i].prenom+'">',          
        
      }
      temp.push(obj);        
    }      
    this.source = new LocalDataSource(temp); }

  
  onDeleteConfirm($event):void{
    console.log("delete function");
    let id:number = $event.data['id']
    if (window.confirm("Vous etes sur le point de supprimer un client de la liste")){
    this.clientService.deleteClient(id).subscribe(res=>{
      $event.confirm.resolve($event.source.data);
    })
  }
}

  onCreateConfirm($event){
    console.log("confirm creation");
    
    this.clientService.createClient($event.newData).subscribe(data=>{
      let clientResolve= new Client();
      clientResolve=data;
      $event.confirm.resolve(clientResolve)
      console.log("Le client cree est: ",data )
    })
  }
  onEditConfirm($event){
    console.log("Confirm function")
    this.clientService.editerClient($event.newData['id'],$event.newData).subscribe(res=>{
      let clres= new Client();
      clres=res
      console.log("le client avec modification",clres)
      $event.confirm.resolve(clres)
    })
  }

}
