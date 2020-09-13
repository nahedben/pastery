import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionsRoutingModule } from './productions-routing.module';
import { ProductionsComponent } from './productions.component';
import { OrderProductionComponent } from './order-production/order-production.component';
import { ProduitComponent } from './produit/produit.component';

import { NbCardModule, NbUserModule, NbButtonModule, NbTabsetModule, NbActionsModule, NbRadioModule, NbSelectModule, NbListModule, NbIconModule, NbStepperModule, NbInputModule, NbWindowModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { AddproductComponent } from './produit/addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LigneRecetteComponent } from './produit/ligne-recette/ligne-recette.component';
import { FamilleComponent } from './famille/famille/famille.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesRoutingModule } from '../tables/tables-routing.module';



@NgModule({
  declarations: [ProductionsComponent, OrderProductionComponent, ProduitComponent, AddproductComponent, LigneRecetteComponent, FamilleComponent],
  imports: [
    CommonModule,
    ProductionsRoutingModule,
    Ng2SmartTableModule,
    TablesRoutingModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NgxEchartsModule,
    NbStepperModule,
    FormsModule,
 ReactiveFormsModule ,
 NbInputModule,

  ]
})
export class ProductionsModule { }
