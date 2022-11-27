class ProductManager{

    static id = 1;
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
            let idReal = this.id;
            this.products.push({title, description, price, thumbail, code, stock, idReal});
            this.id++;
        }
    }

    getProductById(id){
        this.encontrado = 0;
        this.products.forEach(p => {
            if (p.id = id) {
                console.log(p);
                this.encontrado++;
            }
        });
        if (this.encontrado == 0) {
            console.error("Not found");
        }
    }
}

let instancia = new ProductManager([]);

instancia.getProducts();
instancia.addProducts("producto prueba", "Este es el producto prueba", 200, "Sin imagen", "abc123", 25);
instancia.getProducts();
instancia.getProductById(2);