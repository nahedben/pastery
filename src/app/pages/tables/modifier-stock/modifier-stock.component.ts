import { Component, OnInit } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { id } from '@swimlane/ngx-charts';
import { MatpremService } from '../../../stockServices/matprem.service';
import { ActivatedRoute } from '@angular/router';
import { MatierePremiere } from '../../../modelsInt/matierePrem';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'ngx-modifier-stock',
  templateUrl: './modifier-stock.component.html',
  styleUrls: ['./modifier-stock.component.scss']
})
export class ModifierStockComponent implements OnInit{
  customColumn ='Id';
  defaultColumns = ['Nom','Unite', 'Stock','Depot'];
  // allColumns = [ this.customColumn, ...this.defaultColumns ];
  allColumns = this.defaultColumns ;
//   dataSource=[{"id":23,"name":"ttt200","unit":"UNIT","quantity":null,"stockLimit":100.00,"purchaseUnitPrice":100.00,"depot":null,"famille":null},
//   {"id":15,"name":"Amande","unit":"KG","quantity":4.99,"stockLimit":5.00,"purchaseUnitPrice":42.00,"depot":null,"famille":null}
// ];
_listFilter:string;
get listFilter() : string{
  return this._listFilter;
}
set listFilter(value: string){
  this._listFilter =value;
  this.filteredMats= this.listFilter ?
                         this.performFilter(this.listFilter):
                         this.matPrems;
}

filteredMats: MatierePremiere[];
// mt: MatierePremiere[]=[];
matPrems:MatierePremiere[];
mat: MatierePremiere;

  constructor(private matprService : MatpremService,
    private route :ActivatedRoute) {}

    performFilter(filterBy : string): MatierePremiere[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.matPrems.filter((mt : MatierePremiere)=>
      mt.name.toLocaleLowerCase().indexOf(filterBy) !==-1);
      }
  ngOnInit(): void {
    
    this.getMatPrems();
    this.matPrems;
  }

 
  //  getCurrentMat(id:number): number{
  //    let Existid:number;
  //   Existid=id;
    
  //   console.log(Existid);
  //   console.log(id)
  //   return Existid
  // }
  getMatPrems(){     
    this.matprService.getMatPrem().subscribe(
      {next:data=>{this.matPrems=data,
      this.filteredMats=this.matPrems;},
      error: err=> console.error('mat prem loaded')
      
    });    
    }
    
    getMatPremiere(id){
      // this.getCurrentMat(id);
      this.matprService.getMatP(id).subscribe(
        data=>{this.mat=data; console.log(this.mat)},
        err => console.error(err),
        () => console.error('mat prem loaded')
        
      )

  }
}