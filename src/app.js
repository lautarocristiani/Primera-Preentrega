import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

let instancia = new ProductManager([], "productos");

instancia.addProducts("Producto Número 1", "Este es el producto prueba", 100, "Sin imagen", "abc1", 25);
instancia.addProducts("Producto Número 2", "Este es el producto prueba", 200, "Sin imagen", "abc2", 13);
instancia.addProducts("Producto Número 3", "Este es el producto prueba", 300, "Sin imagen", "abc3", 22);
instancia.addProducts("Producto Número 4", "Este es el producto prueba", 400, "Sin imagen", "abc4", 42);
instancia.addProducts("Producto Número 5", "Este es el producto prueba", 500, "Sin imagen", "abc5", 35);
instancia.addProducts("Producto Número 6", "Este es el producto prueba", 600, "Sin imagen", "abc6", 7);
instancia.addProducts("Producto Número 7", "Este es el producto prueba", 700, "Sin imagen", "abc7", 33);
instancia.addProducts("Producto Número 8", "Este es el producto prueba", 800, "Sin imagen", "abc8", 11);
instancia.addProducts("Producto Número 9", "Este es el producto prueba", 900, "Sin imagen", "abc9", 44);
instancia.addProducts("Producto Número 10", "Este es el producto prueba", 1000, "Sin imagen", "abc10", 31);

app.use(express.urlencoded({extended:true}));

app.get('/products', (req, res)=>{
    let limit = req.query.limit;
    let productos = instancia.getProducts();
    let productosMostrar = [];
    if (!limit) return res.send(instancia.getProducts());
    for (let i = 0; i < limit; i++) {
        productosMostrar.push(productos[i])
    }
    res.send(productosMostrar);
})

app.get('/products/:id', (req, res)=>{
    let id = req.params.id;
    let producto = instancia.getProductById(id);
    console.log(producto);
    if (!producto) return res.send({error: "No se encuentra el producto"});
    res.send({producto});
})

app.listen(8080, () => console.log("Programa ejecutandose"))