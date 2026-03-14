const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db");
const verifyToken = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Server error", error: err });
      }

      if (result.length > 0) {
        const token = jwt.sign({ username }, "secret123", { expiresIn: "1h" });
        res.json({ token });
      } else {
        res.status(401).json({ message: "Login gagal" });
      }
    }
  );
});

/* ================= GET PRODUCTS ================= */
app.get("/products", verifyToken, (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Gagal mengambil data", error: err });
    }

    res.json(result);
  });
});

/* ================= ADD PRODUCT ================= */
app.post("/products", verifyToken, (req, res) => {
  let { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name dan price wajib diisi" });
  }

  price = Number(price);

  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Gagal menambah produk", error: err });
      }

      res.json({
        message: "Product berhasil ditambahkan",
        id: result.insertId
      });
    }
  );
});

/* ================= UPDATE PRODUCT ================= */
app.put("/products/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  let { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name dan price wajib diisi" });
  }

  price = Number(price);

  db.query(
    "UPDATE products SET name = ?, price = ? WHERE id = ?",
    [name, price, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Gagal update produk", error: err });
      }

      res.json({ message: "Product berhasil diupdate" });
    }
  );
});

/* ================= DELETE PRODUCT ================= */
app.delete("/products/:id", verifyToken, (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM products WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Gagal hapus produk", error: err });
      }

      res.json({ message: "Product berhasil dihapus" });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});