import fs from "fs";

class ProductManager{

    constructor(products, path){
        this.products = products;
        this.path = "./" +path +".txt";
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }

    addProducts(title, description, price, thumbail, code, stock){
        if (this.products.find((p) => p.code == code) || title == null || description == null || Number.isNaN(price) || thumbail == null || Number.isNaN(stock)) {
            console.error("Se ha producido un error");
        } else {
            let id;
            this.products.length == 0 ? id = 1 : id = this.products[this.products.length-1].id + 1;
            this.products.push({title, description, price, thumbail, code, stock, id});
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    getProductById(id){
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        return this.products.find((p) => p.id == id);
    }

    updateProduct(idActualizar, title, description, price, thumbail, code, stock){
        this.products.find((p) => {
            if (p.id == idActualizar) {
                p.title = title;
                p.description = description;
                p.price = price;
                p.thumbail = thumbail;
                p.code = code;
                p.stock = stock;
                fs.writeFileSync(this.path, JSON.stringify(this.products));
            } else {
                console.log("No se ha encontrado un producto que concida con el ID " +idActualizar);
            }
        })
    }

    deleteProduct(idEliminar){
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        let eliminado = 0;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == idEliminar) {
                this.products.splice(i, 1);
                fs.writeFileSync(this.path, JSON.stringify(this.products));
                console.log("Producto eliminado con éxito");
                eliminado++
            }
        }
        if (eliminado == 0) {
            console.log("No se ha encontrado el producto");
        }
    }
}

export default ProductManager;