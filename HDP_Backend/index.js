'use strict'
const express = require('express'),http = require('http');
const app = express();
 const JugadoresRoutes = require('./src/routes/jugador-route');
 const SalasRoutes = require('./src/routes/sala-route');
const ejs = require('ejs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./src/database');
// const server = http.createServer(app);
const sockeIo = require('socket.io');
const socketController = require('./src/controller/socket-controller');

var usuarios = [];
var usuariosPorSala = [];


//setings
app.set('port', process.env.PORT || 3003);

const router = express.Router();
app.use(
    cors()
  );
const bodyParserJSON = bodyParser.json();
const bodyParserEncode = bodyParser.urlencoded({extended:true});
app.use(bodyParserJSON);
app.use(bodyParserEncode);

app.engine('html', ejs.renderFile);

app.set('views', path.join(__dirname,'src/views'));

app.set('view engine', 'html');
app.use('/api',router);




JugadoresRoutes(router);
// authRoutes(router,cors());
SalasRoutes(router);
// productoRoutes(router);
// clientesRoutes(router);
// entradasRoutes(router,cors());

router.get('/',(req,res)=>{
    res.render('index',{req});
});
router.get('/home',(req,res)=>{
    res.render('index',{req});
});
app.use(router);

app.use(express.static(path.join(__dirname,'src/views')));
//server init
const server = app.listen(app.get('port'),()=>{
    console.log('server en puerto ',app.get('port'));
})
// Sockets
socketController.CleanSocket();
const io = sockeIo(server);

io.on('connection', (socket) => {
  var _user = {};
  
  socketController.SocketEntry(socket);

    socket.on('disconnect', function(){
      console.log(' desconect user ');
      socketController.RemoveSocket();
      if(usuarios.length > 0){
        for (let i = 0; i < usuarios.length; i++) {
          if(usuarios[i]._id == _user._id){
            usuarios.splice(i,1);
            usuariosPorSala = usuarios.filter(x=>x.codigo == _user.codigo);
            console.log('hola3', usuariosPorSala, ' id ',_user._id);
            io.emit('users-changed', {user: _user, event: 'se fue',jugadores:usuarios});
            return
          }
          
        }
      }
      
      
        
    });
   
    socket.on('set-name', (user) => {
      
      socket.username = user.name;
      _user = user;
      if(usuarios.length > 0){
        

         
           
           
            usuarios.push(user);
             
            
            usuariosPorSala = usuarios.filter(x=>x.codigo == user.codigo);
            console.log('hola2',usuariosPorSala);

            io.emit('users-changed', {user: user, event: 'se unió',jugadores:usuarios});  
            
            

            
          
          
        
      }
      else{
        
        usuarios.push(user);
        usuariosPorSala = usuarios.filter(x=>x.codigo == user.codigo);
        console.log('hola1',usuarios);
        io.emit('users-changed', {user: user, event: 'se unió',jugadores:usuarios});  
      }
      
        
    });
    
    socket.on('send-message', (message) => {
        console.log(message.text, ' sockets',message.sala);

      io.emit('message', {msg: message.text, user: _user.nombre, createdAt: new Date(),sala:message.sala});    
    });
  });
  