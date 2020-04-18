import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule)
    
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'modal-usuario',
    loadChildren: () => import('./componentes/modal-usuario/modal-usuario.module').then( m => m.ModalUsuarioPageModule)
  },
  {
    path: 'salas/:id',
    loadChildren: () => import('./salas/salas.module').then( m => m.SalasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
