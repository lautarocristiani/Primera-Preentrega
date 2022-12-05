const fs = require("fs");

class ProductManager{

    constructor(products){
        this.products = products;
        this.path = "./productos.txt";
    }

    guardar(){
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    leer(){
        JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }

    getProducts() {
        console.log(this.products);
    }

    addProducts(title, description, price, thumbail, code, stock){
        if (this.products.find((p) => p.code == code) || title == null || description == null || Number.isNaN(price) || thumbail == null || Number.isNaN(stock)) {
            console.error("Se ha producido un error");
        } else {
            let id;
            this.products.lenght == undefined ? id = 1 : id = this.products[this.products.length-1].id + 1;
            this.products.push({title, description, price, thumbail, code, stock, id});
        }
    }

    getProductById(id){
        this.products.find((p) => p.id == id) ? console.log(this.products.find((p) => p.id == id)) : console.log("No se ha encontrado el producto");
    }

    //agregar updateProduct y deleteProduct
}

let instancia = new ProductManager([]);

instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProductById(2);