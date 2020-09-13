import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentesComponent } from './ventes.component';
import { ClientsComponent } from './clients/clients.component';
import { FacturesComponent } from './factures/factures.component';
import { BonCommandeComponent } from './bon-commande/bon-commande.component';
import { FamilleComponent } from './famille/famille.component';
import { LstPrdFamComponent } from './famille/lst-prd-fam/lst-prd-fam.component';
import { FenetrQtyComponent } from './famille/lst-prd-fam/fenetr-qty/fenetr-qty.component';
import { FamillePrinComponent } from './famille-prin/famille-prin.component';



const routes: Routes = [{
  path: '',
  component: VentesComponent,
  children: [
    {path: 'famille', component: FamillePrinComponent},
    // {path:'famille/lstPrd-fam/:id', component: LstPrdFamComponent},
    // {path:'famille/lstPrd-fam/:id/fentre', component:FenetrQtyComponent},
    {
      path: 'clients',
      component: ClientsComponent,
    },
    { path: 'factures',
      component: FacturesComponent,
    },
    {path: 'bon-commande',
    component: BonCommandeComponent,
    }
  ],
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentesRoutingModule { }
