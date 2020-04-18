import { Sala } from './sala';
import { Jugador } from './jugador';

export class ResponseSala{
    ok:Boolean;
    message:string;
    data:Sala;
} 
export class ResponseListSalas{
    ok:Boolean;
    message:string;
    data:[]=[];
}
export class ResponseJugador{
    ok:Boolean;
    message:string;
    data:Jugador;
}
export class ResponseListJugadores{
    ok:Boolean;
    message:string;
    data:[]=[];
}
export class ResponseInvitado{
    ok:Boolean;
    message:string;
    data:Invitado;
    cant:string;
    puntos:string;
    public constructor(){
        this.ok = null;
        this.message = null;
        this.data = null;

    }
} 
export class Invitado{
    _id:string;
    nombre:string;
    codigo:string;
    creadorSala:Boolean;
    genero:string;
    cantJugadores:string;
    puntoGanador:string;
}