class ProductManager {
    #products;
    static idProduct = 0;
        
    constructor(){
        this.#products = [];
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
         
        if(!title || !description || !price || !thumbnail || !code || !stock)
           return `Todos los elementos mencionados a continuación deben ingresarse para que se pueda añadir el producto: "title, description, price, thumbnail, code, stock"`;

           if (this.#products.some(product => product.code == code)) {
            return `El código ${code} ya se encuentra registrado en otro producto`;
        }
        
     
        const newProduct ={
            id:ProductManager.idProduct++, 
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.#products.push(newProduct);

        return `Pruducto agregado satisfactoriamente`
    }

    getProducts() {
        return this.#products;
    }

    getProductsById(item) {
        const product = this.#products.find(p => p.id === item);
        if (product)
            return product;
        else
            return `Not Found el producto ${item}`;
    }

}


module.exports = ProductManager;