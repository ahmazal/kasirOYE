const bcrypt = require("bcrypt");
const { pool } = require("../config/db");

async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nama, email, role, created_at FROM users ORDER BY id ASC",
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT id, nama, email, role, created_at FROM users WHERE id = ?",
      [req.params.id],
    );
    if (rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { nama, email, password, role } = req.body;
    if (!nama || !email)
      return res
        .status(400)
        .json({ success: false, message: "Nama dan email wajib diisi" });

    let query, params;
    if (password) {
      const hash = await bcrypt.hash(password, 12);
      query = "UPDATE users SET nama=?, email=?, password=?, role=? WHERE id=?";
      params = [nama, email, hash, role || "kasir", req.params.id];
    } else {
      query = "UPDATE users SET nama=?, email=?, role=? WHERE id=?";
      params = [nama, email, role || "kasir", req.params.id];
    }

    const [result] = await pool.query(query, params);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    res.json({ success: true, message: "User berhasil diupdate" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY")
      return res
        .status(409)
        .json({ success: false, message: "Email sudah digunakan" });
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    if (parseInt(req.params.id) === req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "Tidak bisa menghapus akun sendiri" });
    }
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    res.json({ success: true, message: "User berhasil dihapus" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, update, remove };
