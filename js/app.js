import { products, transactions, setProducts, setTransactions, defaultProducts } from './data.js';
import { renderProducts, renderProductsOptions, renderTransactions, renderDashboard } from './ui.js';
import { addProduct, deleteProduct, getProduct, updateProduct } from './product.js';
import { stockIn, stockOut, addTransaction } from './transaction.js';
import { saveProducts, loadProducts, saveTransactions, loadTransactions } from './storage.js';
import { validateProduct, validateTransaction } from './validation.js';

const productForm = document.querySelector('#productForm');

const productName = document.querySelector('#productName');
const productCategory = document.querySelector('#productCategory');
const productPrice = document.querySelector('#productPrice');
const productStock = document.querySelector('#productStock');

const productList = document.querySelector('#productList');

const searchInput = document.querySelector('#searchInput');
const filterStock = document.querySelector('#filterStock');
const sortProduct = document.querySelector('#sortProduct');

const transactionForm = document.querySelector('#transactionForm');
const transactionProduct = document.querySelector('#transactionProduct');
const transactionType = document.querySelector('#transactionType');
const transactionQuantity = document.querySelector('#transactionQuantity');

const productSubmitButton = productForm.querySelector('button[type="submit"]');

let editProductId = null;

let searchKeywoard = '';
let stockFilter = 'all';
let sortOption = 'default';

const savedProducts = loadProducts();
const savedTransactions = loadTransactions();

if (savedProducts) {
  setProducts(savedProducts);
} else {
  setProducts(defaultProducts);
  saveProducts(products);
}

if (savedTransactions) {
  setTransactions(savedTransactions);
}

displayProducts();
renderProductsOptions(products);
renderTransactions(transactions, products);
renderDashboard(products, transactions);

function displayProducts() {
  let result = [...products];

  if (searchKeywoard !== '') {
    result = result.filter(function (product) {
      return product.name.toLowerCase().includes(searchKeywoard);
    });
  }

  if (stockFilter === 'available') {
    result = result.filter(function (product) {
      return product.stock > 0;
    });
  }

  if (stockFilter === 'empty') {
    result = result.filter(function (product) {
      return product.stock === 0;
    });
  }

  if (sortOption === 'name-asc') {
    result.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  if (sortOption === 'name-desc') {
    result.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  }

  if (sortOption === 'stock-asc') {
    result.sort(function (a, b) {
      return a.stock - b.stock;
    });
  }

  if (sortOption === 'stock-desc') {
    result.sort(function (a, b) {
      return b.stock - a.stock;
    });
  }

  if (sortOption === 'price-asc') {
    result.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  if (sortOption === 'price-desc') {
    result.sort(function (a, b) {
      return b.price - a.price;
    });
  }
  renderProducts(result);
}

productForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = productName.value;
  const category = productCategory.value;
  const price = Number(productPrice.value);
  const stock = Number(productStock.value);

  const productData = {
    name: name,
    category: category,
    price: price,
    stock: stock,
  };

  const validation = validateProduct(productData);

  if (!validation.valid) {
    alert(validation.message);

    return;
  }
  if (editProductId === null) {
    const newProduct = {
      id: Date.now(),
      ...productData,
    };
    addProduct(newProduct);
  } else {
    updateProduct(editProductId, productData);
    editProductId = null;
  }
  saveProducts(products);
  renderDashboard(products, transactions);
  displayProducts();
  renderProductsOptions(products);
  productForm.reset();
  alert('Produk berhasil disimpan');
  productSubmitButton.textContent = 'Tambah Produk';
});

productList.addEventListener('click', function (event) {
  if (event.target.classList.contains('delete-button')) {
    const id = Number(event.target.dataset.id);
    const confirmDelete = confirm('Apakah anda yakin ingin menghapus produk ini?');
    if (!confirmDelete) {
      return;
    }
    deleteProduct(id);
    saveProducts(products);
    renderProductsOptions(products);
    renderDashboard(products, transactions);
    displayProducts();
  }

  if (event.target.classList.contains('edit-button')) {
    const id = Number(event.target.dataset.id);
    const product = getProduct(id);
    productName.value = product.name;
    productCategory.value = product.category;
    productPrice.value = product.price;
    productStock.value = product.stock;

    editProductId = id;
    productSubmitButton.textContent = 'Update Produk';
  }
});

searchInput.addEventListener('input', function () {
  searchKeywoard = searchInput.value.toLowerCase();
  displayProducts();
});

filterStock.addEventListener('change', function () {
  stockFilter = filterStock.value;
  displayProducts();
});

sortProduct.addEventListener('change', function (event) {
  sortOption = sortProduct.value;
  displayProducts();
});

transactionForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const productId = Number(transactionProduct.value);
  const type = transactionType.value;
  const quantity = Number(transactionQuantity.value);

  if (!productId) {
    alert('Silahkan pilih produk ini');
    return;
  }

  const validation = validateTransaction(quantity);

  if (!validation.valid) {
    alert(validation.message);

    return;
  }

  let success = false;

  if (type === 'in') {
    success = stockIn(productId, quantity);
  } else if (type === 'out') {
    success = stockOut(productId, quantity);
  }

  if (!success) {
    alert('Transaksi gagal');
    return;
  }

  addTransaction(productId, type, quantity);
  saveTransactions(transactions);
  saveProducts(products);
  displayProducts();
  renderProductsOptions(products);
  renderTransactions(transactions, products);
  renderDashboard(products, transactions);
  transactionForm.reset();
  alert('Transaksi berhasil disimpan.');
});
