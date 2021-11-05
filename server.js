const express = require('express')

const { routerProducto } = require("./src/router/producto")
 
const { routerCarrito } = require("./src/router/carrito")
 
const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

/* ------------------------------------------------------ */
/* Cargo los routers */

app.use('/api/productos', routerProducto)
 
app.use('/api/carrito', routerCarrito)
 
/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))