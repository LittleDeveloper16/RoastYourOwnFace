const video = document.getElementById("webcam");
const canvas = document.getElementById("faceCanvas");
const upload = document.getElementById("upload");
const resultContent = document.getElementById("resultContent");

let stream = null;

// RANDOM
function rand() {
  return Math.floor(Math.random() * 100);
}

// CAMERA
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.classList.add("active");
  } catch {
    alert("Kamera error 😭");
  }
}

// CAPTURE
function takePhoto() {
  if (!video.srcObject) {
    alert("Nyalain kamera dulu 😑");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  stream.getTracks().forEach(t => t.stop());

  video.srcObject = null;
  video.src = canvas.toDataURL("image/png");
}

// UPLOAD
upload.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    if (stream) stream.getTracks().forEach(t => t.stop());

    video.srcObject = null;
    video.src = URL.createObjectURL(file);
    video.classList.add("active");
  }
});

// ROAST FINAL
function analyze() {

  if (!video.src && !video.srcObject) {
    alert("Masukin muka dulu 😭");
    return;
  }

  const face = [
    "muka kayak lagi mikir tapi kosong",
    "aura bangun tidur 3 hari",
    "ekspresi default NPC pasar",
    "muka buffering 240p"
  ];

  const vibe = [
    "vibes nunggu diskon seumur hidup",
    "energi sok sibuk padahal rebahan",
    "aura 'ntar ya' tapi ga pernah"
  ];

  const effort = [
    "niat ada, hasil nihil",
    "usaha 10%, ngeluh 90%",
    "planning banyak, action nol"
  ];

  const rare = [
    "ini muka side character episode 1",
    "karakter filler anime",
    "build gagal di awal game"
  ];

  const ulti = [
    "KESIMPULAN: LU NPC PREMIUM 🗿",
    "FINAL: OTAK LU MASIH LOADING 🤡",
    "FINAL BOSS: LU ITU BACKGROUND CHARACTER"
  ];

  resultContent.innerHTML = `<div class="idle-text">SCANNING...</div>`;

  setTimeout(() => {

    const r1 = face[Math.floor(Math.random() * face.length)];
    const r2 = vibe[Math.floor(Math.random() * vibe.length)];
    const r3 = effort[Math.floor(Math.random() * effort.length)];
    const r4 = rare[Math.floor(Math.random() * rare.length)];
    const final = ulti[Math.floor(Math.random() * ulti.length)];

    resultContent.innerHTML = `
      <div class="result-content">

        <div class="result-header">HASIL ANALISIS</div>

        <div class="result-name">MANUSIA RANDOM</div>

        <div class="stats-grid">

          <div class="stat-item">
            <span class="stat-label">KEPERCAYAAN DIRI</span>
            <div class="stat-value">${rand()}%</div>
            <div class="stat-bar"><div class="stat-bar-fill" style="width:${rand()}%"></div></div>
          </div>

          <div class="stat-item">
            <span class="stat-label">KECERDASAN</span>
            <div class="stat-value">${rand()}%</div>
            <div class="stat-bar"><div class="stat-bar-fill" style="width:${rand()}%"></div></div>
          </div>

          <div class="stat-item">
            <span class="stat-label">USAHA HIDUP</span>
            <div class="stat-value">${rand()}%</div>
            <div class="stat-bar"><div class="stat-bar-fill" style="width:${rand()}%"></div></div>
          </div>

          <div class="stat-item">
            <span class="stat-label">AURA UTAMA</span>
            <div class="stat-value">${rand()}%</div>
            <div class="stat-bar"><div class="stat-bar-fill" style="width:${rand()}%"></div></div>
          </div>

        </div>

        <div class="roast-box">
          <div class="roast-line"><span class="roast-arrow">➤</span>${r1}</div>
          <div class="roast-line"><span class="roast-arrow">➤</span>${r2}</div>
          <div class="roast-line"><span class="roast-arrow">➤</span>${r3}</div>
          <div class="roast-line"><span class="roast-arrow">➤</span>${r4}</div>
        </div>

        <div class="verdict-box">
          💀 ${final}
        </div>

      </div>
    `;

  }, 1200);
}
