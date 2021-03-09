const express = require("express");
const auth = require("./auth");
const verification = require("./verification");
const router = express.Router();

// daftarkan menu registrasi
router.post("/api/v1/register", auth.register);
router.post("/api/v1/login", auth.login);

router.get("/verify/", auth.verification);

// ----- alamat yang perlu otorisasi -----
// router.get("/api/v1/secret", verification(), auth.secretPage);

// halaman yang menapilkan data table oleh administrator
router.get("/api/v1/admin/mahasiswa", verification(1), auth.adminMahasiswa);

// ----- alamat yang perlu otorisasi (end) -----
module.exports = router;
