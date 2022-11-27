class ProductManager{



    constructor(products){
        this.products = products;
    }

    getProducts() {
        console.log(this.products);
    }

    addProducts(title, description, price, thumbail, code, stock){
        if (this.products.find((p) => p.code == code) || title == null || description == null || Number.isNaN(price) || thumbail == null || Number.isNaN(stock)) {
            console.error("Se ha producido un error");
        } else {
            let id;
            this.products.lenght == undefined ? id = 1 : id = this.products.lenght - 1;
            console.log(id);
            this.products.push({title, description, price, thumbail, code, stock, id});
        }
    }

    getProductById(id){
        let encontrado = true;
        this.products.forEach(p => {
            if (p.id == id) {
                console.log(p);
                encontrado = false;
            }
        });
        if (encontrado) {
            console.error("Not found");
        }
    }
}

let instancia = new ProductManager([]);

instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProductById(3);