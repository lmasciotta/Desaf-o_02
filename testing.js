const ProductManager = require ("./productManager");

const product1 = new ProductManager();
const product2 = new ProductManager();

console.log (product1.addProduct('Coca-Cola', 'Gaseosa', 2800, 'http1://image1.com', '1', 30))
console.log (product2.addProduct('Sprite', 'Gaseosa', 2600, 'http2://image2.com', '2', 30))

console.log (product1.getProducts(product1))
console.log (product2.getProducts(product2))