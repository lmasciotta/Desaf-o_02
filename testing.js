const ProductManager = require("./productManager");


const productManager = new ProductManager();

console.log(productManager.addProduct('Coca-Cola', 'Gaseosa', 2800, 'http1://image1.com', '1', 30));
console.log(productManager.addProduct('Sprite', 'Gaseosa', 2600, 'http2://image2.com', '2', 30));

console.log(productManager.getProducts());
