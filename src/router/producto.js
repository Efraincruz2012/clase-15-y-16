const { Router, application } = require('express');

const routerProducto = Router();
const Contenedor = require("../../contenedor/contpro.js")

const Pro = new Contenedor('./db/products.txt')


//////////////////////////// GET/POST/PUT/DELETE/////////////////////////

 ;


 routerProducto.use('/',function(req,res,next){
   
    
    let admin=req.query.admin
 
   if(req.method!="GET")
   { 
            if(admin==1)
            {
                next()

            }
            else 
            {
                res.status(500).send("no tiene permiso de administrador")
            }
 
   }
 else
     next()

 })
routerProducto.get('/', async (req, res) => {
    const PROD = await Pro.listarAll()
    res.send ( PROD);
})

routerProducto.get('/:id', async (req, res) => {
    const PROD = await Pro.listarAll()

   const { id } = req.params //le da la posicion de los objetos del array
  
    res.send({ buscada: PROD.find(e => e.id == id)})
});

routerProducto.post('/',async (req, res) => {
    const PROD = await Pro.listarAll()

    const  Unew = req.body
    PROD.push(Unew)         // enpuja a la ultima posicion del array , el contenido del body, que pasa a la palabra.
    Pro.guardar(Unew)

    res.send({ agregada: Unew, posicion: PROD.length - 1 })
})

routerProducto.put('/:id', async (req, res) => {
    const PROD = await Pro.listarAll()
 try{
   
    const  ProAct =req.body // recibe el objeto generado en el body
    const { id } = req.params;
    const proAnt = PROD.find(e => e.id == id)
    Pro.actualizar(ProAct)
    res.send({ actualizada: ProAct, anterior: proAnt })
    }
    catch
    {
        res.send("Error")

    }
})

routerProducto.delete('/:id', async (req, res) => {
 
    const PROD = await Pro.listarAll()
    const { id } = req.params
   
    const newPro = PROD.find(e => e.id == id);
    Pro.borrar(id);
    res.send({ borrada: newPro })
})


exports.routerProducto = routerProducto; 
