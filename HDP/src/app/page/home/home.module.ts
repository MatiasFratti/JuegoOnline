import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ModalUsuarioPage } from 'src/app/componentes/modal-usuario/modal-usuario.page';
import { ModalUsuarioPageRoutingModule } from 'src/app/componentes/modal-usuario/modal-usuario-routing.module';
import { ModalUsuarioPageModule } from 'src/app/componentes/modal-usuario/modal-usuario.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ModalUsuarioPageModule,
    IonicStorageModule
  ],
  declarations: [HomePage],
  entryComponents:[ModalUsuarioPage],
  exports:[]
})
export class HomePageModule {}
