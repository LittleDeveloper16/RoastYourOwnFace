const video = document.getElementById("video");
const preview = document.getElementById("preview");
const upload = document.getElementById("upload");
const result = document.getElementById("result");

let stream;

// kamera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.style.display = "block";
    preview.style.display = "none";
  } catch {
    alert("Kamera error 😭");
  }
}

// ambil foto
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

// upload
upload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);

    preview.style.display = "block";
    video.style.display = "none";
  }
});

// roast
function analyze() {
  const roast = [
    "NPC pasar minggu 100%",
    "vibes capek padahal ga ngapa-ngapain",
    "energi anak warnet",
    "main character gagal",
    "aura nunggu diskon",
    "niat ada, usaha hilang",
  ];

  result.innerText = "Analyzing...";

  setTimeout(() => {
    result.innerText = roast[Math.floor(Math.random()*roast.length)];
  }, 1000);
}
