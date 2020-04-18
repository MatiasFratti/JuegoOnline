import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule} from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalUsuarioPageRoutingModule } from './componentes/modal-usuario/modal-usuario-routing.module';
import { ModalUsuarioPage } from './componentes/modal-usuario/modal-usuario.page';
import { ModalUsuarioPageModule } from './componentes/modal-usuario/modal-usuario.module';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment'

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PartidaComponent } from './salas/partida/partida.component';
const config: SocketIoConfig = { url: environment.SERVER_URL, options: {} };



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalUsuarioPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ModalController,
    ModalUsuarioPage,
    PartidaComponent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {}
