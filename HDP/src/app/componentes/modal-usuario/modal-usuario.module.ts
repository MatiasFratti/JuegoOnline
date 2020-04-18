import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUsuarioPageRoutingModule } from './modal-usuario-routing.module';

import { ModalUsuarioPage } from './modal-usuario.page';
import { HomePageModule } from 'src/app/page/home/home.module';
import { HomePage } from 'src/app/page/home/home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUsuarioPageRoutingModule
    
  ],
  providers:[HomePage],
  declarations: [ModalUsuarioPage],
  exports:[ModalUsuarioPage]
})
export class ModalUsuarioPageModule {}
