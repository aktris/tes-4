// --- URL GOOGLE SCRIPT LU UDAH GUE PASANGIN ---
const scriptURL = 'https://script.google.com/macros/s/AKfycbwJnx4osfo-n8K1e6qeVmZhkAucHYF18J1FNpmswJOij6-U_sLATx741StzCk892iEsyw/exec'; 
// -----------------------------------------------

AOS.init({ duration: 1000, once: true });

const tombolBuka = document.getElementById('tombol-buka');
const layarPembuka = document.getElementById('layar-pembuka');
const isiUndangan = document.getElementById('isi-undangan');
const musikLatar = document.getElementById('musik-latar');

// Efek Buka Undangan Modern
tombolBuka.addEventListener('click', () => {
    if (musikLatar.paused) {
        musikLatar.play().catch(e => console.log("Auto-play diblokir:", e));
    }

    // Animasi naik/fade out
    layarPembuka.style.transform = 'translateY(-100%)';
    layarPembuka.style.transition = 'transform 1s cubic-bezier(0.645, 0.045, 0.355, 1)';
    
    setTimeout(() => {
        layarPembuka.style.display = 'none';
        isiUndangan.classList.remove('sembunyi');
        document.body.classList.remove('kunci-scroll');
        AOS.refresh();
    }, 1000);
});

// Hitung Mundur
const targetDate = new Date("June 6, 2026 07:30:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        document.getElementById("hari").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("jam").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("menit").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("detik").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
}, 1000);

// Copy Text Bank
function salinTeks(teks, btn) {
    navigator.clipboard.writeText(teks).then(() => {
        const originalIcon = btn.innerHTML;
        // Ganti jadi icon centang
        btn.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'><path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z'/></svg>`;
        setTimeout(() => { btn.innerHTML = originalIcon; }, 2000);
    });
}

// RSVP
const form = document.forms['submit-ke-google-sheet'];
const btnKirim = document.getElementById('tombol-kirim');
if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      btnKirim.innerHTML = 'MENGIRIM...';
      btnKirim.style.pointerEvents = 'none';

      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
          btnKirim.innerHTML = 'BERHASIL TERKIRIM';
          btnKirim.style.background = '#ffffff'; 
          btnKirim.style.color = '#222222'; 
          form.reset(); 
          setTimeout(() => {
            btnKirim.innerHTML = 'KIRIM KONFIRMASI';
            btnKirim.style.background = 'transparent';
            btnKirim.style.color = '#ffffff';
            btnKirim.style.pointerEvents = 'auto';
          }, 3000);
        })
        .catch(error => {
          btnKirim.innerHTML = 'GAGAL!';
          setTimeout(() => { btnKirim.innerHTML = 'KIRIM KONFIRMASI'; btnKirim.style.pointerEvents = 'auto'; }, 3000);
        });
    });
}