import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalasPage } from './salas.page';
import { PartidaComponent } from './partida/partida.component';

const routes: Routes = [
  {
    path: '',
    component: SalasPage
  },
  {
    path: 'partida',
    component: PartidaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalasPageRoutingModule {}
