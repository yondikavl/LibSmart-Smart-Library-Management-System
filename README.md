# 📚 LibSmart – Smart Library Management System

LibSmart adalah aplikasi **manajemen perpustakaan cerdas** yang dibangun menggunakan:

- **Spring Boot** → Backend REST API
- **Next.js** → Admin Dashboard
- **Flutter** → Client Mobile App (rencana pengembangan)

---

## 🚀 Fitur Utama

### 🔧 Backend (Spring Boot)

- API untuk manajemen buku, anggota, dan peminjaman
- Logika perhitungan **durasi peminjaman & denda otomatis**
- Autentikasi & validasi data
- Statistik perpustakaan (jumlah buku, anggota, pinjaman aktif, dll)

### 🖥️ Admin Panel (Next.js)

- Dashboard interaktif dengan sidebar navigasi
- Kelola buku & anggota
- Lihat daftar peminjaman aktif & riwayat
- Proses **borrow/return** buku
- Monitoring statistik perpustakaan

### 📱 Client App (Flutter) _(coming soon)_

- Jelajahi katalog buku
- Lihat status & riwayat peminjaman
- Notifikasi keterlambatan & denda

---

## 📂 Struktur Proyek

libsmart/
├── backend/ # Spring Boot REST API
├── admin-panel/ # Next.js Admin Dashboard
└── client-app/ # Flutter Client (coming soon)

---

## ⚡ Instalasi & Menjalankan

### 1️⃣ Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Akan berjalan di: http://localhost:8080

### 2️⃣ Admin Panel (Next.js)

Coming soon 🚧

### 3️⃣ Admin Panel (Next.js)

Coming soon 🚧

## 📌 Rencana Fitur Selanjutnya

- Sistem notifikasi & reminder keterlambatan
- Role-based access (admin, member)
- Export laporan dalam format PDF/Excel
- Integrasi client mobile app (Flutter)

✨ Dibangun dengan semangat untuk mempermudah pengelolaan perpustakaan.
