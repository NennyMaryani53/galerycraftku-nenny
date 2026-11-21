// Menu navigasi responsif
const menuButton = document.querySelector('.nenny_toggle');
const navigationsLinks = document.querySelector('.nenny_links');

if (menuButton && navigationsLinks) {
    menuButton.addEventListener('click', () => {
        navigationsLinks.classList.toggle('active');
    });
}

// Filter produk berdasarkan kategori di katalog
const categoryButtons = document.querySelectorAll('.nenny_filter-btn');
const catalogProduct = document.querySelectorAll('[data-category]');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {

        // Tandai tombol kategori yang sedang dipilih
        categoryButtons.forEach(item => item.classList.remove('nenny_active'));
        button.classList.add('nenny_active');

        // Tampilkan produk yang sesuai dengan kategori pilihan
        const selectedCategory = button.dataset.filter;
        catalogProduct.forEach(product => {
            product.style.display = selectedCategory === 'semua' ||
                product.dataset.category == selectedCategory ? '' : 'none';
        });
    });
}); 

// Kalkulator estimasi harga custom di halaman custom buket
const flowerPrice = document.querySelector('#nenny_flower');
const bouquetSize = document.querySelector('#nenny_size');
const wrappingPrice = document.querySelector('#nenny_wrapping');
const estimasiPrice = document.querySelector('#nenny_estimasi-price');

function calculateCustomPrice() {
    // Kalkulator hanya dijalankan pada halaman yang memiliki seluruh input
    if (!flowerPrice || !bouquetSize || !wrappingPrice ||!estimasiPrice) return;

    const totalPrice = Number(flowerPrice.value) +
        Number(bouquetSize.value) + Number(wrappingPrice.value);

    estimasiPrice.textContent = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(totalPrice);
}

// Perbarui estimasi saat pilihan bunga, ukuran, atau wrapping berubah
[flowerPrice, bouquetSize, wrappingPrice].forEach(input => {
    if (input) input.addEventListener('change', calculateCustomPrice);
});
calculateCustomPrice();

// FAQ buka-tutup pada halaman testimoni
document.querySelectorAll('.nenny_faq-question').forEach(questionButton => {
    questionButton.addEventListener('click', () => {
        const faqItem = questionButton.closest('.nenny_faq-item');
        faqItem.classList.toggle('nenny_open');

        // Ubah simbol + jadi - ketika jawaban dibuka
        const faqIcon = questionButton.querySelector('.nenny_faq-icon');
        if (faqIcon) {
            faqIcon.textContent = faqItem.classList.contains('nenny_open') ? '-' : '+';
        }
    });
});

// Form kontak - kirim ke email
const emailTujuan = 'nennymaryani01@gmail.com';

const orderForm = document.querySelector('#nenny_form-order');

if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(orderForm);

        const nama = formData.get('nama');
        const kontak = formData.get('contact');
        const produk = formData.get('produk');
        const pesan = formData.get('message');

        const subject = 'Pesanan dari Halaman Kontak - Galery Craftku';

        const body = `
Halo Galery Craftku,

Saya ingin memesan produk dengan detail berikut:

Nama: ${nama}
Kontak: ${kontak}
Pilihan Buket: ${produk}
Detail Pesanan: ${pesan}

Terima kasih.
        `;

        window.location.href =
            `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

// Form custom - kirim ke email
const customForm = document.querySelector('#nenny_order-form');

if (customForm) {
    customForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(customForm);

        const flower = customForm.querySelector('#nenny_flower');
        const size = customForm.querySelector('#nenny_size');
        const wrapping = customForm.querySelector('#nenny_wrapping');

        const flowerName = flower.selectedOptions[0].text;
        const sizeName = size.selectedOptions[0].text;
        const wrappingName = wrapping.selectedOptions[0].text;

        const product = formData.get('product');
        const message = formData.get('message');

        const totalPrice =
            Number(flower.value) +
            Number(size.value) +
            Number(wrapping.value);

        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(totalPrice);

        const subject = 'Pesanan Custom Buket - Galery Craftku';

        const body = `
Halo Galery Craftku,

Saya ingin memesan Custom Buket dengan detail berikut:

Pilihan Buket: ${product}
Jenis Bunga: ${flowerName}
Ukuran Buket: ${sizeName}
Warna Wrapping: ${wrappingName}
Estimasi Harga: ${formattedPrice}

Kartu Ucapan / Detail Request:
${message}

Terima kasih.
        `;

        window.location.href =
            `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
