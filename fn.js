// Helper function untuk format Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toLocaleString('id-ID');
}

// Helper function untuk mendapatkan harga kendaraan
function getHargaKendaraan(tipe) {
    switch(tipe) {
        case 'Toyota Avanza/Xenia': return 450000;
        case 'Honda Brio': return 400000;
        case 'Toyota Hiace': return 850000;
        default: return 0;
    }
}

// Fungsi utama untuk menghitung total harga
function hitungTotal() {
    const mulai = new Date(document.getElementById('mulai').value);
    const selesai = new Date(document.getElementById('selesai').value);
    const kendaraan = document.getElementById('kendaraanSelect').value;

      if (!tglAmbil || !tglKembali || isNaN(hargaPerHari)) {
        alert("Mohon lengkapi semua data.");
        return;
      }

      const selisihHari = (tglKembali - tglAmbil) / (1000 * 60 * 60 * 24);

      if (selisihHari <= 0) {
        alert("Tanggal pengembalian harus setelah tanggal pengambilan!");
        return;
      }

      total = hargaPerHari * selisihHari;
      detail = `Mobil: <b>${tipeMobil}</b><br>Lama sewa: ${selisihHari} hari<br>Total: <b>Rp ${total.toLocaleString('id-ID')}</b>`;
      document.getElementById('hasil').innerHTML = detail;

      // tampilkan modal
      document.getElementById('detailPesanan').innerHTML = detail;
      document.getElementById('modalKonfirmasi').style.display = 'flex';
    }

    function tutupModal() {
      document.getElementById('modalKonfirmasi').style.display = 'none';
    }

    function konfirmasiPesanan() {
      alert("✅ Pesanan Anda berhasil dikonfirmasi!\nTerima kasih telah menyewa di Rental Transportasi Nusantara.");
      tutupModal();
      document.getElementById('hasil').innerHTML = "";
      document.getElementById('tglAmbil').value = "";
      document.getElementById('tglKembali').value = "";
    }
  