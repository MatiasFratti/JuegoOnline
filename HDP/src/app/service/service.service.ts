import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sala, salaSesion } from '../model/sala';
import { SalasPage } from '../salas/salas.page';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {ResponseSala, ResponseListSalas,ResponseJugador,ResponseListJugadores, ResponseInvitado } from '../model/response';
import { Jugador } from '../model/jugador';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
//Aca se consume la data
export class ServiceService {

  // entrypoitn:string ='http://localhost:3003';
  public sala = new Sala();
  public Sesion:BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  jugador:BehaviorSubject<Jugador>= new BehaviorSubject<Jugador>(null);
  jugadores:BehaviorSubject<Jugador[]>= new BehaviorSubject<Jugador[]>(null);
  public salaSubject:BehaviorSubject<Sala> = new BehaviorSubject<Sala>(this.sala);
  creandoSala:BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  IdUsuario:BehaviorSubject<string> = new BehaviorSubject<string>(null);
  cantJugadores:BehaviorSubject<string> = new BehaviorSubject<string>(null);


  constructor(private http:HttpClient, public storage:Storage) { 
    
  }

  // Region de Sala
  public CreateSala(sala){
    return this.http.post(`${environment.SERVER_URL}/api/add-sala`,sala).pipe(tap(
      (res:ResponseSala)=>{
        if(res.ok){
          
          console.log('Sala creada: ', res.data);
          this.storage.set("cantJugadores",res.data.cantJugadores.toString());
          this.storage.set("puntoGanador",res.data.puntoGanador.toString());
          this.salaSubject.next(res.data);
          this.Sesion.next(true);
        }
        else{
          console.log(res.message);
        } 
      }  
    ))
  }
  public getSalaXcodigo(codigo){
    
    return this.http.get(`${environment.SERVER_URL}/api/get-sala/${codigo}`).pipe(tap(
      (res:ResponseSala)=>{
        if(res.ok){
          if(res.data[0].codigo == codigo){
            console.log("HAY SALA");
          }
        }else{
          console.log("NO HAY SALA");
        }
    })) 
  }
  //Fin de Region Sala
//=========================================================================================\\
  //Region Jugador
  crearJugador(jugador){
    return this.http.post(`${environment.SERVER_URL}/api/add-jugador`,jugador).pipe(tap(
      (res:ResponseJugador)=>{
        if(res.ok){
          console.log('Usuario creado: ', res.data);
          this.storage.set("ID",res.data._id);
          this.storage.set("jugador",res.data.nombre);
          this.storage.set("sala",res.data.codigo);
          this.storage.set("genero",res.data.genero);
          this.jugador.next(res.data);
          this.IdUsuario.next(res.data._id);
          
        }
        else{
          console.log('ERROR! ',res.message);
        } 
      }  
    ))
  }
  GetAllJugadorSala(codigo){
    return this.http.get(`${environment.SERVER_URL}/api/getAll-jugadores/${codigo}`).pipe(tap
      ((res:ResponseListJugadores)=>{
        if(res.ok){
          this.jugadores.next(res.data);
        }
        else{
          console.log("Error del servidor");
        }
    }))
  }
  CrearInvitado(invitado){
    return this.http.post(`${environment.SERVER_URL}/api/add-invitado`,invitado).pipe(tap(
      (res:ResponseInvitado)=>{
        if(res.ok){
          this.storage.set("ID",res.data._id);
          this.storage.set("jugador",res.data.nombre);
          this.storage.set("sala",res.data.codigo);
          this.storage.set("genero",res.data.genero);
          this.storage.set("cantJugadores",res.cant.toString());
          this.storage.set("puntoGanador",res.puntos.toString());
          this.Sesion.next(true);
          this.jugador.next(res.data);
        }
    }))
  }
  
}
