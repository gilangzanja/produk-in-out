import { products, transactions } from './data.js';

export function stockIn(productId, quantity) {
  const product = products.find(function (product) {
    return product.id === productId;
  });

  if (!product) {
    return;
  }

  product.stock += quantity;
  return true;
}

export function stockOut(productId, quantity) {
  const product = products.find(function (product) {
    return product.id === productId;
  });

  if (!product) {
    return;
  }

  if (quantity > product.stock) {
    return false;
  }

  product.stock -= quantity;
  return true;
}

export function addTransaction(productId, type, quantity) {
  const transaction = {
    id: Date.now(),
    productId: productId,
    type: type,
    quantity: quantity,
    date: new Date().toISOString(),
  };

  transactions.push(transaction);
}
