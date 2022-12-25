import fs from "fs";
import { Router } from "express";

const path = "carts.json";
const carts = JSON.parse(fs.readFileSync(path, "utf-8"));

const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

const router = Router();

router.get('/:cid', (req, res) =>{
    let id = req.params.cid;
    let carrito = carts.find(c => c.id == id);
    console.log(carrito);
    if (!carrito) return res.status(400).send({error: "No se encuentra el producto"});
    res.status(200).json({productos : carrito.products})
})

router.post('/', (req, res) =>{
    let id;
    carts.length == 0 ? id = 1 : id = carts[carts.length-1].id + 1;
    carts.push({id:id, products:[]})
    fs.writeFileSync(path, JSON.stringify(carts));
    res.status(201).json("Carrito creado con éxito");
})

router.post('/:cid/product/:pid', (req, res) =>{
    let cid = req.params.cid;
    let pid = req.params.pid;
    console.log(cid, pid);
    let carrito = carts.find(c => c.id == cid);
    console.log(carrito.products);
    if (carrito || products.find(p => p.id == pid)) {
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id == cid) {
                console.log(carts[i].products);
                if (!carts[i].products) {
                    carts[i].products.push({product:pid, quantity:1})
                    console.log(carts[i].products);
                } else {
                    carts[i].products[1]++;
                }

            }
        }
    } else {
        res.status(400).send("Ingrese correctamente los valores")
    }
})

export default router;