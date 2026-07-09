/* ============================================
   DevBlog — main.js
   ============================================ */

/* === 다크모드 토글 === */
const darkToggle = document.getElementById("darkToggle");
const toggleIcon = darkToggle.querySelector(".toggle-icon");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleIcon.textContent = isDark ? "☀️" : "🌙";
});

/* === 코드 복사 버튼 === */
document.querySelectorAll(".copy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const codeEl = document.getElementById(targetId);
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
      btn.textContent = "✓ 복사됨";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "복사";
        btn.classList.remove("copied");
      }, 2000);
    }).catch(() => {
      btn.textContent = "복사 실패";
      setTimeout(() => { btn.textContent = "복사"; }, 2000);
    });
  });
});

/* === Flexbox 데모 인터랙션 === */
const flexDemo = document.getElementById("flexDemo");
const flexBtns = document.querySelectorAll(".flex-btn");

flexBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    flexBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    flexDemo.style.justifyContent = btn.getAttribute("data-justify");
  });
});

/* === 라이브 다크모드 데모 === */
const demoToggle = document.getElementById("demoToggle");
const demoWindow = document.getElementById("demoWindow");

demoToggle.addEventListener("click", () => {
  demoWindow.classList.toggle("demo-dark");
  const isDark = demoWindow.classList.contains("demo-dark");
  demoToggle.textContent = isDark ? "☀️ 라이트모드" : "🌙 다크모드";
});

/* === 카드 스크롤 등장 애니메이션 === */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".card").forEach(card => {
  observer.observe(card);
});

/* === 헤더 스크롤 그림자 === */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "none";
  }
}, { passive: true });
