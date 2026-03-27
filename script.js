const video = document.getElementById("video");
const preview = document.getElementById("preview");
const upload = document.getElementById("upload");
const result = document.getElementById("result");

let stream;

// START CAMERA
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.style.display = "block";
    preview.style.display = "none";

  } catch (err) {
    alert("Kamera error / ditolak 😭");
    console.log(err);
  }
}

// CAPTURE FOTO
function takePhoto() {
  if (!video.srcObject) {
    alert("Nyalain kamera dulu 😑");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  preview.src = canvas.toDataURL("image/png");

  preview.style.display = "block";
  video.style.display = "none";
}

// UPLOAD FOTO
upload.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    preview.src = URL.createObjectURL(file);

    preview.style.display = "block";
    video.style.display = "none";
  }
});

// ANALYZE
function analyze() {

  if (!preview.src && !video.srcObject) {
    alert("Pilih foto dulu 😑");
    return;
  }

  const roast = [
    "NPC pasar minggu 100%",
    "vibes capek padahal ga ngapa-ngapain",
    "energi anak warnet 2008",
    "main character gagal total",
    "aura nunggu diskon",
    "vibes tukang galon galau",
    "niat ada, usaha hilang",
    "energi bangun tidur 3 hari",
    "muka kayak mikir tapi kosong",
    "aura 'ntar ya' tapi ga pernah"
  ];

  result.innerText = "Analyzing... 🧠";

  setTimeout(() => {
    const random = roast[Math.floor(Math.random() * roast.length)];
    result.innerText = random;
  }, 1200);
}
