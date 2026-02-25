const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// Scroll compression
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile toggle
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Active link detection
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach(section => observer.observe(section));





const heroSection = document.querySelector(".hero");
const sideElements = document.querySelectorAll(".side-socials, .side-email");

window.addEventListener("scroll", () => {
  const heroBottom = heroSection.getBoundingClientRect().bottom;

  if (heroBottom <= 800) {
    sideElements.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
    });
  } else {
    sideElements.forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }
});



// =============================
// HERO LOAD REVEAL
// =============================

window.addEventListener("DOMContentLoaded", () => {

    const reveals = document.querySelectorAll(".reveal");
  
    reveals.forEach(el => {
      el.classList.add("visible");
    });
  
  });




// =============================
// SCROLL REVEAL SYSTEM
// =============================

const revealSections = document.querySelectorAll(".reveal-section");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -50px 0px"
  }
);

revealSections.forEach(section => {
  revealObserver.observe(section);
});



// =============================
// SMOOTH SCROLL WITH OFFSET
// =============================

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();

      const navbarHeight = document.querySelector(".navbar").offsetHeight;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});