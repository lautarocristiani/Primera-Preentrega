import fs from "fs";
import { Router } from "express";

const path = "products.json";
const products = JSON.parse(fs.readFileSync(path, "utf-8"));

const router = Router();

router.get('/', (req, res)=>{
    let limit = req.query.limit;
    let productosMostrar = [];
    if (!limit) return res.json(products);
    for (let i = 0; i < limit; i++) {
        productosMostrar.push(products[i])
    }
    res.json(productosMostrar);
})

router.get('/:id', (req, res)=>{
    let id = req.params.id;
    let producto = products.find( p => p.id == id);
    if (!producto) return res.status(400).send({error: "No se encuentra el producto"});
    res.status(200).send({producto});
})

router.post('/', (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    if (products.find((p) => p.code == code) || title == null || description == null || Number.isNaN(price) || Number.isNaN(stock) || category == null) {
        res.status(400).send("Ingrese correctamente los valores")
    } else {
        let id;
        if (!thumbnails) thumbnails = "Sin ruta";
        if (!status) status = true;
        products.length == 0 ? id = 1 : id = products[products.length-1].id + 1;
        products.push({id, title, description, code, price, status, stock, category, thumbnails});
        fs.writeFileSync(path, JSON.stringify(products));
        res.status(201).json("Producto creado con éxito");
    }
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let {title, description, code, price, status, stock, category, thumbnails} = req.body;
    if (products.find((p) => p.code == code)) {
        res.status(400).send("Ingrese correctamente el code del Producto")
    } else {
        products.forEach(p => {
            if (p.id == id) {
                if (title) p.title = title;
                if (description) p.description = description;
                if (code) p.code = code;
                if (price) p.price = price;
                if (status) p.status = status;
                if (stock) p.stock = stock;
                if (category) p.category = category;
                if (thumbnails) p.thumbnails = thumbnails;
            }
        });
        fs.writeFileSync(path, JSON.stringify(products));
        res.status(200).json("Producto actualizado con éxito");
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    if (products.find((p) => p.id == id)) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products.splice(i, 1)
                fs.writeFileSync(path, JSON.stringify(products));
                res.status(200).json("Producto eliminado con éxito");
            }
        }
    } else {
        res.status(400).send("Ingrese correctamente el ID")
    }
})

export default router;

// class ProductManager{

//     constructor(products, path){
//         this.products = products;
//         this.path = "./" +path +".txt";
//         fs.writeFileSync(this.path, JSON.stringify(this.products));
//     }

//     getProducts() {
//         return JSON.parse(fs.readFileSync(this.path, "utf-8"));
//     }

//     addProducts(title, description, price, thumbail, code, stock){
//         if (this.products.find((p) => p.code == code) || title == null || description == null || Number.isNaN(price) || thumbail == null || Number.isNaN(stock)) {
//             console.error("Se ha producido un error");
//         } else {
//             let id;
//             this.products.length == 0 ? id = 1 : id = this.products[this.products.length-1].id + 1;
//             this.products.push({title, description, price, thumbail, code, stock, id});
//             fs.writeFileSync(this.path, JSON.stringify(this.products));
//         }
//     }

//     getProductById(id){
//         this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//         return this.products.find((p) => p.id == id);
//     }

//     updateProduct(idActualizar, title, description, price, thumbail, code, stock){
//         this.products.find((p) => {
//             if (p.id == idActualizar) {
//                 p.title = title;
//                 p.description = description;
//                 p.price = price;
//                 p.thumbail = thumbail;
//                 p.code = code;
//                 p.stock = stock;
//                 fs.writeFileSync(this.path, JSON.stringify(this.products));
//             } else {
//                 console.log("No se ha encontrado un producto que concida con el ID " +idActualizar);
//             }
//         })
//     }

//     deleteProduct(idEliminar){
//         this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
//         let eliminado = 0;
//         for (let i = 0; i < this.products.length; i++) {
//             if (this.products[i].id == idEliminar) {
//                 this.products.splice(i, 1);
//                 fs.writeFileSync(this.path, JSON.stringify(this.products));
//                 console.log("Producto eliminado con éxito");
//                 eliminado++
//             }
//         }
//         if (eliminado == 0) {
//             console.log("No se ha encontrado el producto");
//         }
//     }
// }