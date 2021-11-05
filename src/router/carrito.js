const { Router } = require('express');

const routerCarrito = Router();


const Contcar = require("../../contenedor/contcar.js")

const car = new Contcar('./db/carts.txt')

//////////////////////////// GET/POST/DELETE/////////////////////////




routerCarrito.get('/', async (req, res) => {

    const CAR = await car.listarAll()
    res.send ( CAR);

    
})

 
routerCarrito.post('/', async (req, res) => {
    const CAR = await car.listarAll()

    const  Unew = req.body
   
    console.log(Unew)
    CAR.push(Unew)         // enpuja a la ultima posicion del array , el contenido del body, que pasa a la palabra.
    car.guardar(Unew)

    res.send({ agregada: Unew, posicion: CAR.length - 1 })
})


routerCarrito.delete('/:id',async (req, res) => {
    const CAR = await car.listarAll()
    const { id } = req.params
   
    const newCar = CAR.find(e => e.id == id);
    car.borrar(id);
    res.send({ borrada: newCar })
})



routerCarrito.get('/:id/productos', async (req, res) => {

    const CAR = await car.listarAll()
    const { id } = req.params

    const PRODUCTOS=CAR.find(e => e.id == id).payload.items;
    res.send ( PRODUCTOS);

    
})


routerCarrito.post('/:id/productos', async (req, res) => {

    const CAR = await car.listarAll()

    const  proIng =req.body  
    const { id } = req.params;
    let CarB=CAR.find(e => e.id == id);
    let PRODUCTOS=CarB.payload.items;
    PRODUCTOS.push(proIng)
    CarB.payload.items=PRODUCTOS;
    car.actualizar(CarB)
    res.send ( CarB);

    
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {

    const CAR = await car.listarAll()

    const  proIng =req.body  
    const { id ,id_prod} = req.params;
     
    let CarB=CAR.find(e => e.id == id);
    
    let PRODUCTOS=CarB.payload.items;
    PRODUCTOS=PRODUCTOS.filter( e => e.productId != id_prod)
    CarB.payload.items=PRODUCTOS;
    car.actualizar(CarB)
    res.send ( CarB);

 
})


 


exports.routerCarrito = routerCarrito; 
