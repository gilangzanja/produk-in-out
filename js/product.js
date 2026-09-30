import { products } from './data.js';

export function addProduct(product) {
  products.push(product);
}

export function deleteProduct(id) {
  const index = products.findIndex(function (product) {
    return product.id === id;
  });

  if (index !== -1) {
    products.splice(index, 1);
  }
}

export function getProduct(id) {
  return products.find(function (product) {
    return product.id === id;
  });
}

export function updateProduct(id, updateProduct) {
  const index = products.findIndex(function (product) {
    return product.id === id;
  });
  if (index !== -1) {
    products[index] = {
      ...updateProduct,
      id: id,
    };
  }
}
