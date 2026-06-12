const projects = {
  mushroom: {
    index: "PROJECT 01",
    title: "蘑菇宠医",
    description:
      "医疗健康小程序改版项目，围绕宠物问诊路径、医生匹配效率和服务转化进行体验优化。",
    image: "assets/mushroom-project.jpg",
  },
  fitness: {
    index: "PROJECT 02",
    title: "悦动伙伴",
    description:
      "运动健康 App 从 0 到 1 设计，结合成长激励、愿望系统、品牌 IP 与运动服务场景。",
    image: "assets/fitness-project.jpg",
  },
};

const panels = [...document.querySelectorAll(".panel")];
const sectionDots = document.querySelector(".section-dots");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const projectDialog = document.querySelector(".project-dialog");
const contactDialog = document.querySelector(".contact-dialog");
const dialogImage = document.querySelector(".dialog-image");
const dialogCanvas = document.querySelector(".dialog-canvas");
const zoomOutput = document.querySelector(".zoom-controls output");
let zoom = 1;

panels.forEach((panel) => {
  const dot = document.createElement("a");
  dot.href = `#${panel.id}`;
  dot.setAttribute("aria-label", panel.dataset.label);
  sectionDots.append(dot);
});

const dotLinks = [...sectionDots.querySelectorAll("a")];

const setActiveSection = (id) => {
  [...navLinks, ...dotLinks].forEach((link) => {
    const active = link.hash === `#${id}`;
    if (active) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
      if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
        setActiveSection(entry.target.id);
      }
    });
  },
  { threshold: [0.15, 0.45, 0.7] },
);

panels.forEach((panel) => sectionObserver.observe(panel));

menuToggle.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const renderZoom = () => {
  dialogImage.style.width = `${zoom * 100}%`;
  zoomOutput.value = `${Math.round(zoom * 100)}%`;
};

const openProject = (key) => {
  const project = projects[key];
  if (!project) return;

  projectDialog.querySelector(".dialog-index").textContent = project.index;
  projectDialog.querySelector(".dialog-title").textContent = project.title;
  projectDialog.querySelector(".dialog-description").textContent = project.description;
  dialogImage.src = project.image;
  dialogImage.alt = `${project.title}项目界面长图`;
  zoom = 1;
  renderZoom();
  projectDialog.showModal();
};

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project));
});

projectDialog.querySelector(".dialog-close").addEventListener("click", () => {
  projectDialog.close();
});

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.zoom;
    zoom = direction === "in" ? Math.min(2, zoom + 0.25) : Math.max(0.75, zoom - 0.25);
    renderZoom();
    dialogCanvas.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
});

document.querySelector("[data-contact]").addEventListener("click", () => {
  contactDialog.showModal();
});

document.querySelector("[data-contact-close]").addEventListener("click", () => {
  contactDialog.close();
});

contactDialog.addEventListener("click", (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

window.addEventListener("load", () => {
  requestAnimationFrame(() => document.body.classList.add("loaded"));
});
