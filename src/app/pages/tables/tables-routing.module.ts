import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';

import { TreeGridComponent } from './tree-grid/tree-grid.component';
import {  MatierePremiereComponent } from './matiere-premiere/matiere-premiere.component';

import { LtMatPrComponent } from './lt-mat-pr/lt-mat-pr.component';
import { ModifierStockComponent } from './modifier-stock/modifier-stock.component';
import { SelMatComponent } from './sel-mat/sel-mat.component';
import { DepotComponent } from './depot/depot.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ModifFournComponent } from './fournisseur/modif-fourn/modif-fourn.component';
import { LstMatFourComponent } from './fournisseur/lst-mat-four/lst-mat-four.component';
import { LstBrFournComponent } from './fournisseur/lst-br-fourn/lst-br-fourn.component';
import { BonReceptionComponent } from './bon-reception/bon-reception.component';
import { BonReception } from '../../modelsInt/bonReception';
import { AddBonRecepComponent } from './bon-reception/add-bon-recep/add-bon-recep.component';
import { ModifBonRecepComponent } from './bon-reception/modif-bon-recep/modif-bon-recep.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'matiere-premiere',
      component: MatierePremiereComponent,
    },
    { path: 'list-mat-prem',
      component: LtMatPrComponent,
    },
    {path: 'editer-stock',
    component: ModifierStockComponent,
   },
   {path: 'editer-stock/sel-mat/:id',
    component: SelMatComponent,
   },
   {path: 'depot', 
   component: DepotComponent},
   {path: 'fournisseur',
    component : FournisseurComponent},

   {path:'fournisseur/add-four',
   component : AddFournisseurComponent},

   {path: 'fournisseur/modif-fourn/:id',
    component:ModifFournComponent},

    {path:'fournisseur/lst-mat-fourn/:id',
    component: LstMatFourComponent},

    {path:'fournisseur/lst-br-fourn/:id',
    component:LstBrFournComponent},

    {path:'bon-reception',
    component:BonReceptionComponent},

    {path:'bon-reception/add-bon-recep',
     component:AddBonRecepComponent},
     
    { path:'bon-reception/modif-bon-recep/:id',
    component:ModifBonRecepComponent},
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  MatierePremiereComponent,
  LtMatPrComponent,
  ModifierStockComponent,
  SelMatComponent,
  DepotComponent,
  FournisseurComponent,
  AddFournisseurComponent,
  ModifFournComponent,
  LstMatFourComponent,
  LstBrFournComponent,
  BonReceptionComponent,
  AddBonRecepComponent,
  ModifBonRecepComponent,
  TreeGridComponent,
];
