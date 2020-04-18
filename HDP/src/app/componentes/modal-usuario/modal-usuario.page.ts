import { Component, OnInit } from '@angular/core';
import { HomePage } from 'src/app/page/home/home.page';
import { ServiceService } from 'src/app/service/service.service';
import { Sala, salaSesion } from 'src/app/model/sala';
import { Jugador } from 'src/app/model/jugador';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.page.html',
  styleUrls: ['./modal-usuario.page.scss'],
})

export class ModalUsuarioPage implements OnInit {
  public cantJugadores:any;
  sala = new Sala();
  nombre:string;
  ArrCodigo:string[] =[];
  jugador:Jugador;
  salaSesion:salaSesion;
  next: boolean = false;
  masculino:string = "0";
  femenino:string = "1";
 
  constructor(public home:HomePage, private service:ServiceService,
    private storage:Storage,private router:Router) { 
    this.jugador = new Jugador();
    this.salaSesion = new salaSesion();
    this.sala.usuarios = [];
    
      
    this.getSala();
    // this.cantJugadores = this.home.salaSubject.value.cantJugadores; 
  }
  
  ngOnInit() {
    this.home.sala.codigo = this.GenerateCodigo(1000,9999);
    console.log(this.service.salaSubject);
  }
  public obtenerSala(sala){
    
    this.cantJugadores = sala;
  }
  cerrar() { 
    this.home.cerrarModal();
  }
  Genero(e){
    this.jugador.genero = e.detail.value;
  }
  ir_a_sala(){
    
    if(typeof(this.salaSesion.codigo) == undefined ){
      alert("ya tiene una Sala creada");
      return 
    }
    else{
      if(this.sala.usuarios.length == 0){
        
        this.sala.cantJugadores = this.service.cantJugadores.value;
        this.sala.codigo = this.home.sala.codigo;

        this.jugador.nombre = this.nombre;
        this.jugador.codigo = this.sala.codigo;
        this.crearJugador(this.jugador);
        
      }
      else{
        this.sala.usuarios.forEach((val)=>{
          this.sala.cantJugadores = this.service.salaSubject.value.cantJugadores;
          this.sala.codigo = this.home.sala.codigo;

          this.jugador.nombre = this.nombre;
          this.jugador.codigo = this.sala.codigo;
          if(val.nombre != this.jugador.nombre){
            this.crearJugador(this.jugador);
  
          }
        });
      }
      if(this.validacioSala()){
        
        if((this.salaSesion.codigo == null? "":this.salaSesion.codigo) =="" || (this.salaSesion.nombre == null? "":this.salaSesion.nombre) ==""){
             
          this.crearSala(this.sala);
          this.home.irSala();
          this.home.cerrarModal();
        }
        else{
          this.jugador.nombre = this.salaSesion.nombre;
          
          this.sala.usuarios.push(this.jugador);
          this.sala.codigo = this.salaSesion.codigo;
          this.sala.puntoGanador = this.salaSesion.puntoGanador;
          this.sala.cantJugadores = this.salaSesion.cantJugadores;
          this.service.salaSubject.next(this.sala);
          this.service.Sesion.next(true);
          this.cerrar();
          
          this.router.navigateByUrl('salas/'+this.salaSesion.codigo);
        }
        
        
      }
      else{
        alert('Faltan campos');
      }
    }
    
  }
  validacioSala():Boolean{
   
    var validacionCant:Boolean = false;
    var validacionPuntos:Boolean = false;
    var validacionNombre:Boolean = false;
    var validacionLink:Boolean = false;
    var validacion:Boolean = false;

    if(this.sala.cantJugadores !=''){
      validacionCant = true;
    }
    else{
      validacionCant = false;
    }
    if(this.sala.codigo != ''){
      validacionLink = true;
    }
    else{
      validacionLink = false;
    }
    if((this.nombre == undefined ? "":this.nombre) != ""){
      validacionNombre =true;
    }
    else{
      validacionNombre = false;
    }
    if(this.sala.puntoGanador != ''){
      validacionPuntos =true;
    }
    else{
      validacionPuntos = false;
    }
    if(validacionCant && validacionLink && validacionNombre && validacionPuntos){
      validacion = true;
    }
    else{
      validacion = false;
    }
    return validacion;
  }
  getSala(){
    
    this.storage.get('sala').then((val)=>{
      if(val != null){
        this.salaSesion.codigo = val;
      }
    }).then(()=>{
      this.storage.get('jugador').then((val)=>{
        if(val != null){
          this.salaSesion.nombre = val;
          
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
            }
          }).then(()=>{
            this.storage.get('puntoGanador').then((val)=>{
              if(val!=null){
                this.salaSesion.puntoGanador = val;
              }
            })
          })
        })
      });
    });
  }
  crearJugador(jugador){
    console.log(this.jugador, ' jugador creando');
     this.service.crearJugador(jugador).subscribe((res)=>{
      // this.sala.usuarios.push(res.data);
      this.next = true;
     });
  }   
  crearSala(sala){

    this.service.CreateSala(sala).subscribe((res)=>{
      if(res.data.codigo.length > 0){
        this.service.creandoSala.next(true);
        this.service.creandoSala.next(true);
        this.sala = res.data;
        // this.sala.usuarios = [];
        // this.sala.usuarios.push(this.service.jugador.value);//////////////////
      }
    });
  }
  GenerateCodigo(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min).toString();
  }
}
