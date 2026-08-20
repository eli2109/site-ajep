(function () {
  const cfg = window.AJEP_CONFIG || {};
  const header = document.querySelector(".site-header");
  const burger = document.querySelector(".burger");
  const modal = document.getElementById("contact-modal");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  function whatsappUrl() {
    const n = String(cfg.whatsapp || "").replace(/\D/g, "");
    if (!n) return "";
    return (
      "https://wa.me/" +
      n +
      "?text=" +
      encodeURIComponent("Bonjour, je souhaite rejoindre l’AJEP.")
    );
  }

  function goWhatsApp(e) {
    const url = whatsappUrl();
    if (url) {
      window.open(url, "_blank", "noopener");
      return;
    }
    if (e) e.preventDefault();
    openModal();
    if (status) {
      status.hidden = false;
      status.textContent =
        "Le lien WhatsApp n’est pas encore renseigné. Laisse-nous un message ici, ou ajoute le numéro dans js/config.js.";
    }
  }

  document.querySelectorAll(".js-whatsapp").forEach((el) => {
    el.addEventListener("click", goWhatsApp);
  });

  document.querySelectorAll(".js-join").forEach((el) => {
    el.addEventListener("click", (e) => {
      const url = whatsappUrl();
      if (url) {
        e.preventDefault();
        window.open(url, "_blank", "noopener");
      }
    });
  });

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

  function openModal() {
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    const input = modal.querySelector("input");
    if (input) input.focus();
  }
  function closeModal() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".js-contact").forEach((el) => {
    el.addEventListener("click", openModal);
  });
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const prenom = data.get("prenom");
    const email = data.get("email");
    const message = data.get("message");
    const to = cfg.email || "contact@ajep.fr";
    const subject = encodeURIComponent("Contact AJEP — " + prenom);
    const body = encodeURIComponent("Prénom : " + prenom + "\nE-mail : " + email + "\n\n" + message);
    window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    status.hidden = false;
    status.textContent = "Ouverture de ta messagerie…";
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
