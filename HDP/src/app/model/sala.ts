import { Jugador } from './jugador';

export class Sala {
    _id:string;
    nombre:string;
    codigo:string;
    cantJugadores:string;
    puntoGanador:string;
    estado:number;
    estadoDesc:string;
    usuarios:Jugador[]=[];
}
export class salaSesion{
    _id:string;
    nombre:string;
    codigo:string;
    cantJugadores:string;
    puntoGanador:string;
    estado:number;
    estadoDesc:string;
    usuarios:Jugador[]=[];
  };