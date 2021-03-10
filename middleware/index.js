const express = require("express");
const auth = require("./auth");
const verification = require("./verification");
const router = express.Router();

// daftarkan menu registrasi
router.post("/api/v1/register", auth.register);
router.post("/api/v1/login", auth.login);
router.post("/api/v1/changepassword", verification(1), auth.changePassword);

router.get("/verify/", auth.verification);

// ----- alamat yang perlu otorisasi -----
// halaman yang menapilkan data table oleh administrator
router.get("/api/v1/admin/mahasiswa", verification(1), auth.adminMahasiswa);

router.get("/api/v1/admin/user", verification(1), auth.adminUser);

// ----- alamat yang perlu otorisasi (end) -----
module.exports = router;
