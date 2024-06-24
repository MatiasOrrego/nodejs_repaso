//Instanciamos el modulo express
import express from 'express';
import {dataBase} from './src/db.js';

//Creamos el servidor
const app = express();
app.use(express.json());

//Creamos las Rutas
//PAGINA PRINCIPAL 
app.get("/", (req, res) =>{
    res.send ("PAGINA PRINCIPAL")
})

//Obtener los usuarios
app.get("/users", (req, res) => {
    res.json(dataBase);
})
//Obtener un usuario por Id
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = dataBase.find((user) => user.id == id)
    res.json(user);
})

//Crear Usuarios
app.post("/users", (req, res) => {
    const {id, user} = req.body;

    const newUser= dataBase.push({id, user});  

    res.json({newUser});
})

// Editar Usuarios
app.put("./users/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const user = req.body

    const userFound = dataBase.find((user) => user.id == id)

    userFound.user = user;

    res.json({mensaje: "Usuario acrualizado"})
})

//elimiinar Usuario
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userFound = dataBase.find((user) => user.id == id)

    const index = dataBase.indexOf(userFound);
    dataBase.splice(index, 1);

    res.json({mensaje: "Usuario eliminado"})
})

//Ponemos en escucha el servidor
app.listen(3000, () => console.log("servidor iniciado"))

