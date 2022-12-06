const fs = require("fs");

class ProductManager{

    constructor(products){
        this.products = products;
        this.path = "./productos.txt";
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    getProducts() {
        console.log(JSON.parse(fs.readFileSync(this.path, "utf-8")));
    }

    addProducts(title, description, price, thumbail, code, stock){
        if (this.products.find((p) => p.code == code) || title == null || description == null || Number.isNaN(price) || thumbail == null || Number.isNaN(stock)) {
            console.error("Se ha producido un error");
        } else {
            let id;
            this.products.lenght == undefined ? id = 1 : id = this.products[this.products.length-1].id + 1;
            this.products.push({title, description, price, thumbail, code, stock, id});
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    getProductById(id){
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        this.products.find((p) => p.id == id) ? console.log(this.products.find((p) => p.id == id)) : console.log("No se ha encontrado el producto");
    }

    updateProduct(idActualizar, title){
        this.products.find((p) => {
            if (p.id == idActualizar) {
                p.title = title;
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

let instancia = new ProductManager([]);

instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProductById(1);
instancia.updateProduct(1, "a mimir españa");
instancia.getProducts();
instancia.deleteProduct(1);
instancia.getProducts();