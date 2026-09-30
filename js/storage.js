const STORAGE_KEY = 'inventory_product';
const TRANSACTION_KEY = 'inventory_transaction';

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function loadProducts() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export function saveTransactions(transactions) {
  localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
}

export function loadTransactions() {
  const data = localStorage.getItem(TRANSACTION_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}
