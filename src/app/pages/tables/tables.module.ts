import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbLayoutModule, NbSelectComponent, NbSelectModule, NbListModule, NbAccordionModule, NbDatepickerModule, NbStepperModule, NbLayoutColumnComponent } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomDatePipe } from '../../custom.datepipe';
import { BonDetailComponent } from './fournisseur/lst-br-fourn/bon-detail/bon-detail.component';

@NgModule({
  imports: [
    NbCardModule,
    FormsModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule,
    ThemeModule,
    NbListModule,
    NbStepperModule,
    NbAccordionModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbDatepickerModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    CustomDatePipe,
    BonDetailComponent
    
  
  ],
})
export class TablesModule { }
