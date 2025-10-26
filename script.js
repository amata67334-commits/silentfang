// พื้นหลังดาวระยิบ
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 1
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  stars.forEach(star => {
    ctx.moveTo(star.x, star.y);
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
  });
  ctx.fill();
  updateStars();
}

function updateStars() {
  stars.forEach(star => {
    star.y += star.d;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}
setInterval(drawStars, 50);

// ระบบล็อกอิน
function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (!u || !p) return alert("กรอกให้ครบ!");
  localStorage.setItem("user_" + u, p);
  alert("สมัครสำเร็จ! เข้าสู่ระบบได้เลย");
}

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (localStorage.getItem("user_" + u) === p) {
    localStorage.setItem("currentUser", u);
    window.location.href = "index.html";
  } else alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function buyProduct() {
  if (!localStorage.getItem("currentUser")) {
    alert("กรุณาเข้าสู่ระบบก่อนซื้อสินค้า!");
    window.location.href = "login.html";
  } else {
    alert("สั่งซื้อสำเร็จ! ขอบคุณที่อุดหนุน 🐺");
  }
}

window.onload = function () {
  const currentUser = localStorage.getItem("currentUser");
  const loginLink = document.getElementById("loginLink");
  const profileLink = document.getElementById("profileLink");
  const usernameDisplay = document.getElementById("usernameDisplay");
  if (currentUser && loginLink) {
    loginLink.innerText = "ออกจากระบบ";
    loginLink.href = "#";
    loginLink.onclick = logout;
  }
  if (usernameDisplay) usernameDisplay.textContent = currentUser || "-";
};
