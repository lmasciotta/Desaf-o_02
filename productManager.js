const fs = require('fs');
const path = require('path');

class ProductManager {
    #products;
    #path;
    static idProduct = 0;
        
    constructor(){
        this.#products = this.#leerProductosInFile();
        this.#path = path.resolve(__dirname, 'data', 'productos.json');
        if (!this.#products) {
            this.#products = [];
            this.#guardarDatos();
        }
    }

    #leerProductosInFile(){
        try{
            if(fs.existsSync(this.#path)){
                const data = fs.readFileSync(this.#path, 'utf8');
                this.#products = JSON.parse(data);
                console.log('Productos leídos correctamente.');
            } else {
                console.log('El archivo de productos no existe.');
            }
        } catch (error){
            console.error('Error al leer productos:', error);
        }
    }
    
    async #guardarDatos(){
        try {
            await fs.writeFile(this.#path, JSON.stringify(this.#products));
            console.log('Datos guardados correctamente.');
        } catch (error) {
            console.error(`Ocurrió un error inesperado al momento de guardar el archivo de productos: ${error}`);
        }
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
        this.#guardarDatos();

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

    updateProductById(id, objup) {
        let msg = `El producto con id ${id} no existe`;
        
        const index = this.#products.findIndex(p=> p.id === id);

        if (index !== -1){
            const {id, ...rest} = objup;
            this.#products[index] = {...this.#products[index], ...rest}
            this.#guardarDatos();
            msg = 'Producto actualizado!';
        } else {
            return `El producto con id ${id} no existe.`;
        }
    }

    deleteProduct(id){
        let msg = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p=> p.id !== id);
            this.#guardarDatos();
            msg = `Producto Eliminado!`;
        }

    }

}


module.exports = ProductManager;