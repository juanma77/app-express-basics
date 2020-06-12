// Este es un estándar de facto para utilizar express e inicializar el servidor
const express = require('express');
const app = express();

// Ruta por defecto para que no nos muestre error
app.get('/', ( req, res ) =>{
    res.send('Hello World!');
});

// Rutas personalizadas
app.get('/about', ( req, res ) =>{
    res.send('About Us');
});

app.get('/contact', ( req, res ) =>{
    res.send('Contact');
});

// Indicamos el puerto en el cual estará escuchando nuestra aplicación 
app.listen(3800, () =>{
    console.log('Server running at port 3800!');
});

