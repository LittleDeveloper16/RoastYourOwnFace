const video = document.getElementById("webcam");
const canvas = document.getElementById("faceCanvas");
const upload = document.getElementById("upload");
const resultText = document.getElementById("resultText");

let stream = null;

// CAMERA
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.classList.add("active");
  } catch (e) {
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

// ROAST SYSTEM
function analyze() {

  if (!video.src && !video.srcObject) {
    alert("Masukin muka dulu 😭");
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

  resultText.innerHTML = "SCANNING...";

  setTimeout(() => {

    const data = [
      face[Math.floor(Math.random() * face.length)],
      vibe[Math.floor(Math.random() * vibe.length)],
      effort[Math.floor(Math.random() * effort.length)],
      rare[Math.floor(Math.random() * rare.length)]
    ];

    const final = ulti[Math.floor(Math.random() * ulti.length)];

    // CLEAR
    resultText.innerHTML = "";

    // TAMBAH 4 BARIS (ANTI ILANG)
    data.forEach(text => {
      const div = document.createElement("div");
      div.textContent = "➤ " + text;
      resultText.appendChild(div);
    });

    // ULTI
    const end = document.createElement("div");
    end.innerHTML = "<br>💀 <b>" + final + "</b>";
    resultText.appendChild(end);

  }, 1200);
}
