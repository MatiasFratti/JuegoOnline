import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../model/jugador';
import { Sala, salaSesion } from '../../model/sala';
import { ModalController } from '@ionic/angular';
import { ModalUsuarioPage } from 'src/app/componentes/modal-usuario/modal-usuario.page';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ServiceService } from 'src/app/service/service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  sala = new Sala();
  jugador = new Jugador();
  valorInicial:string;
  public crearSala:Boolean = false;
  salaSesion:salaSesion;
  codigo:string="";
  btnEnabled:boolean = false;
  salaLink:string = "http://localhost:8100/salas/";
  salaActiva:Boolean = false;
  
  constructor(public modalController: ModalController,
    private router:Router, private service:ServiceService,
    private storage:Storage) {
      this.salaSesion = new salaSesion();
      this.getSala();
     }

  ngOnInit() {
    setTimeout(()=>{
      if(this.salaSesion.codigo){
        this.salaActiva = true;
      }
    },600)
    
  }
  async presentModal() {
   
    const modal = await this.modalController.create({
      component: ModalUsuarioPage
    });
    return await modal.present();
  }
  crear(){
    try{
      if((this.salaSesion._id) != null){
        alert("Ya tienes una sala creada");
      this.router.navigateByUrl('inicio');
      
      }
      else{
        this.crearSala = true;
      }
    }
    catch{
      
      this.router.navigateByUrl('inicio');
    }
  }
  volver(){
    this.crearSala = false;
  }

  Jugadores(){
    // console.log(this.sala.cantJugadores,' cantidad de jugadores');
    try{
      if(this.salaSesion._id != null){
        alert("Ya tienes una sala creada");
      this.router.navigateByUrl('inicio');
      }
      else{
        if(this.sala.cantJugadores != ""){
          this.service.cantJugadores.next(this.sala.cantJugadores);
          this.service.salaSubject.next(this.sala);
          this.presentModal();
        }
      }
    }
    catch{
      
      this.router.navigateByUrl('inicio');
    }
    
  }
  public irSala(){
    
    // console.log(this.service.salaSubject.value,' sala subject');
    this.router.navigateByUrl(`salas/${this.sala.codigo}`);
  }
  unirseSala(){
    this.router.navigateByUrl(`salas/${this.codigo}`);
  }
  public cerrarModal() {
    this.modalController.dismiss();
  }
  MiSala(){
    this.router.navigateByUrl(`salas/${this.salaSesion.codigo}`);
  }
  btnNroSala(){
    if(this.codigo.length > 3){
      this.btnEnabled = true;
    }
    else{
      this.btnEnabled = false;
    }
    console.log(this.btnEnabled);
  }
  getSala(){
    
    this.storage.get('sala').then((val)=>{
      if(val != null){
        this.salaSesion.codigo = val;
        this.jugador.codigo = val;
      }
    }).then(()=>{
      this.storage.get('jugador').then((val)=>{
        if(val != null){
          this.salaSesion.nombre = val;
          this.jugador.nombre = val;
          
        }
      }).then(()=>{
        this.storage.get('cantJugadores').then((val)=>{
          if(val != null){
            this.salaSesion.cantJugadores = val;
            
          }
        }).then(()=>{
          this.storage.get('puntoGanador').then((val)=>{
            if(val!=null){
              this.salaSesion.puntoGanador = val;
              this.service.Sesion.next(true);
              
            }
          }).then(()=>{
            this.storage.get('ID').then((val)=>{
              this.salaSesion._id = val;
              this.service.salaSubject.next(this.salaSesion);
              this.jugador._id = val;
              this.service.creandoSala.next(false);
              this.service.Sesion.next(true);
              this.service.IdUsuario.next(val);
            })
          })
        })
      });
    });
  }
}
