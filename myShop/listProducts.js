var faker = require('../node_modules/faker');

var products = new Array();

for (var i = 0; i < 10; i++) {
  // build up our product.
  var product = faker.commerce.productName();
  var price = faker.commerce.price();
  var productPrice = product + " - $" + price;
  products.push(productPrice);
}

products.forEach (function(product) {
  console.log(product);
}); 