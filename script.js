const video = document.getElementById("webcam");
const canvas = document.getElementById("faceCanvas");
const upload = document.getElementById("upload");
const resultText = document.getElementById("resultText");

let stream = null;

// START CAMERA
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.classList.add("active");
  } catch (err) {
    alert("Kamera error / ditolak");
  }
}

// CAPTURE FOTO
function takePhoto() {
  if (!video.srcObject) {
    alert("Nyalain kamera dulu 😑");
    return;
  }

  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);
  video.srcObject = null;
  video.src = canvas.toDataURL("image/png");
}

// UPLOAD FOTO
upload.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    video.srcObject = null;
    video.src = URL.createObjectURL(file);
    video.classList.add("active");
  }
});

// ROAST
function analyze() {
  const roast = [
    "NPC pasar minggu 100%",
    "muka kayak lagi loading tapi ga pernah selesai",
    "energi bangun tidur 3 hari",
    "niat ada, hasil nihil",
    "vibes nunggu diskon seumur hidup",
    "main character gagal total"
  ];

  resultText.innerText = "ANALYZING...";

  setTimeout(() => {
    resultText.innerText = roast[Math.floor(Math.random()*roast.length)];
  }, 1200);
}
