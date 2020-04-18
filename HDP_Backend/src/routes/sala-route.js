const Sala = require('../controller/sala-controller');
module.exports = (router) =>{
    router.post("/add-sala",Sala.CreateSala);
    // router.get("/get-empleado/:id",Empleados.GetEmpleado);
    router.get("/get-sala/:id",Sala.getSalaXCodigo);
    // router.post("/edit-empleado",Empleados.EditarEmpleado);
    // router.get("/delete-empleado/:id",Empleados.EliminarEmpleado);
}