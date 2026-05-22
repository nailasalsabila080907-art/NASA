function tampilForm() {
  const materi = document.getElementById("pilihMateri").value;
  const formIsi = document.getElementById("formIsi");
  const preview = document.getElementById("previewHasil");
  const hasil = document.getElementById("hasil");

  // reset preview & hasil
  preview.innerHTML = "🔍 Preview hasil akan tampil di sini";
  hasil.innerHTML = "✅ Hasil akhir muncul di sini";

  if (materi === "") {
    formIsi.innerHTML = "📌 Pilih materi untuk menampilkan form.";
  }
  else if (materi === "dolar") {
    formIsi.innerHTML = `
      <label>Masukkan jumlah Dolar ($):</label>
      <input type="number" id="inputDolar" placeholder="Contoh: 10">
      <button onclick="hitung()">Hitung</button>
    `;
  }
  else if (materi === "apel") {
    formIsi.innerHTML = `
      <label>Jumlah Apel:</label>
      <input type="number" id="apelInput">
      <label>Jumlah Keranjang:</label>
      <input type="number" id="keranjangInput">
      <button onclick="hitung()">Hitung</button>
    `;
  }
  else if (materi === "nilai") {
    formIsi.innerHTML = `
      <label>Nilai 1:</label>
      <input type="number" id="nilai1">
      <label>Nilai 2:</label>
      <input type="number" id="nilai2">
      <label>Nilai 3:</label>
      <input type="number" id="nilai3">
      <button onclick="hitung()">Hitung</button>
    `;
  }
  else if (materi === "perjalanan") {
    formIsi.innerHTML = `
      <label>Jarak (km):</label>
      <input type="number" id="jarak">
      <label>Waktu (jam):</label>
      <input type="number" id="waktu">
      <button onclick="hitung()">Hitung</button>
    `;
  }
  else if (materi === "baju") {
    formIsi.innerHTML = `
      <label>Harga Baju (Rp):</label>
      <input type="number" id="hargaBarang">
      <label>Diskon (%):</label>
      <input type="number" id="persenDiskon">
      <button onclick="hitung()">Hitung</button>
    `;
  }
  else if (materi === "tiketKonser") {
    formIsi.innerHTML = `
      <label>Kategori:</label>
      <select id="kategori">
        <option value="VIP">VIP</option>
        <option value="Regular">Regular</option>
        <option value="Economy">Economy</option>
      </select>
      <label>Sisa Kursi:</label>
      <input type="number" id="sisa" value="200">
      <button onclick="hitung()">Hitung</button>
    `;
  }
  else if (materi === "hotel") {
    formIsi.innerHTML = `
      <label>Jumlah Malam:</label>
      <input type="number" id="malam" value="2" min="1">
      <label>Jenis Hari:</label>
      <select id="hari">
        <option value="weekday">Weekday</option>
        <option value="weekend">Weekend</option>
      </select>
      <label>Libur Nasional?</label>
      <select id="libur">
        <option value="false">Tidak</option>
        <option value="true">Ya</option>
      </select>
      <label>Include Sarapan?</label>
      <select id="sarapan">
        <option value="false">Tidak</option>
        <option value="true">Ya</option>
      </select>
      <button onclick="hitung()">Hitung</button>
    `;
  }
}

// Fungsi hitung untuk semua materi
function hitung() {
  const materi = document.getElementById("pilihMateri").value;
  const preview = document.getElementById("previewHasil");
  const hasil = document.getElementById("hasil");

  if (materi === "dolar") {
    const dolar = parseFloat(document.getElementById("inputDolar").value);
    if (isNaN(dolar)) return preview.innerText = "❌ Masukkan jumlah dolar.";
    const rupiah = dolar * 15000;
    preview.innerText = `${dolar} USD = Rp ${rupiah.toLocaleString("id-ID")}`;
    hasil.innerText = `Hasil konversi: Rp ${rupiah.toLocaleString("id-ID")}`;
  }

  else if (materi === "apel") {
    const apel = parseInt(document.getElementById("apelInput").value);
    const keranjang = parseInt(document.getElementById("keranjangInput").value);
    if (isNaN(apel) || isNaN(keranjang)) return preview.innerText = "❌ Masukkan angka apel & keranjang.";
    if (keranjang === 0) return preview.innerText = "❌ Keranjang tidak boleh 0.";
    const bagi = Math.floor(apel / keranjang);
    const sisa = apel % keranjang;
    preview.innerText = `${bagi} apel / keranjang, sisa ${sisa} apel`;
    hasil.innerText = `Setiap keranjang mendapat ${bagi}, sisa ${sisa}.`;
  }

  else if (materi === "nilai") {
    const n1 = parseFloat(document.getElementById("nilai1").value);
    const n2 = parseFloat(document.getElementById("nilai2").value);
    const n3 = parseFloat(document.getElementById("nilai3").value);
    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) return preview.innerText = "❌ Masukkan semua nilai.";
    const rata = (n1+n2+n3)/3;
    preview.innerText = `Rata-rata = ${rata.toFixed(2)}`;
    hasil.innerText = `Hasil rata-rata: ${rata.toFixed(2)}`;
  }

  else if (materi === "perjalanan") {
    const jarak = parseFloat(document.getElementById("jarak").value);
    const waktu = parseFloat(document.getElementById("waktu").value);
    if (isNaN(jarak) || isNaN(waktu) || waktu===0) return preview.innerText = "❌ Masukkan jarak & waktu (waktu ≠ 0).";
    const kecepatan = jarak / waktu;
    preview.innerText = `Kecepatan = ${kecepatan} km/jam`;
    hasil.innerText = `Hasil: ${kecepatan} km/jam`;
  }

  else if (materi === "baju") {
    const harga = parseFloat(document.getElementById("hargaBarang").value);
    const diskon = parseFloat(document.getElementById("persenDiskon").value);
    if (isNaN(harga) || isNaN(diskon)) return preview.innerText = "❌ Masukkan harga & diskon.";
    const potongan = harga*diskon/100;
    const total = harga - potongan;
    preview.innerText = `Potongan Rp ${potongan.toLocaleString("id-ID")}`;
    hasil.innerText = `Total bayar: Rp ${total.toLocaleString("id-ID")}`;
  }

  else if (materi === "tiketKonser") {
    const kategori = document.getElementById("kategori").value;
    const sisaKursi = parseInt(document.getElementById("sisa").value);
    if (isNaN(sisaKursi) || sisaKursi<0) return preview.innerText="❌ Masukkan sisa kursi yang valid.";
    let base=0;
    if(kategori==="VIP") base=1500000;
    else if(kategori==="Regular") base=800000;
    else if(kategori==="Economy") base=400000;
    let markup=0;
    if(sisaKursi<100) markup=0.2;
    else if(sisaKursi<300) markup=0.1;
    const hargaAkhir = base*(1+markup)*1.10;
    preview.innerText=`Harga ${kategori}: Rp ${hargaAkhir.toLocaleString("id-ID")}`;
    hasil.innerText=`Sisa ${sisaKursi}, harga: Rp ${hargaAkhir.toLocaleString("id-ID")}`;
  }

  else if (materi === "hotel") {
    const malam = parseInt(document.getElementById("malam").value);
    const hari = document.getElementById("hari").value;
    const libur = document.getElementById("libur").value === "true";
    const sarapan = document.getElementById("sarapan").value === "true";
    if(isNaN(malam) || malam<=0) return preview.innerText="❌ Malam harus ≥1.";
    let base=hari==="weekday"?550000:700000;
    if(libur) base*=1.15;
    let biayaSarapan = sarapan?80000:0;
    const total = (base+biayaSarapan)*malam*1.11;
    preview.innerText=`Harga/malam: Rp ${base.toLocaleString("id-ID")}`;
    hasil.innerText=`Total bayar: Rp ${total.toLocaleString("id-ID")}`;
  }
}
