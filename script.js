const c = window.SITE_CONFIG;

function applyConfig() {
  if (!c) return;

  document.title = c.business.siteTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = c.business.description;

  document.querySelectorAll("[data-brand]").forEach(el => el.textContent = c.business.brand);
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = c.business.phone);
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = c.business.email);
  document.querySelectorAll("[data-area]").forEach(el => el.textContent = c.business.area);

  document.querySelector("[data-hero-title]").textContent = c.hero.title;
  document.querySelector("[data-hero-text]").textContent = c.hero.text;
  document.querySelector("[data-about-title]").textContent = c.about.title;
  document.querySelector("[data-about-text]").textContent = c.about.text;
  document.querySelector("[data-footer-text]").textContent = c.business.footerText;
  document.querySelector("[data-copyright]").textContent = `© ${new Date().getFullYear()} ${c.business.fullName}`;

  document.querySelectorAll("[data-image]").forEach(img => {
    const key = img.dataset.image;
    if (c.images[key]) img.src = c.images[key];
  });

  renderServices();
  renderProjects();
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = c.services.map(s => `
    <article class="service-card">
      <img src="${c.images[s.imageKey]}" alt="${s.name}">
      <div class="service-content">
        <h3>${s.name}</h3>
        <p>${s.description}</p>
        <a href="#offert">Begär offert</a>
      </div>
    </article>
  `).join("");
}

function renderProjects() {
  const grid = document.getElementById("project-grid");
  grid.innerHTML = c.projects.map(p => `
    <figure class="project-card ${p.className || ""}">
      <img src="${c.images[p.imageKey]}" alt="${p.title}">
      <figcaption class="project-overlay">
        <span>${p.type}</span>
        <strong>${p.title}</strong>
      </figcaption>
    </figure>
  `).join("");
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
toggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const form = document.querySelector("[data-contact-form]");
form.addEventListener("submit", e => {
  if (c.form.mode === "external" && c.form.actionUrl) {
    form.action = c.form.actionUrl;
    return;
  }
  e.preventDefault();
  document.getElementById("form-status").textContent = "Demoformulär. Här kopplas kundens formulärtjänst in.";
  form.reset();
});

applyConfig();
