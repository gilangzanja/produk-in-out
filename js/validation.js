export function validateProduct(product) {
  if (product.name.trim() === '') {
    return {
      valid: false,
      message: 'Nama produk wajib diisi.',
    };
  }

  if (product.category.trim() === '') {
    return {
      valid: false,
      message: 'Kategori wajib diisi.',
    };
  }

  if (!Number.isFinite(product.price) || product.price <= 0) {
    return {
      valid: false,
      message: 'Harga harus berupa angka lebih dari 0.',
    };
  }

  if (!Number.isInteger(product.stock) || product.stock < 0) {
    return {
      valid: false,
      message: 'Stok harus berupa angka bulat 0 atau lebih.',
    };
  }

  return {
    valid: true,
    message: '',
  };
}

export function validateTransaction(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return {
      valid: false,
      message: 'Jumlah harus berupa angka bulat lebih dari 0.',
    };
  }

  return {
    valid: true,
    message: '',
  };
}
