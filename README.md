# Inventory Barang

Aplikasi inventory berbasis browser untuk mengelola stok barang, transaksi masuk/keluar, serta menampilkan ringkasan operasional secara real-time.

## Overview

Project ini dibuat sebagai aplikasi sederhana untuk membantu pencatatan barang dan stock management. Aplikasi ini memungkinkan pengguna untuk:

- menambahkan produk baru
- mengedit data produk yang sudah ada
- menghapus produk
- mencari dan menyaring daftar produk
- melihat status stok barang
- melakukan transaksi stok masuk dan keluar
- menampilkan riwayat transaksi
- melihat dashboard ringkasan data inventory

## Features

- CRUD produk
- Search produk
- Filter stok: semua, tersedia, habis
- Sorting berdasarkan nama, stok, dan harga
- Dashboard summary inventory
- Riwayat transaksi stok
- Persistensi data menggunakan localStorage

## Tech Stack

- HTML5
- CSS3
- JavaScript ES Modules
- Browser localStorage

## Project Structure

```text
Inventory barang/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── data.js
│   ├── product.js
│   ├── storage.js
│   ├── transaction.js
│   ├── ui.js
│   └── validation.js
├── README.md
└── .gitignore
```

## How It Works

### 1. State management

Data produk dan transaksi disimpan dalam file `js/data.js` sebagai variabel state aplikasi.

### 2. Persistence

Data disimpan dan dibaca dari browser menggunakan `localStorage` melalui `js/storage.js`.

### 3. Business logic

Logika utama dipisah ke beberapa file:

- `js/product.js` → tambah, edit, hapus produk
- `js/transaction.js` → stok masuk dan stok keluar
- `js/validation.js` → validasi input

### 4. Rendering UI

Semua tampilan HTML dan pembaruan DOM ditangani di `js/ui.js`.

### 5. App orchestration

File `js/app.js` berperan sebagai penghubung antar modul, mengatur event listener, dan menjalankan render setelah perubahan data.

## Run the App

### Option 1: Open directly

Buka file `index.html` di browser.

### Option 2: Using local server

Jalankan perintah berikut di folder project:

```bash
python -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## Flow Application

1. Aplikasi membaca data produk dan transaksi dari localStorage.
2. Data diinisialisasi ke dalam state aplikasi.
3. UI menampilkan daftar produk dan dashboard.
4. User melakukan aksi seperti tambah produk atau transaksi stok.
5. Data diperbarui dan disimpan kembali.
6. Tampilan di-refresh agar selalu sinkron dengan state.

## Notes

- Data hanya disimpan di browser pengguna.
- Jika browser dibersihkan data penyimpanannya, maka inventory akan kembali seperti semula.
- Aplikasi ini cocok untuk kebutuhan belajar frontend dan konsep inventory sederhana.

## License

This project is intended for learning and personal development purposes.
