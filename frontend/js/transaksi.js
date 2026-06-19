function formatRupiah(value) {
  return `Rp ${Number(value).toLocaleString('id-ID')}`;
}

function formatTanggal(value) {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

async function renderTransaksi() {
  const body = document.getElementById('transaksi-body');
  const emptyState = document.getElementById('transaksi-empty');
  const countEl = document.getElementById('transaksi-count');

  if (!body || !emptyState || !countEl) return;

  body.innerHTML = '';
  emptyState.style.display = 'none';
  countEl.textContent = 'Total transaksi: 0';

  try {
    const data = await getTransaksi();

    if (!Array.isArray(data) || data.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    countEl.textContent = `Total transaksi: ${data.length}`;

    // render all rows and attach data-no attribute for search
    data.forEach((trx) => {
      body.innerHTML += `
        <tr data-no-transaksi="${trx.no_transaksi || ''}">
          <td>${trx.no_transaksi || '-'}</td>
          <td>${formatTanggal(trx.tanggal)}</td>
          <td>${trx.nama_kasir || '-'}</td>
          <td>${trx.nama_pelanggan || 'Umum'}</td>
          <td>${trx.metode_bayar || '-'}</td>
          <td>${formatRupiah(trx.total_harga)}</td>
          <td>${formatRupiah(trx.bayar)}</td>
          <td>${formatRupiah(trx.kembalian)}</td>
        </tr>
      `;
    });

    // attach search
    const searchInput = document.getElementById('search-transaksi');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const q = this.value.trim().toLowerCase();
        const rows = Array.from(body.querySelectorAll('tr'));
        let visible = 0;
        rows.forEach((r) => {
          const no = (r.getAttribute('data-no-transaksi') || '').toLowerCase();
          if (!q || no.includes(q)) {
            r.style.display = '';
            visible++;
          } else {
            r.style.display = 'none';
          }
        });

        // show empty state if none
        const emptyState = document.getElementById('transaksi-empty');
        if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
      });
    }
  } catch (error) {
    console.error('Gagal memuat transaksi:', error);
    emptyState.textContent = 'Gagal memuat transaksi. Silakan coba lagi.';
    emptyState.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', renderTransaksi);