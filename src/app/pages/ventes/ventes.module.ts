import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentesRoutingModule } from './ventes-routing.module';
import { VentesComponent } from './ventes.component';
import { BonCommandeComponent } from './bon-commande/bon-commande.component';
import { ClientsComponent } from './clients/clients.component';
import { FacturesComponent } from './factures/factures.component';
import { FamilleComponent } from './famille/famille.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbSelectModule, NbTreeGridModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbStepperModule, NbCheckboxModule, NbButtonModule, NbDialogModule, NbPopoverModule, NbTooltipModule, NbTabsetModule, NbWindowModule, NbAccordionModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RemovewhitespacesPipe } from '../../modelsInt/removeWhiteSpace';
import { LstPrdFamComponent } from './famille/lst-prd-fam/lst-prd-fam.component';
import { ShowcaseDialogComponent } from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { DialogNamePromptComponent } from '../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { WindowFormComponent } from '../modal-overlays/window/window-form/window-form.component';
import { NgxPopoverCardComponent } from '../modal-overlays/popovers/popover-examples.component';
import { FenetrQtyComponent } from './famille/lst-prd-fam/fenetr-qty/fenetr-qty.component';
import { FactureComponent } from './famille/facture-creat/facture.component';
import { FamillePrinComponent } from './famille-prin/famille-prin.component';
import { FactDetailComponent } from './factures/fact-detail/fact-detail.component';
import { BcDetailsComponent } from './bon-commande/bc-details/bc-details.component';
import { AjoutBcComponent } from './bon-commande/ajout-bc/ajout-bc.component';
import { LstLigneBcComponent } from './bon-commande/ajout-bc/lst-ligne-bc/lst-ligne-bc.component';


@NgModule({
  declarations: [VentesComponent, BonCommandeComponent,
                 ClientsComponent, FacturesComponent,
                  FamilleComponent,
                  RemovewhitespacesPipe,
                  LstPrdFamComponent,
                  FenetrQtyComponent,
                  FactureComponent,
                  FamillePrinComponent,
                  FactDetailComponent,
                  BcDetailsComponent,
                  AjoutBcComponent,
                  LstLigneBcComponent],
  imports: [
    CommonModule,
    VentesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbSelectModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    ThemeModule,
    NbListModule,
    NbStepperModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbButtonModule,
  NbCheckboxModule,
  NbDialogModule,
  NbPopoverModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
  NbListModule,
    NbStepperModule,
    NbAccordionModule,
    VentesRoutingModule,
    Ng2SmartTableModule,
  ]
})
export class VentesModule { }
