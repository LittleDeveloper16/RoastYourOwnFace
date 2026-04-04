/* ===========================
   FACE ROAST 3000 — SCRIPT.JS
   =========================== */

// ---- STATE ----
let stream = null;
let cameraActive = false;
let analyzing = false;

// ---- ROAST DATABASE ----
const PERSONALITIES = [
  {
    name: "THE MAIN CHARACTER",
    subtitle: "Protagonis kehidupan orang lain",
    color: "#ff2d78",
  },
  {
    name: "NPC PASAR MINGGU",
    subtitle: "Hadir tapi tidak berkontribusi",
    color: "#b8ff00",
  },
  {
    name: "THE PHILOSOPHER",
    subtitle: "Terlalu banyak mikir, kurang action",
    color: "#00f0ff",
  },
  {
    name: "KING OF PROCRASTINATION",
    subtitle: "Nanti aja, masih ada besok",
    color: "#ffe600",
  },
  {
    name: "ELITE OVERTHIKER™",
    subtitle: "Simulasi 47 skenario sebelum reply WA",
    color: "#ff6a00",
  },
  {
    name: "CERTIFIED VIBE CHECKER",
    subtitle: "Radar sosial kelas dunia",
    color: "#b8ff00",
  },
  {
    name: "THE CHAOTIC NEUTRAL",
    subtitle: "Tidak jahat, tidak baik, hanya random",
    color: "#ff2d78",
  },
  {
    name: "SLEEPY GENIUS",
    subtitle: "IQ 9000 tapi susah bangun pagi",
    color: "#00f0ff",
  },
];

const ROAST_LINES = [
  // Energy & Vibe
  ["⚡ Main character energy: 12%", "Kurang drama hidup lo sebenarne"],
  ["🛋️ Couch potato level: LEGENDARY", "Tapi somehow tetep produktif di kepala"],
  ["🌙 Vibes: bangun tidur 3 hari berturut-turut", "Dan masih keren entah kenapa"],
  ["🧠 Niat ada: ✅  Usaha: tidak ditemukan dalam sistem", "Pending sejak 2019"],
  ["😤 Confidence level: 47% pas di kamar, 3% pas ketemu orang baru", "Relatable banget ini"],
  ["📱 Screen time hari ini: 8 jam lebih", "Dan masih merasa kurang info"],
  ["🎯 Fokus: 2 detik  Distraksi: sepanjang hidup", ""],
  ["💤 Sleep schedule: bencana alam kategori 5", "Tapi tetep bilang 'aku morning person'"],

  // Social & Personality
  ["🗣️ Reply WA dalam 0.3 detik ke orang tertentu, ignored 3 hari ke orang lain", "Adil"],
  ["👀 Stalker medsos level: profesional berlisensi", "Tapi tidak pernah komentar"],
  ["🤝 Introvert di luar, chaos di dalam", "Dua kepribadian, satu badan"],
  ["🎭 Punya 7 persona berbeda tergantung siapa yang ngajak ngobrol", "Adaptasi atau manipulasi?"],
  ["😂 Tertawa paling keras di grup, paling sunyi di kehidupan nyata", ""],
  ["📋 To-do list: 47 item  Done: 2", "Progress adalah konsep"],
  ["🌊 Overthinking ocean: kedalaman 3000 meter", "Tidak ada yang bisa selam kesana"],
  ["🤡 Plot twist spesialis", "Hidup lo series Netflix yang belum ada season 2-nya"],

  // Ambition & Hustle
  ["🚀 Potensi: infinite  Momentum: -12", "Butuh update firmware"],
  ["💼 LinkedIn bio: 'Passionate, Driven, Leader'  Reality: belum mandi dari kemarin", ""],
  ["🏆 Compete dengan diri sendiri masa lalu  Kalah terus", "Tapi tetap maju"],
  ["📚 Baca self-improvement book: 23  Improvement aktual: 0.4%", "Tapi tiap buku berasa revelasi"],
  ["☕ Butuh kopi dulu sebelum jadi manusia", "Tanpa kopi: NPC mode aktif"],
  ["🧩 Problem solver andal  Kecuali kalau masalahnya tentang diri sendiri", ""],
  ["🔋 Battery sosial: kosong setelah 2 jam", "Perlu charge di kamar sendirian"],
  ["🌟 Bright ideas jam 2 pagi  Lupa semua jam 8 pagi", ""],
];

const STATS_POOL = [
  { label: "Main Character Energy", color: "#ff2d78" },
  { label: "NPC Potential", color: "#666" },
  { label: "Overthink Level", color: "#00f0ff" },
  { label: "Rizz Factor", color: "#b8ff00" },
  { label: "Procrastination", color: "#ff6a00" },
  { label: "Chaos Energy", color: "#ff2d78" },
  { label: "Emotional Damage", color: "#ffe600" },
  { label: "Big Boss Energy", color: "#b8ff00" },
  { label: "Vibe Score", color: "#00f0ff" },
  { label: "Sleep Debt", color: "#888" },
  { label: "Delulu Level", color: "#ff6a00" },
  { label: "Hidden Talent", color: "#b8ff00" },
];

const VERDICTS = [
  "🏆 VERDICT: MANUSIA KOMPLEKS DENGAN POTENSI YANG BELUM DIEKSEKUSI",
  "🤖 VERDICT: UNIT INI MASIH DALAM FASE BETA TESTING",
  "🌟 VERDICT: CHAOS TERKONTROL. JARANG TAPI ADA.",
  "📊 VERDICT: RATA-RATA DIATAS RATA-RATA TAPI DIBAWAH EKSPEKTASI SENDIRI",
  "🎯 VERDICT: MENAKUTKAN KALAU SERIUS. SAYANGNYA JARANG SERIUS.",
  "🧬 VERDICT: DNA 30% MAIN CHARACTER, 70% SIDEKICK YANG UNDERRATED",
  "💀 VERDICT: DEAD INSIDE TAPI TETAP FUNGSIONAL. RESPECT.",
  "🚀 VERDICT: BUTUH SATU MOMENTUM LAGI. TINGGAL SATU.",
  "🎲 VERDICT: UNPREDICTABLE SEPERTI RANDOM NUMBER GENERATOR",
  "✨ VERDICT: UNIQUE BUILD. TIDAK ADA COPY. SERVER EXCLUSIVE.",
];

const ANALYZE_STEPS = [
  "Scanning facial expression...",
  "Detecting main character syndrome...",
  "Measuring overthinking radius...",
  "Calibrating rizz sensor...",
  "Cross-checking NPC database...",
  "Analyzing sleep deprivation patterns...",
  "Computing chaos coefficient...",
  "Generating psychological profile...",
  "Finalizing roast parameters...",
  "DONE. Semua data sudah dikumpulkan 🔥",
];

// ---- UTILS ----
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ---- FLOATING EMOJIS ----
const EMOJIS = ["🔥", "💀", "🤖", "👀", "💅", "🧠", "⚡", "🌟", "😤", "🎯", "🚀", "💤"];
function spawnEmojis() {
  const container = document.getElementById("floatingEmojis");
  EMOJIS.forEach((emoji, i) => {
    const el = document.createElement("div");
    el.className = "float-emoji";
    el.textContent = emoji;
    el.style.left = `${randInt(0, 100)}%`;
    el.style.animationDuration = `${randInt(8, 20)}s`;
    el.style.animationDelay = `${randInt(0, 10)}s`;
    el.style.fontSize = `${randInt(1.5, 3.5)}rem`;
    container.appendChild(el);
  });
}
spawnEmojis();

// ---- CAMERA ----
async function startCamera() {
  const btn = document.getElementById("startBtn");
  const video = document.getElementById("webcam");
  const placeholder = document.getElementById("cameraPlaceholder");

  if (cameraActive) {
    stopCamera();
    return;
  }

  btn.textContent = "⏳ LOADING...";
  btn.disabled = true;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      audio: false,
    });

    video.srcObject = stream;
    video.classList.add("active");
    placeholder.style.display = "none";

    cameraActive = true;
    btn.textContent = "⏹ STOP CAMERA";
    btn.style.background = "#ff6a00";
    btn.disabled = false;
    document.getElementById("analyzeBtn").disabled = false;

    // Activate corners glow
    document.querySelectorAll(".corner").forEach(c => {
      c.style.animation = "cornerPulse 1.5s ease-in-out infinite";
    });

    // Add corner pulse keyframe
    if (!document.getElementById("cornerStyle")) {
      const style = document.createElement("style");
      style.id = "cornerStyle";
      style.textContent = `
        @keyframes cornerPulse {
          0%, 100% { border-color: #b8ff00; box-shadow: none; }
          50% { border-color: #00f0ff; box-shadow: 0 0 8px #00f0ff; }
        }
      `;
      document.head.appendChild(style);
    }

  } catch (err) {
    console.error("Camera error:", err);
    btn.textContent = "❌ CAMERA ERROR";
    btn.style.background = "#ff2d78";
    btn.disabled = false;
    placeholder.innerHTML = `
      <div class="placeholder-icon">🚫</div>
      <p style="color:#ff6a00;font-size:0.75rem;text-align:center;padding:0 1rem">
        Akses kamera ditolak.<br/>Allow camera di browser settings!
      </p>
    `;
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  const video = document.getElementById("webcam");
  video.srcObject = null;
  video.classList.remove("active");
  document.getElementById("cameraPlaceholder").style.display = "flex";
  document.getElementById("cameraPlaceholder").innerHTML = `
    <div class="placeholder-icon">📷</div>
    <p>kamera belum nyala bro</p>
  `;

  cameraActive = false;
  const btn = document.getElementById("startBtn");
  btn.textContent = "📷 START CAMERA";
  btn.style.background = "var(--neon-lime)";
  document.getElementById("analyzeBtn").disabled = true;

  document.querySelectorAll(".corner").forEach(c => {
    c.style.animation = "none";
    c.style.borderColor = "var(--neon-lime)";
  });
}

// ---- ANALYZE ----
async function analyzeface() {
  if (analyzing || !cameraActive) return;
  analyzing = true;

  const analyzeBtn = document.getElementById("analyzeBtn");
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = "⏳ ANALYZING...";

  // Screen flash
  flashScreen();

  // Start scan line
  const scanLine = document.getElementById("scanLine");
  scanLine.classList.add("active");

  // Show analyzing overlay
  const overlay = document.getElementById("analyzingOverlay");
  overlay.classList.add("active");

  // Animate progress bar + steps
  await runAnalyzingAnimation();

  // Hide overlay + scan line
  overlay.classList.remove("active");
  scanLine.classList.remove("active");

  // Generate and show result
  showResult();

  analyzeBtn.disabled = false;
  analyzeBtn.textContent = "🔥 ANALYZE FACE";
  analyzing = false;
}

function flashScreen() {
  let flash = document.querySelector(".screen-flash");
  if (!flash) {
    flash = document.createElement("div");
    flash.className = "screen-flash";
    document.body.appendChild(flash);
  }
  flash.classList.add("active");
  setTimeout(() => flash.classList.remove("active"), 100);
}

function runAnalyzingAnimation() {
  return new Promise(resolve => {
    const fill = document.getElementById("analyzingFill");
    const steps = document.getElementById("analyzingSteps");
    const totalDuration = 2800;
    const stepCount = ANALYZE_STEPS.length;
    let current = 0;

    const interval = setInterval(() => {
      if (current >= stepCount) {
        clearInterval(interval);
        fill.style.width = "100%";
        setTimeout(resolve, 300);
        return;
      }
      const pct = Math.round(((current + 1) / stepCount) * 100);
      fill.style.width = pct + "%";
      steps.textContent = ANALYZE_STEPS[current];
      current++;
    }, totalDuration / stepCount);
  });
}

// ---- SHOW RESULT ----
function showResult() {
  const resultIdle = document.getElementById("resultIdle");
  const resultContent = document.getElementById("resultContent");

  // Pick random data
  const personality = rand(PERSONALITIES);
  const roastLines = shuffle(ROAST_LINES).slice(0, 4);
  const statsRaw = shuffle(STATS_POOL).slice(0, 4);
  const verdict = rand(VERDICTS);

  const stats = statsRaw.map(s => ({
    ...s,
    value: randInt(12, 97),
  }));

  // Populate name
  document.getElementById("resultName").textContent = personality.name;
  document.getElementById("resultName").style.color = personality.color;

  // Populate stats
  const statsGrid = document.getElementById("statsGrid");
  statsGrid.innerHTML = stats.map(s => `
    <div class="stat-item">
      <span class="stat-label">${s.label}</span>
      <div class="stat-value">${s.value}%</div>
      <div class="stat-bar">
        <div class="stat-bar-fill" style="width:0%; background:${s.color}" data-target="${s.value}"></div>
      </div>
    </div>
  `).join("");

  // Populate roast
  const roastBox = document.getElementById("roastBox");
  roastBox.innerHTML = roastLines.map(([line, sub]) => `
    <div class="roast-line">
      <span class="roast-arrow">▶</span>
      <span>${line}${sub ? `<br/><span style="color:#888;font-size:0.7em">  ${sub}</span>` : ""}</span>
    </div>
  `).join("");

  // Populate verdict
  document.getElementById("verdictBox").textContent = verdict;

  // Switch display
  resultIdle.style.display = "none";
  resultContent.style.display = "block";

  // Animate stat bars after render
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll(".stat-bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.target + "%";
      });
    }, 100);
  });
}

// ---- TRY AGAIN ----
function tryAgain() {
  const resultContent = document.getElementById("resultContent");
  resultContent.style.animation = "none";
  resultContent.offsetHeight; // reflow
  resultContent.style.animation = "";

  if (cameraActive) {
    analyzeface();
  } else {
    showResult();
  }
}

// ---- COPY RESULT ----
function copyResult() {
  const name = document.getElementById("resultName").textContent;
  const verdict = document.getElementById("verdictBox").textContent;
  const lines = [...document.querySelectorAll(".roast-line")].map(l => l.textContent.trim().replace(/\s+/g, " ")).join("\n");

  const text = `🔥 FACE ROAST 3000 RESULTS 🔥\n\nPROFILE: ${name}\n\n${lines}\n\n${verdict}\n\n(roasted by FACE ROAST 3000)`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast("✅ COPIED TO CLIPBOARD!"));
  } else {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showToast("✅ COPIED!");
  }
}

function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---- KEYBOARD SHORTCUT ----
document.addEventListener("keydown", e => {
  if (e.code === "Space" && cameraActive && !analyzing) {
    e.preventDefault();
    analyzeface();
  }
  if (e.code === "KeyC" && !cameraActive) {
    startCamera();
  }
});

// ---- EASTER EGG: Konami Code ----
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let konamiIdx = 0;
document.addEventListener("keydown", e => {
  if (e.key === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      konamiIdx = 0;
      showToast("🎮 CHEAT CODE ACTIVATED: ULTRA ROAST MODE 💀");
      document.body.style.animation = "rainbowBg 0.5s linear infinite";
      if (!document.getElementById("rainbowStyle")) {
        const s = document.createElement("style");
        s.id = "rainbowStyle";
        s.textContent = `@keyframes rainbowBg { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }`;
        document.head.appendChild(s);
      }
      setTimeout(() => {
        document.body.style.animation = "";
      }, 3000);
    }
  } else {
    konamiIdx = 0;
  }
});

// ---- INIT ----
console.log("%c FACE ROAST 3000 🔥 ", "background:#ff2d78;color:#fff;font-size:2rem;font-weight:bold;padding:8px 16px");
console.log("%c Tips: Tekan SPACE untuk analyze (saat kamera aktif) | C untuk nyalain kamera", "color:#b8ff00;background:#0a0a0a;padding:4px 8px");
