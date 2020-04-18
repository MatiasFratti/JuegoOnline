const Jugador = require('../models/jugador'); 
const Sala = require('../models/sala');
const Response = require('../models/response');
const ResponseList = require('../models/responseList');

var error = "";

exports.createJugador = (req, res, next)=>{
    
    const new_jugador = {
       
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        genero: req.body.genero
    }
    
    Jugador.create(new_jugador, (err,jugador)=>{
        console.log(jugador);
        if(err){
            console.log(err);
            return res.status(500).send('server error');
        }
        else{
            Response.ok = true;
            Response.message = "Creado exitosamente";
            Response.data = jugador
            return res.send(Response);
        }
        
    });
    
}
exports.getAllJugadoresXSala = (req,resp,next) =>{
    var jugador = Object;
    

   if(typeof(req.body.id) != undefined){
    console.log(req.params.id, " idcomercio");
         Jugador.find({codigo:req.params.id},(err,res)=>{
            if(err){
                Response.message = "No se pudo obtener los jugadores";
                Response.ok = false;
                Response.data = {};
                console.log(err);
                return resp.send(Response);
            } 
            else{
                console.log(res, " idcomercio2");
                ResponseList.message = "Exito";
                ResponseList.ok = true;
                ResponseList.data = res;
                return resp.send(ResponseList);
            }
            
            
        })
    }
    else{
        next();
    }
    
}
exports.CreateInvitado = (req,res,next)=>{
    var errorSala = false;
    var capacidad = 0;
    var salaID = "";
    var JugadorInvitado = {
        codigo:req.body.codigo,
        nombre:req.body.nombre,
        genero:req.body
    }
    var SalaInvitado = {
        cantJugadores:0,
        puntoGanador:0
    }
    JugadorInvitado = req.body;
    Sala.findOne({codigo:JugadorInvitado.codigo},(err,sala)=>{
        if(err){
            errorSala = true;
            Response.ok = false;
            Response.message = err;
            Response.data = {};
            res.send(Response);
        }
        else{
            console.log(sala, ' SALAAAA')
            SalaInvitado.cantJugadores = sala.cantJugadores;
            SalaInvitado.puntoGanador = sala.puntoGanador;
            salaID = sala._id;
            capacidad = sala.cantJugadores;
            console.log('capacidad -- ', capacidad, " salaid -- ",salaID);
            Jugador.find({codigo:JugadorInvitado.codigo},(err,jugadores)=>{
                if(err){
                    errorSala = true;
                    Response.ok = false;
                    Response.message = err;
                    Response.data = {};
                    res.send(Response);
                }
                else{
                    console.log('jugadores -- ', jugadores);
                    
                    if((jugadores.length + 1) == capacidad){
                        Jugador.create(JugadorInvitado,(err,_jugador)=>{
                            if(err){
                                errorSala = true;
                                Response.ok = false;
                                Response.message = err;
                                Response.data = {};
                                res.send(Response);
                            }
                            else{
                                console.log('jugador creado -- ', jugadores);
                                Response.data = _jugador;
                        
                                Response.ok = true;
                                Response.message = "Jugador Creado ";
                                // Estados de Sala: 0 = "Cerrada"; 1 = "Abierta"; 2 = "Completa"
                                Sala.findByIdAndUpdate({_id:salaID},{estado:2},{new:true},(err,_sala)=>{
                                    if(err){
                                        errorSala = true;
                                        Response.ok = false;
                                        Response.message = err;
                                        Response.data = {};
                                        res.send(Response);
                                    }
                                    else{
                                       
                                        Response.cant = _sala.cantJugadores;
                                        Response.puntos = _sala.puntoGanador;
                                        Response.ok = true;
                                        Response.message = "full";
                                        res.send(Response);
                                    }
                                })

                            }
                        })
                        
                    }
                    else{
                        if(jugadores.length < capacidad){
                            Jugador.create(JugadorInvitado,(err,new_jugador)=>{
                                if(err){
                                    errorSala = true;
                                    Response.ok = false;
                                    Response.message = err;
                                    Response.data = {};
                                    res.send(Response);
                                }
                                else{
                                    console.log('jugador creado pero no ultimo -- ', new_jugador);
                                    Response.data = new_jugador;
                                    
                                    Response.cant = SalaInvitado.cantJugadores;
                                    Response.puntos = SalaInvitado.puntoGanador;
                                    Response.ok = true;
                                    Response.message = "Jugador Creado";
                                    res.send(Response);
                                }
                            })
                        }
                        
                    }
                }
                
            })
        }

    })
}
// exports.removeCliente = async (req, res, next) =>{
//     console.log(req.params.id,' id remove');
//     var cliente = null;
//     await Cliente.deleteOne({_id:req.params.id},(err,res)=>{
        
//         if(err) cliente = 'No se pudo borra';
//         else{
//             console.log(res,' respuesta satisfactoria');
//           cliente = res;
//         }
//     })
//     return res.send(cliente);
// }