export function renderProducts(products) {
  const productList = document.querySelector('#productList');

  productList.innerHTML = '';

  if (products.length === 0) {
    productList.innerHTML = `
            <p>Tidak ada produk</p>
        `;

    return;
  }

  products.forEach(function (product) {
    const productElement = document.createElement('div');
    productElement.classList.add('product-card');
    productElement.innerHTML = `
            <h3>${product.name}</h3>

            <p>
                Kategori:
                ${product.category}
            </p>

            <p>
                Harga:
                Rp ${product.price.toLocaleString('id-ID')}
            </p>

            <p>
                Stok:
                ${product.stock}
            </p>

            <div class="product-actions">

                <button
                    class="edit-button"
                    data-id="${product.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-button"
                    data-id="${product.id}"
                >
                    Hapus
                </button>

            </div>
        `;
    productList.appendChild(productElement);
  });
}

export function renderProductsOptions(products) {
  const transactionProduct = document.querySelector('#transactionProduct');
  transactionProduct.innerHTML = `
        <option value="">Pilih Produk</option>
    `;

  products.forEach(function (product) {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - Stok: ${product.stock}`;

    transactionProduct.appendChild(option);
  });
}

export function renderTransactions(transactions, products) {
  const transactionList = document.querySelector('#transactionList');
  transactionList.innerHTML = '';

  if (transactions.length === 0) {
    transactionList.innerHTML = '<p>Belum ada transaksi.</p>';
    return;
  }

  transactions.forEach(function (transaction) {
    const product = products.find(function (product) {
      return product.id === transaction.productId;
    });

    if (!product) {
      return;
    }

    const transactionElement = document.createElement('div');
    const typeText = transaction.type === 'in' ? 'stok masuk' : 'stok keluar';

    const date = new Date(transaction.date);
    transactionElement.innerHTML = `

            <div class="transaction-card">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Jenis:
                    ${typeText}
                </p>

                <p>
                    Jumlah:
                    ${transaction.quantity}
                </p>

                <p>
                    Tanggal:
                    ${date.toLocaleString('id-ID')}
                </p>

            </div>

        `;

    transactionList.appendChild(transactionElement);
  });
}

export function renderDashboard(products, transactions) {
  const totalProducts = document.querySelector('#totalProducts');
  const totalStock = document.querySelector('#totalStock');
  const emptyStock = document.querySelector('#emptyStock');
  const totalStockIn = document.querySelector('#totalStockIn');
  const totalStockOut = document.querySelector('#totalStockOut');

  if (totalProducts) {
    totalProducts.textContent = String(products.length);
  }

  const stock = products.reduce(function (total, product) {
    return total + product.stock;
  }, 0);

  if (totalStock) {
    totalStock.textContent = String(stock);
  }

  const emptyProducts = products.filter(function (product) {
    return product.stock === 0;
  });

  if (emptyStock) {
    emptyStock.textContent = String(emptyProducts.length);
  }

  const stockIn = transactions
    .filter(function (transaction) {
      return transaction.type === 'in';
    })
    .reduce(function (total, transaction) {
      return total + transaction.quantity;
    }, 0);

  if (totalStockIn) {
    totalStockIn.textContent = String(stockIn);
  }

  const stockOut = transactions
    .filter(function (transaction) {
      return transaction.type === 'out';
    })
    .reduce(function (total, transaction) {
      return total + transaction.quantity;
    }, 0);

  if (totalStockOut) {
    totalStockOut.textContent = String(stockOut);
  }
}
