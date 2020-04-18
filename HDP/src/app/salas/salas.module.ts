import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalasPageRoutingModule } from './salas-routing.module';

import { SalasPage } from './salas.page';
import { PartidaComponent } from './partida/partida.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalasPageRoutingModule
  ],
  declarations: [SalasPage,PartidaComponent],
  // entryComponents:[PartidaComponent]
})
export class SalasPageModule {}
