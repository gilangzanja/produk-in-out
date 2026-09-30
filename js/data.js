export let products = [];
export let transactions = [];

export function setProducts(data) {
  products.length = 0;

  products.push(...data);
}

export function setTransactions(data) {
  transactions.length = 0;

  transactions.push(...data);
}

export const defaultProducts = [
  {
    id: 1,
    name: 'Keyboard Mechanical',
    category: 'Elektronik',
    price: 350000,
    stock: 10,
  },
  {
    id: 2,
    name: 'Mouse Wireless',
    category: 'Elektronik',
    price: 150000,
    stock: 20,
  },
  {
    id: 3,
    name: 'USB Hub',
    category: 'Aksesoris',
    price: 75000,
    stock: 0,
  },
];
