Siap. Ini saya buatkan **README.md lengkap** yang bahasanya tetap natural, sederhana, dan menyesuaikan database kamu yang ada `users`, `categories`, dan `products`, dengan `category_id` mengarah ke kategori seperti `1 = Electronics` dan `2 = Furniture`.

Tinggal copy semua isi ini ke file **`README.md`**.

````md
# Mini Project Fullstack Web App

Project ini dibuat sebagai bagian dari proses rekrutmen.  
Aplikasi yang dibuat adalah web app fullstack sederhana untuk login dan manajemen produk, terdiri dari frontend dan backend.

Aplikasi ini memiliki fitur login menggunakan JWT, dashboard untuk menampilkan data produk, chart yang datanya diambil dari backend, serta fitur CRUD untuk data produk.

---

## Fitur Utama

Beberapa fitur yang ada pada project ini:

- Login user menggunakan JWT
- Menampilkan data produk pada dashboard
- Menambah data produk
- Mengubah data produk
- Menghapus data produk
- Menampilkan chart berdasarkan data produk dari backend
- Proteksi endpoint products menggunakan token JWT

---

## Teknologi yang Digunakan

### Backend

- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- CORS

### Frontend

- HTML
- CSS
- JavaScript
- Bootstrap
- Chart.js

---

## Struktur Project

Contoh struktur folder project:

```bash
mini-fullstack-project/
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── auth.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── login.html
│   ├── login.js
│   ├── dashboard.html
│   └── dashboard.js
├── database.sql
└── README.md
```
````

Kalau nama folder atau file di project kamu sedikit berbeda, tinggal sesuaikan saja.

---

## Database

Database yang digunakan bernama:

```bash
dashboard_app
```

Tabel utama yang digunakan:

- `users`
- `categories`
- `products`

### 1. Tabel `users`

Tabel ini digunakan untuk menyimpan akun login.

Contoh struktur:

- `id`
- `username`
- `password`

### 2. Tabel `categories`

Tabel ini digunakan untuk menyimpan data kategori produk.

Contoh data kategori:

- `1 = Electronics`
- `2 = Furniture`

Contoh struktur:

- `id`
- `category_name`

### 3. Tabel `products`

Tabel ini digunakan untuk menyimpan data produk.

Contoh struktur:

- `id`
- `name`
- `price`
- `category_id`

Kolom `category_id` pada tabel `products` berelasi ke tabel `categories`.

---

## Relasi Antar Tabel

Relasi pada database ini cukup sederhana:

- satu kategori bisa memiliki banyak produk
- satu produk hanya memiliki satu kategori

Jadi relasinya adalah:

- `categories.id` → `products.category_id`

Contoh isi tabel `products` yang sekarang:

- CPU → `category_id = 1`
- Keyboard → `category_id = 1`
- Monitor → `category_id = 1`

Karena `1` pada tabel `categories` adalah `Electronics`, berarti ketiga produk tersebut masuk kategori Electronics.

---

## Penjelasan Normalisasi

Database pada project ini dirancang sampai **Third Normal Form (3NF)**.

### Bentuk Sebelum Normalisasi

Sebelum dinormalisasi, data produk bisa saja dibuat seperti ini:

| id  | product_name | price    | category_name |
| --- | ------------ | -------- | ------------- |
| 1   | CPU          | 30000000 | Electronics   |
| 2   | Keyboard     | 8500000  | Electronics   |
| 3   | Monitor      | 9999999  | Electronics   |
| 4   | Chair        | 1500000  | Furniture     |

### Masalah dari bentuk ini

Kalau data masih seperti di atas, ada beberapa masalah:

- nama kategori ditulis berulang-ulang pada setiap produk
- kalau nama kategori berubah, harus update banyak baris
- rawan terjadi data tidak konsisten
- struktur data kurang rapi

### Bentuk Setelah Normalisasi

Setelah dinormalisasi, data dipisah menjadi beberapa tabel.

#### Tabel `categories`

| id  | category_name |
| --- | ------------- |
| 1   | Electronics   |
| 2   | Furniture     |

#### Tabel `products`

| id  | name     | price    | category_id |
| --- | -------- | -------- | ----------- |
| 46  | CPU      | 30000000 | 1           |
| 47  | Keyboard | 8500000  | 1           |
| 48  | Monitor  | 9999999  | 1           |

#### Tabel `users`

| id  | username | password |
| --- | -------- | -------- |

### Kenapa ini sudah 3NF

Struktur database ini sudah memenuhi 3NF karena:

- setiap tabel memiliki primary key
- data kategori tidak diulang langsung di tabel produk
- atribut non-key bergantung pada primary key
- data kategori dipisahkan ke tabel sendiri
- relasi antar tabel dibuat menggunakan `category_id`

Dengan bentuk ini, database jadi lebih rapi, lebih mudah dikelola, dan lebih aman dari duplikasi data.

---

## Alur Kerja Aplikasi

Alur sederhana dari aplikasi ini adalah:

1. User membuka halaman login
2. User memasukkan username dan password
3. Frontend mengirim data login ke backend
4. Backend memeriksa data user di tabel `users`
5. Jika login berhasil, backend mengirim token JWT
6. Token disimpan di browser menggunakan `localStorage`
7. Saat user membuka dashboard, frontend mengirim token ke backend
8. Backend memverifikasi token
9. Jika token valid, backend mengirim data produk
10. Data produk ditampilkan dalam bentuk tabel dan chart

---

## Endpoint Backend

### Login

**POST** `/login`

Endpoint ini digunakan untuk login dan menghasilkan JWT.

Contoh request:

```json
{
  "username": "admin",
  "password": "123"
}
```

Contoh response jika berhasil:

```json
{
  "token": "jwt_token_di_sini"
}
```

---

### Products

Semua endpoint products diproteksi menggunakan JWT.

#### 1. Ambil semua produk

**GET** `/products`

Digunakan untuk menampilkan semua data produk.

#### 2. Tambah produk

**POST** `/products`

Digunakan untuk menambah data produk baru.

Contoh body:

```json
{
  "name": "Mouse",
  "price": 150000
}
```

#### 3. Update produk

**PUT** `/products/:id`

Digunakan untuk mengubah data produk berdasarkan id.

Contoh body:

```json
{
  "name": "Mouse Gaming",
  "price": 250000
}
```

#### 4. Hapus produk

**DELETE** `/products/:id`

Digunakan untuk menghapus data produk berdasarkan id.

---

## Cara Menjalankan Project

### 1. Clone repository

```bash
git clone [link-repository]
```

### 2. Masuk ke folder backend

```bash
cd backend
```

### 3. Install dependency backend

```bash
npm install
```

### 4. Jalankan backend

```bash
node server.js
```

Kalau berhasil, biasanya akan muncul keterangan seperti ini di terminal:

```bash
Database terhubung
Server running on port 3000
```

Backend akan berjalan di:

```bash
http://localhost:3000
```

---

## Cara Menjalankan Frontend

Masuk ke folder frontend, lalu buka file:

```bash
login.html
```

Frontend bisa dijalankan dengan:

- langsung dibuka di browser
- atau menggunakan Live Server di VS Code

Setelah login berhasil, user akan diarahkan ke halaman dashboard.

---

## Cara Menyiapkan Database

1. Buka phpMyAdmin
2. Buat database dengan nama:

```bash
dashboard_app
```

3. Import file SQL yang sudah disediakan, misalnya:

```bash
database.sql
```

4. Pastikan tabel berikut berhasil dibuat:

- `users`
- `categories`
- `products`

---

## Contoh Data Dummy

### Data kategori

- `1 = Electronics`
- `2 = Furniture`

### Data produk

- CPU
- Keyboard
- Monitor

### Akun login dummy

Gunakan akun berikut untuk login:

- **Username:** admin
- **Password:** admin123

Kalau isi tabel `users` di database kamu berbeda, tinggal sesuaikan bagian ini dengan data asli yang ada.

---

## Dashboard

Pada halaman dashboard, data produk ditampilkan dalam dua bentuk:

1. **Tabel produk**
   Berisi daftar produk yang diambil dari backend

2. **Chart produk**
   Menampilkan visualisasi data produk menggunakan Chart.js

Chart pada dashboard **tidak menggunakan data hardcode**, tetapi mengambil data langsung dari backend melalui endpoint `/products`.

Hal ini dibuat agar sesuai dengan ketentuan tugas.

---

## Keamanan Sederhana yang Digunakan

Project ini menggunakan JWT untuk proteksi endpoint products.

Alurnya seperti ini:

- user login
- backend menghasilkan token
- token disimpan di browser
- token dikirim pada setiap request ke endpoint products
- backend memverifikasi token sebelum memberikan akses data

Dengan cara ini, endpoint produk tidak bisa diakses sembarangan tanpa login.

---

## Catatan Pengembangan

Project ini dibuat untuk memenuhi kebutuhan mini project fullstack sederhana.
Fokus utama project ini adalah:

- implementasi backend JavaScript dengan Express
- penggunaan database relasional
- penerapan normalisasi database
- login menggunakan JWT
- dashboard dengan chart dari backend
- fitur CRUD sederhana

Project ini masih bisa dikembangkan lagi, misalnya:

- menampilkan nama kategori dengan query join
- membuat tampilan UI lebih responsif
- menambahkan validasi input yang lebih lengkap
- mengamankan password dengan hashing

---

## Kekurangan / Catatan Tambahan

Dalam project ini, password pada tabel `users` masih disimpan secara sederhana untuk kebutuhan mini project dan demo.
Untuk implementasi yang lebih aman di project nyata, password sebaiknya disimpan dalam bentuk hash, misalnya menggunakan `bcrypt`.

Selain itu, tabel `categories` sudah dibuat sebagai hasil normalisasi, walaupun pada tampilan dashboard saat ini fokus utama masih pada data produk.

---

## Author

Mini project ini dibuat oleh:

**Rizal Gani**
