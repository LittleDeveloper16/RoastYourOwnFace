const video = document.getElementById("webcam");
const canvas = document.getElementById("faceCanvas");
const upload = document.getElementById("upload");
const resultText = document.getElementById("resultText");

let stream = null;

// =======================
// START CAMERA
// =======================
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.classList.add("active");
  } catch (err) {
    alert("Kamera error / ditolak 😭");
    console.log(err);
  }
}

// =======================
// CAPTURE FOTO
// =======================
function takePhoto() {
  if (!video.srcObject) {
    alert("Nyalain kamera dulu 😑");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  // stop camera
  stream.getTracks().forEach(track => track.stop());

  video.srcObject = null;
  video.src = canvas.toDataURL("image/png");
}

// =======================
// UPLOAD FOTO
// =======================
upload.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    video.srcObject = null;
    video.src = URL.createObjectURL(file);
    video.classList.add("active");
  }
});

// =======================
// ROAST SYSTEM (ADVANCED)
// =======================
function analyze() {

  if (!video.src && !video.srcObject) {
    alert("Masukin muka dulu bego 😭");
    return;
  }

  const face = [
    "muka kayak lagi mikir tapi kosong",
    "aura bangun tidur 3 hari",
    "ekspresi default NPC pasar",
    "muka buffering 240p",
    "kayak belum login ke kehidupan"
  ];

  const vibe = [
    "vibes nunggu diskon seumur hidup",
    "energi sok sibuk padahal rebahan",
    "aura 'ntar ya' tapi ga pernah",
    "vibes pengen berubah tapi mager",
    "energi anak warnet 2008"
  ];

  const effort = [
    "niat ada, hasil nihil",
    "usaha 10%, ngeluh 90%",
    "planning banyak, action nol",
    "semangat awal doang",
    "mulai bagus, selesai engga"
  ];

  const rare = [
    "ini muka side character episode 1",
    "kayak karakter filler anime",
    "vibes orang yang lupa tujuan hidup",
    "energi manusia versi trial",
    "ini build gagal di awal game"
  ];

  const ulti = [
    "KESIMPULAN: LU NPC PREMIUM 🗿",
    "FINAL: OTAK LU MASIH LOADING 🤡",
    "VERDICT: BUTUH PATCH UPDATE KEHIDUPAN",
    "KESIMPULAN: KARAKTER LU BELUM KE-UNLOCK",
    "FINAL BOSS: LU ITU BACKGROUND CHARACTER",
    "STATUS: MASIH EARLY ACCESS MANUSIA 😭"
  ];

  resultText.innerHTML = "SCANNING WAJAH LU...";

  setTimeout(() => {

    const r1 = face[Math.floor(Math.random() * face.length)];
    const r2 = vibe[Math.floor(Math.random() * vibe.length)];
    const r3 = effort[Math.floor(Math.random() * effort.length)];
    const r4 = rare[Math.floor(Math.random() * rare.length)];
    const final = ulti[Math.floor(Math.random() * ulti.length)];

    resultText.innerHTML = `
      ➤ ${r1} <br>
      ➤ ${r2} <br>
      ➤ ${r3} <br>
      ➤ ${r4} <br><br>
      💀 <b>${final}</b>
    `;

  }, 1200);
}
