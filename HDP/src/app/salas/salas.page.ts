import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Sala, salaSesion } from '../model/sala';
import { Jugador } from '../model/jugador';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-salas',
  templateUrl: './salas.page.html',
  styleUrls: ['./salas.page.scss'],
})
export class SalasPage implements OnInit {
  // entryPoint:string = 'http://localhost:8100';
  salas:Sala;
  usuario:Jugador;
  jugadores:Jugador[];
  restantes:number = 0;
  salaSesion:salaSesion;
  sesion:Boolean = false;
  buscarSala:Boolean = false;
  puntosG:number = 0;
  urlparams:number=0;
  params:string;
  SumarseASala: boolean = false;
  validarIngresoNuevoJugador:Boolean = false;
  femenino:string = "1";
  masculino:string = "0";
  _cantJugadores:string = "";
  idUsuario:string;

  constructor(private service:ServiceService, private storage:Storage,
    public platform:Platform, private router:Router) {
    this.idUsuario = this.service.IdUsuario.value;
    this.usuario = new Jugador();
    this.salaSesion = new salaSesion();
 
    this.getSala();
    this.salas = this.service.salaSubject.value;
    console.log(this.salas);

    this.urlparams = platform.url().indexOf('salas') + 6;
    this.params = platform.url().slice(this.urlparams);
    this.sesion = this.service.Sesion.value;
    
    
  }

  ngOnInit() {

    this.init();
    
  }
  init(){
    
      setTimeout(()=>{
        console.log(this.salaSesion, ' assasasa');
        
        if(this.buscarSala && !this.service.creandoSala.value){
          try{
            this.GetSalaXCodigo();
          }
  
          catch{
            alert('Error de servidor');
          }
          
        }
        else{
          this.SumarseASala = false;
          this.sesion = true;
        }
        if(this.service.creandoSala.value){
          this.service.GetAllJugadorSala(this.params).subscribe((res)=>{
            if(res.ok){
              this.jugadores = res.data;
              this.jugadores = this.jugadores.filter(x=>x._id != this.idUsuario);
              this.Restantes(this.service.cantJugadores.value,this.jugadores.length);
              console.log("Los usuarios ", this.jugadores);
              this.SumarseASala = false;
              this.sesion = true;
              this.storage.get('jugador').then((val)=>{
                if(val != null){
                  this.salaSesion.nombre = val;
                  
                }
              }).then(()=>{
                this.storage.get("genero").then((val)=>{
                  if(val !=  null){
                    this.usuario.genero = val;
                  }
                })
              })
            }
          })
        }
        
      },600)
  
    
  }
  Genero(e){
    this.usuario.genero = e.detail.value;
  }
  GetSalaXCodigo(){
    if(this.params.length == 4){
      this.service.getSalaXcodigo(this.params).subscribe((res)=>{
        if(res.data[0].estado == 2 && (this.usuario._id == undefined)){
          alert('Sala completa');
           this.sesion = false;
            this.SumarseASala = false;
            this.router.navigateByUrl('inicio');
          return
        }
        if(res.ok){
          if(this.params == res.data[0].codigo){
            this.sesion = false;
            this.SumarseASala = true;
            this.usuario.codigo = this.params;
            this.salaSesion = res.data[0];
            console.log(this.salaSesion,' dd ',this.usuario);
            
          }
          else{
            this.sesion = false;
            this.SumarseASala = false;
            alert("No coincide con ninguna sala");
            this.router.navigateByUrl('inicio');
          }
          // if(this.service.Sesion.value){
          //   this.SumarseASala = false;
          //   this.sesion = true;
            
            
          // }
        }
        else{
          this.router.navigateByUrl('inicio');
        }
      })
    }
    else{
      alert("No coincide con ninguna sala");
      this.router.navigateByUrl('inicio');
    }
  }
  Restantes(cantidadJug,CantUsuarios){
    this.restantes = Number(cantidadJug) - Number(CantUsuarios) 
  }
  volver(){
    this.router.navigateByUrl('inicio');
  }
  getSala(){
    this.storage.get('ID').then((val)=>{
      this.service.IdUsuario.next(val);
      this.idUsuario = val;
    }).then(()=>{
      this.storage.get('sala').then((val)=>{
        if(val != null){
          this.salaSesion.codigo = val;
        }
        else{
          this.buscarSala = true;
          
        }
      }).then(()=>{
        this.storage.get('jugador').then((val)=>{
          if(val != null){
            this.salaSesion.nombre = val;
            this.usuario.nombre = val;
            
          }
        }).then(()=>{
          this.storage.get('cantJugadores').then((val)=>{
            if(val != null){
              this.salaSesion.cantJugadores = val;
            }
          }).then(()=>{
            this.storage.get('puntoGanador').then((val)=>{
              if(val!=null){
               
                if(this.params != this.salaSesion.codigo){
                  alert(`Ya tienes una sala: ${environment.SERVER_URL}/salas/${this.salaSesion.codigo}`);
                  this.router.navigateByUrl('inicio');
                }
                else{
                  this.salaSesion.puntoGanador = val;
                  this.service.Sesion.next(true);
                  this.sesion = true;
                  this.service.GetAllJugadorSala(this.salaSesion.codigo).subscribe((res)=>{
                    if(res.ok){
                      this.jugadores = res.data;
                      this.Restantes(this.salaSesion.cantJugadores,this.jugadores.length);
                      console.log("Los usuarios ", this.jugadores);
                    }
                  })
                }
              }
            }).then(()=>{
              this.storage.get("genero").then((val)=>{
                if(val != null){
                  this.usuario.genero = val;
                }
              })
            })
          })
        });
      });
    });
    
  }
  SumarseSala(){
    
    if(this.usuario.genero.length > 0){
      this.service.CrearInvitado(this.usuario).subscribe((res)=>{
        if(res.ok){
          if(res.message.trim() == "full"){
            alert("Se completo la sala");
            this._cantJugadores = res.cant;
          
            this.salaSesion.nombre = res.data.nombre;
            this.salaSesion.codigo = res.data.codigo;
            this.salaSesion.cantJugadores = res.cant;
            this.salaSesion.puntoGanador = res.puntos;
            this.service.GetAllJugadorSala(res.data.codigo).subscribe((_res)=>{
              if(_res.ok){
                this.SumarseASala = false;
                this.sesion = true;
                this.jugadores = _res.data;
                // this.jugadores = this.jugadores.filter(x=>x._id == res.data._id);
                
                this.Restantes(this._cantJugadores,this.jugadores.length);
                console.log("sala sesion", this.salaSesion);

              }
            });
          }
          else{
            this._cantJugadores = res.cant;
          
            this.salaSesion.nombre = res.data.nombre;
            this.salaSesion.codigo = res.data.codigo;
            this.salaSesion.cantJugadores = res.cant;
            this.salaSesion.puntoGanador = res.puntos;
            this.service.GetAllJugadorSala(res.data.codigo).subscribe((_res)=>{
              if(_res.ok){
                this.SumarseASala = false;
                this.sesion = true;
                this.jugadores = _res.data;
                // this.jugadores = this.jugadores.filter(x=>x._id == res.data._id);
                this.Restantes(this._cantJugadores,this.jugadores.length);
                console.log("sala sesion", this.salaSesion);

              }
            });
          }
        }
      })
    }
    else{
      alert("Elija un genero");
    }
  }
  validarIngresoSala(){
    if(this.usuario.nombre.length < 3){
      this.validarIngresoNuevoJugador = false;
    }
    else{
      this.validarIngresoNuevoJugador = true;
    }
  }
  irPartida(){
    console.log(window.location.pathname +'/partida')
    this.router.navigateByUrl(window.location.pathname +'/partida');
  }
}
