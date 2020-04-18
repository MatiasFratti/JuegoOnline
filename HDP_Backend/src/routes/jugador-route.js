const Jugador = require('../controller/jugador-controller');
module.exports = (router) =>{
    router.post("/add-jugador",Jugador.createJugador);
    // router.get("/get-empleado/:id",Empleados.GetEmpleado);
    router.get("/getAll-jugadores/:id",Jugador.getAllJugadoresXSala);
    router.post("/add-invitado",Jugador.CreateInvitado);
    // router.get("/delete-empleado/:id",Empleados.EliminarEmpleado);
}