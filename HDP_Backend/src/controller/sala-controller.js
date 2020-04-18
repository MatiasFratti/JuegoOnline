const Sala = require('../models/sala');
const Response = require('../models/response');


exports.CreateSala =(req,res,next)=> {
// Estados de Sala: 0 = "Cerrada"; 1 = "Abierta"; 2 = "Completa"
    const newSala = {
        codigo:req.body.codigo,
        cantJugadores:req.body.cantJugadores,
        puntoGanador:req.body.puntoGanador,
        estado:1,
        estadoDesc:"Abierta"
        
    }
    if(newSala){
        Sala.create(newSala, (err,sala)=>{
            console.log(newSala, ' s', sala);
            if(err){
                console.log(err);
                return res.status(500).send('server error');
            }
            else{
                Response.ok = true;
                Response.message = "Creado exitosamente";
                Response.data = sala
                return res.send(Response);
            }
           
        });
    }
}

exports.getSalaXCodigo = (req,res,next)=>{
    console.log(req.params.id);
    if(req.body){
        Sala.find({codigo:req.params.id},(err,sala)=>{
            if(err){
                Response.message = "No se pudo obtener la sala";
                Response.ok = false;
                Response.data = {};
                console.log(err);
                return res.send(Response);
            }
            else{
                Response.message = "Exito";
                Response.ok = true;
                Response.data = sala;
                return res.send(Response);
            }
        })
    }
}