//Crear un servidor con Express en el puerto 3000.

const express = require('express');
const app = express();

app.listen(3000, () => console.log("Servidor habilitado http://localhost:3000"));

//Definir la carpeta “assets” como carpeta pública del servidor.

app.use(express.static(`${__dirname}/assets/`));

//Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.

let listado = {
    usuarios: ["Juan", "Jocelyn", "Astrid", "María", "Ignacia", "Javier", "Brian"]
};

app.get('/abracadabra/usuarios/', (req, res) => {
    res.json(listado)
});

//Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” 
//existe en el arreglo de nombres creado en el servidor.

//En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    let usuario = req.params.usuario;
    if(listado.usuarios.some(item => item == usuario)) {
        next();
    } else {
        res.send("<img src='/who.jpeg'>")
    }
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

//Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria.

//En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.

app.get('/abracadabra/conejo/:n', (req, res) => {
    let random = Math.floor(Math.random() * 4) + 1;
    if(random == req.params.n) {
        res.send("<img src='/conejito.jpg'>");
    } else {
        res.send("<img src='/voldemort.jpg'>");
    }
});

//Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor

app.get('*', (req, res) => {
    res.send("Esta página no existe...");
});