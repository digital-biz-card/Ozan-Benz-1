/* ─── Screen Navigation ─── */
function toggleScreen(name) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.animation = 'none';
    s.offsetHeight; // reflow
    s.style.animation = '';
  });
  const target = document.getElementById('screen-' + name);
  if (target) target.classList.add('active');

  if (name === 'share') initQR();
}

/* ─── Toast ─── */
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = '✦ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─── Save Contact (vCard) ─── */
function saveContact() {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Ozan Benz',
    'N:Benz;Ozan;;;',
    'ORG:Audi AG',
    'TITLE:Co-Founder & Chief Visionary Officer',
    'TEL;TYPE=WORK,VOICE:+49841890',
    'TEL;TYPE=CELL:+491765550142',
    'EMAIL;TYPE=WORK:ozan.benz@audi.de',
    'URL:https://www.audi.com',
    'ADR;TYPE=WORK:;;Auto-Union-Straße 1;Ingolstadt;;85057;Germany',
    'END:VCARD'
  ].join('\n');

  const blob = new Blob([vcf], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ozan-benz.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Contact Saved');
}

/* ─── Copy Link ─── */
function copyLink() {
  const url = 'https://audi.com/team/ozan-benz';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => showToast('Link Copied'));
  } else {
    showToast('Link Copied');
  }
}

/* ─── Native Share ─── */
function nativeShare() {
  if (navigator.share) {
    navigator.share({
      title: 'Ozan Benz — Audi',
      url: 'https://audi.com/team/ozan-benz'
    }).catch(() => {});
  } else {
    copyLink();
  }
}

/* ─── Open Maps ─── */
function openMaps() {
  window.open('https://maps.google.com/?q=Audi+Forum+Ingolstadt+Germany', '_blank');
}

/* ─── QR Code ─── */
let qrDone = false;
function initQR() {
  if (qrDone) return;
  const el = document.getElementById('qr-code');
  if (!el) return;
  try {
    new QRCode(el, {
      text: 'https://audi.com/team/ozan-benz',
      width: 180,
      height: 180,
      colorDark: '#1A1A22',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.H
    });
    qrDone = true;
  } catch (e) {
    console.warn('QR init failed:', e);
  }
}
