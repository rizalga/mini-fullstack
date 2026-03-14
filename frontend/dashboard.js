const API = "http://localhost:3000/products";
const token = localStorage.getItem("token");

let chart = null;

if (!token) {
  alert("Silakan login terlebih dahulu");
  window.location = "login.html";
}

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  try {
    const res = await fetch(API, {
      headers: {
        Authorization: token
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal mengambil data");
      return;
    }

    const table = document.getElementById("productTable");
    table.innerHTML = "";

    data.forEach((p, i) => {
      table.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editProduct(${p.id}, '${p.name}', ${p.price})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
          </td>
        </tr>
      `;
    });

    document.getElementById("total").innerText = data.length;

    const labels = data.map((p) => p.name);
    const prices = data.map((p) => p.price);

    const ctx = document.getElementById("productChart");

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Product Price",
            data: prices
          }
        ]
      }
    });
  } catch (error) {
    console.error("Load error:", error);
    alert("Terjadi error saat mengambil data");
  }
}

/* ================= ADD PRODUCT ================= */
async function addProduct() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();

  if (name === "" || price === "") {
    alert("Data tidak boleh kosong");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name, price })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal menambahkan produk");
      return;
    }

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";

    loadProducts();
    showProducts();
  } catch (error) {
    console.error("Add error:", error);
    alert("Terjadi error saat menambahkan data");
  }
}

/* ================= DELETE PRODUCT ================= */
async function deleteProduct(id) {
  if (!confirm("Hapus produk ini?")) return;

  try {
    const res = await fetch(API + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal menghapus produk");
      return;
    }

    loadProducts();
    showProducts();
  } catch (error) {
    console.error("Delete error:", error);
    alert("Terjadi error saat menghapus data");
  }
}

/* ================= EDIT PRODUCT ================= */
function editProduct(id, name, price) {
  showProducts();
  document.getElementById("editSection").style.display = "block";
  document.getElementById("editId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editPrice").value = price;
}

/* ================= UPDATE PRODUCT ================= */
async function updateProduct() {
  const id = document.getElementById("editId").value;
  const name = document.getElementById("editName").value.trim();
  const price = document.getElementById("editPrice").value.trim();

  if (name === "" || price === "") {
    alert("Data edit tidak boleh kosong");
    return;
  }

  try {
    const res = await fetch(API + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name, price })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal update produk");
      return;
    }

    document.getElementById("editSection").style.display = "none";
    loadProducts();
    showProducts();
  } catch (error) {
    console.error("Update error:", error);
    alert("Terjadi error saat update data");
  }
}

/* ================= CANCEL EDIT ================= */
function cancelEdit() {
  document.getElementById("editSection").style.display = "none";
}

/* ================= NAVIGATION ================= */
function showDashboard() {
  document.getElementById("dashboardSection").style.display = "block";
  document.getElementById("productSection").style.display = "none";
}

function showProducts() {
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("productSection").style.display = "block";
}

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}

loadProducts();
showDashboard();