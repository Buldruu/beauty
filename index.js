// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 60);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);
reveals.forEach((el) => observer.observe(el));

// Filter pills
function setFilter(el, cat) {
  document
    .querySelectorAll(".filter-pills .pill")
    .forEach((p) => p.classList.remove("active"));
  el.classList.add("active");
  document.querySelectorAll(".product-card[data-cat]").forEach((card) => {
    card.style.display =
      cat === "all" || card.dataset.cat === cat ? "" : "none";
  });
}

// Quiz logic
const answers = {};
function selectOpt(el, q, val) {
  el.closest(".quiz-options")
    .querySelectorAll(".quiz-option")
    .forEach((o) => o.classList.remove("selected"));
  el.classList.add("selected");
  answers[q] = val;
}

function nextQ(current) {
  const next = current + 1;
  document.getElementById("q" + current).style.display = "none";
  document.getElementById("q" + next).style.display = "";
}

const results = {
  oily: {
    emoji: "💧",
    badge: "Oily / Combo Skin",
    title: "You have oily or combination skin!",
    desc: "Great news — oily skin stays younger longer! Here's how to keep it balanced:",
    steps: [
      "🧼 Oil-control gel cleanser (2x daily)",
      "💧 Lightweight, oil-free moisturizer",
      "🎯 Niacinamide serum to minimize pores",
    ],
  },
  dry: {
    emoji: "🌸",
    badge: "Dry / Sensitive Skin",
    title: "You have dry or sensitive skin!",
    desc: "Hydration is your superpower. Let's build a nourishing routine:",
    steps: [
      "🧴 Cream cleanser (once daily)",
      "🌿 Hyaluronic acid serum",
      "💝 Rich, calming moisturizer with ceramides",
    ],
  },
  combo: {
    emoji: "☯️",
    badge: "Combination Skin",
    title: "You have combination skin — most common!",
    desc: "Balance is key. Different areas need different care:",
    steps: [
      "🫧 Gentle foaming cleanser (2x daily)",
      "✨ Balancing toner for T-zone",
      "💧 Lightweight gel moisturizer all over",
    ],
  },
  normal: {
    emoji: "🌟",
    badge: "Normal / Balanced Skin",
    title: "Lucky you — balanced skin!",
    desc: "Maintain that natural glow with a simple routine:",
    steps: [
      "🧼 Gentle cleanser morning & night",
      "🌱 Vitamin C serum for brightness",
      "☀️ SPF moisturizer every morning",
    ],
  },
};

function showResult() {
  const skinType = answers.q1 || "combo";
  const r = results[skinType] || results.combo;
  document.getElementById("result-emoji").textContent = r.emoji;
  document.getElementById("result-badge").textContent = r.badge;
  document.getElementById("result-title").textContent = r.title;
  document.getElementById("result-desc").textContent = r.desc;
  document.getElementById("result-steps").innerHTML = r.steps
    .map(
      (s) =>
        `<p style="padding: 0.4rem 0; color: var(--text); font-size: 0.88rem; border-bottom: 1px dashed var(--pink-light);">${s}</p>`,
    )
    .join("");

  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById("q" + i);
    if (el) el.style.display = "none";
  }
  document.getElementById("q-result").style.display = "";
}

function resetQuiz() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById("q" + i);
    if (el) {
      el.style.display = i === 1 ? "" : "none";
    }
  }
  document.getElementById("q-result").style.display = "none";
  document
    .querySelectorAll(".quiz-option")
    .forEach((o) => o.classList.remove("selected"));
}

// Cart button pop animation
document.querySelectorAll(".add-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.textContent = "✓";
    this.style.background = "linear-gradient(135deg, var(--mint), #34D399)";
    setTimeout(() => {
      this.textContent = "+";
      this.style.background = "";
    }, 1500);
  });
});
