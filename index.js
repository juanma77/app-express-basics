// Este es un estándar de facto para utilizar express e inicializar el servidor
const express = require('express');
const app = express();

// Módulo para utilizar middleware y no crearlo desde cero
const morgan = require('morgan');

// Método que sirve de middleware para ver que ruta solicitó el usuario
const logger = ( req, res, next ) => {
    console.log(`URL received: ${ req.protocol }:// ${ req.get('host') } ${ req.originalUrl }`);
    next();
}

// Siempre que utilizamos "app.use" quiere decir que estamos utilizando un middleware; esto es para que express pueda entender el formato json
app.use(express.json());

// Para que se ejecute el método de middleware "logger" antes de que el usuario obtenga la ruta que ha solicitado
app.use(logger);

// Esto hace la misma función que el método logger pero usando el middleware de morgan
app.use(morgan('dev'));

// Esto se ejecutará para todas las rutas "/users"; debemos poner el "next()" para que continúe con la ejecución del código que sigue, es decir, para poder ir a las otras rutas 
app.all('/users', ( req, res, next ) =>{
    console.log('This is the all() method');
    next(); 
});

// Ruta por defecto para que no nos muestre error
/*app.get('/', ( req, res ) =>{
    res.send('This is a GET request');
});*/

app.get('/users', ( req, res ) =>{
    res.json({
        userName: 'John',
        lastname: 'Doe'
    });
});

// Rutas personalizadas
app.post('/about', ( req, res ) =>{
    res.send('This is a POST request');
});

app.post('/users', ( req, res ) =>{
    // El req.body es para ver los datos que nos están enviando desde el navegador, ya sea por medio de un formulario u otro elemento en el front-end
    console.log(req.body);
    res.send('This is a POST request'); 
});

app.post('/users/:id', ( req, res ) =>{
    console.log(req.body);
    // El req.params es para ver el dato que se pasa como parámetro, en este caso es un id de un usuario
    console.log(req.params);
    res.send('This is a POST request with params');
});

app.put('/contact', ( req, res ) =>{
    res.send('This is a PUT request');
});

app.put('/contact/:id', ( req, res ) =>{
    console.log(req.body);
    res.send(`This is a PUT request with params and the User with Id ${req.params.id} is now updated!`);
});

app.delete('/delete/:id', ( req, res ) =>{
    res.send(`This is a DELETE request and the User with ID ${req.params.id} is now deleted!`);
});

// Para servir archivos estáticos desde la carpeta de nuesto proyecto llamada public; debemos de tener comenada la ruta por defecto (app.get( '/' )...)
app.use(express.static('public'));

// Indicamos el puerto en el cual estará escuchando nuestra aplicación 
app.listen(3800, () =>{
    console.log('Server running at port 3800!');
});

