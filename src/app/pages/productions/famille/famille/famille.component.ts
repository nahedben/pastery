import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SmartTableData } from '../../../../@core/data/smart-table';
import { FamilleService } from '../../../../stockServices/famille.service';
import { Famille } from '../../../../modelsInt/famille';
import { ProductionsComponent } from '../../productions.component';

@Component({
  selector: 'ngx-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {
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
      description:{
        title: 'Description',
        type:'string',
        width:'25%',
        length:'20',
      },
      prodSaison:{
        title:'prodction/jour',
        type:'number',  
      },
      nbrProd:{
        title:'Nbr Produit',
        type:'number',
        editable:false,
        addable:false,
      },
    },
    attr:{
      class : 'table table-bordered'
    },
  }
  lstFamille: Famille[]
  constructor( private route: ActivatedRoute,
                private service : SmartTableData,
                private famServ: FamilleService) { }

  ngOnInit(): void {

    this.famServ.retreiveAllFam().subscribe(data=> {
      this.lstFamille=data
      console.log("La liste de famille est: ",this.lstFamille)
    })
  }

  onCreateConfirm($event){
    console.log(" Create OK:  ", $event)
    let fam= new Famille()
    fam.name=$event.newData['name'];
    fam.description=$event.newData['description'];
    fam.prodSaison=$event.newData['prodSaison'];

    this.famServ.createFam(fam).subscribe(
      dt=>{
      console.log(" Famille creer", dt)
      this.famServ.retreiveAllFam().subscribe(data=>{
        this.lstFamille= data})
        error=>{console.error('error detecte: ')}
        
        })}
        
    //   error=>{
    //   if(error)
    //  {    
    // this.famServ.removeFam(dt.id)
    // alert('Attention l\'entrer production/jour doit être un NOMBRE')}
    // console.log('Error a corriger')
   
    
    //   } ;})

  
  onDeleteConfirm($event){
    console.log("delete work")
    let id : number =$event.data['id']

    if(window.confirm('Etes vous sure de vouloir supprimer ce depot?')){
    this.famServ.removeFam(id).subscribe(res=>{
      $event.confirm.resolve($event.source.data);
    })
  
    }
  }



  onEditConfirm($event){
    console.log("l4edition work")
    let fam= new Famille()    
    fam.name=$event.newData['name'];
    fam.description=$event.newData['description'];
    fam.prodSaison=$event.newData['prodSaison'];

    this.famServ.editFam(fam,$event.newData['id']).subscribe(data=>{
      this.famServ.retreiveAllFam().subscribe(dt=>{
        this.lstFamille=dt
      })
    })
    
  }
}
