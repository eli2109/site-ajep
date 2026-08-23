(function () {
  const cfg = window.AJEP_CONFIG || {};
  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".burger");
  const joinCard = document.getElementById("join-card");
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const status = document.getElementById("form-status");

  function openJoinForm(e) {
    if (e) e.preventDefault();
    document.body.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    joinCard.classList.add("is-open");
    joinCard.classList.remove("is-success");
    document.body.classList.add("form-open");
    form.hidden = false;
    success.hidden = true;
    document.getElementById("rejoindre").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const first = form.querySelector("input, textarea");
      if (first) first.focus({ preventScroll: true });
    }, 450);
  }

  document.querySelectorAll(".js-join").forEach((el) => {
    el.addEventListener("click", openJoinForm);
  });

  if (location.hash === "#rejoindre") {
    window.setTimeout(() => openJoinForm(), 200);
  }

  const ig = document.querySelector(".js-instagram");
  if (ig && cfg.instagram) {
    ig.hidden = false;
    ig.href = cfg.instagram;
  }

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    },
    { passive: true }
  );

  burger.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });

  document.querySelector(".nav-panel").addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      document.body.classList.remove("nav-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  function showSuccess() {
    joinCard.classList.add("is-success");
    joinCard.classList.remove("is-open");
    document.body.classList.remove("form-open");
    form.hidden = true;
    success.hidden = false;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nom = String(data.get("nom") || "").trim();
    const age = String(data.get("age") || "").trim();
    const tel = String(data.get("telephone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const interets = data.getAll("interet");
    const to = cfg.email || "contact@ajep.fr";
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;

    const payload = {
      nom: nom,
      age: age,
      telephone: tel,
      interets: interets.length ? interets.join(", ") : "non précisé",
      message: message,
      _subject: "AJEP — demande de contact — " + nom,
    };

    fetch("https://formsubmit.co/ajax/" + encodeURIComponent(to), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
      .catch(() => null)
      .finally(() => {
        showSuccess();
        if (btn) btn.disabled = false;
        if (status) status.hidden = true;
      });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
