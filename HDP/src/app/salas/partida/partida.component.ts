import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { Jugador } from 'src/app/model/jugador';
import { ServiceService } from 'src/app/service/service.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Sala } from 'src/app/model/sala';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.scss'],
})
export class PartidaComponent implements OnInit {

  message = '';
  messages = [];
  currentUser = '';
  sala:Sala = new Sala();
  usuario:Jugador = new Jugador();
  jugadores:Jugador[] = new Array<Jugador>();
 
  constructor(private socket: Socket, private toastCtrl: ToastController, private service:ServiceService,
    private storage:Storage, private router:Router) {
    if(this.service.jugador.value){
      this.usuario = this.service.jugador.value;
      // this.iniciarSocket();
    }
    // else{
      this.storage.get("ID").then((val)=>{
        if(!val){
          this.router.navigateByUrl('inicio');
        }else{
          this.usuario._id = val;
        }
      }).then(()=>{
        this.storage.get('jugador').then((val)=>{
          this.usuario.nombre = val;
        }).then(()=>{
          this.storage.get('puntoGanador').then((val)=>{
            this.sala.puntoGanador = val;
          }).then(()=>{
          this.storage.get('genero').then((val)=>{
            this.usuario.genero = val;
          }).then(()=>{
            this.storage.get('sala').then((val)=>{
              this.usuario.codigo = val;
              this.sala.codigo = val;
              this.iniciarSocket();
            });
          })
        })
      })
      });
    }
    
  //  }
 
  ngOnInit() {
    
  }
 
  sendMessage() {
    this.socket.emit('send-message', { text: this.message, sala:this.usuario.codigo});
    this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 1300
    });
    toast.present();
  }

  iniciarSocket(){
    this.socket.connect();
 
              let name = this.usuario.nombre;
              this.currentUser = name;
              
              this.socket.emit('set-name', this.usuario);
          
              this.socket.fromEvent('users-changed').subscribe(data => {
                let user = data['user'];
                console.log(data);
                if (data['event'] === 'se fue') {

                  this.jugadores = data['jugadores'].filter(x=>x.codigo == this.usuario.codigo);
                  if(user.codigo == this.usuario.codigo){
                    this.showToast('Se fue: ' + user.nombre);
                  }
                  
                } 
                else {
                  if(user.codigo == this.usuario.codigo){
                    this.showToast('Se unió: ' + user.nombre);
                  }
                  
                  this.jugadores = data['jugadores'].filter(x=>x.codigo == this.usuario.codigo);
                  console.log(this.jugadores,' jugadores');
                }
              });
          
              this.socket.fromEvent('message').subscribe((message:any) => {
                console.log(message.createdAt,' fecha');
                this.messages.push(message);
              });
  }

}
