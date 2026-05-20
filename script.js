const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

// =============================
// SCROLL HANDLER (combined + throttled)
// =============================
const heroSection = document.querySelector(".hero");
const sideElements = document.querySelectorAll(".side-socials, .side-email");

let scrollTicking = false;

function handleScroll() {
  // Navbar compression
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Hide side elements when leaving hero
  if (heroSection) {
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
  }

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    requestAnimationFrame(handleScroll);
    scrollTicking = true;
  }
}, { passive: true });

// Mobile toggle
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent bubbling to document
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

/* Close when clicking any nav link */
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* Close when clicking outside navLinks */
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navLinks.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
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



// =============================
// IMAGE PREVIEW SYSTEM
// =============================

const previewImages = document.querySelectorAll(".preview-image");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCloseBtn = document.getElementById("imageModalClose");

let lastFocusedElement = null;

previewImages.forEach(img => {
  img.addEventListener("click", () => {
    lastFocusedElement = document.activeElement;
    modal.classList.add("active");
    modalImage.src = img.src;
    modalImage.alt = img.alt || "Project preview";
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    // Move focus to the close button for keyboard users
    if (modalCloseBtn) modalCloseBtn.focus();
  });
});

// Close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeModal);
}

// Close when clicking outside image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.src = "";
  modalImage.alt = "";
  // Restore focus to the element that opened the modal
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

// =============================================================
// PHASE 3 — POLISH BEHAVIORS
// Loaded after the existing reveal/scroll/modal logic above.
// =============================================================

(function() {
  'use strict';

  // Single check for reduced-motion that the rest of the IIFE consults
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -----------------------------------------------------------
     1. PAGE-LOAD ENTRANCE (refinement)
     The existing system applies .visible to .reveal items on
     DOMContentLoaded. We don't fight that — instead we wait
     for the full window 'load' event (images decoded) and add
     a body class that lets us refine timing for the hero photo
     and side rails specifically.
  ----------------------------------------------------------- */

  let entranceFired = false;
  const triggerEntrance = () => {
    if (entranceFired) return;
    entranceFired = true;
    document.body.classList.add('is-loaded');
  };

  if (document.readyState === 'complete') {
    triggerEntrance();
  } else {
    window.addEventListener('load', triggerEntrance);
    setTimeout(triggerEntrance, 1500); // safety net for slow images
  }


  /* -----------------------------------------------------------
     2. LIVE LOCAL TIME
     Updates the status pill with the current time in Lagos
     (Africa/Lagos). Timezone is hardcoded so it's always Lagos
     time regardless of the visitor's location.
  ----------------------------------------------------------- */

  const timeEl = document.getElementById('liveTime');
  const pillEl = timeEl ? timeEl.closest('.status-pill') : null;

  if (timeEl && pillEl) {
    const updateTime = () => {
      try {
        const now = new Date();
        // Use Intl with explicit timezone for accuracy across visitors
        const fmt = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Africa/Lagos'
        });
        const timeStr = fmt.format(now).toLowerCase().replace(' ', '');
        timeEl.textContent = timeStr + ' in Lagos';
        pillEl.classList.add('has-time');
      } catch (e) {
        // Intl/timezone failed — leave pill as-is
      }
    };
    updateTime();
    // Update at the start of each minute, not every second (cheaper, calmer)
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(() => {
      updateTime();
      setInterval(updateTime, 60000);
    }, msToNextMinute);
  }


  /* -----------------------------------------------------------
     3. WORD-CYCLING TEXT
     Rotates through "interfaces / experiences / products / systems"
     in the hero intro line.
  ----------------------------------------------------------- */

  const cycleItems = document.querySelectorAll('.word-cycle .word-cycle-item');

  if (cycleItems.length > 1 && !prefersReducedMotion) {
    let activeIdx = 0;
    const ROTATE_MS = 2400;

    setInterval(() => {
      const current = cycleItems[activeIdx];
      const nextIdx = (activeIdx + 1) % cycleItems.length;
      const next = cycleItems[nextIdx];

      current.classList.remove('is-active');
      current.classList.add('is-leaving');

      next.classList.remove('is-leaving');
      next.classList.add('is-active');

      // Clean up the leaving state after the transition so the
      // node returns to its idle "absolutely-positioned-hidden" state
      setTimeout(() => current.classList.remove('is-leaving'), 500);

      activeIdx = nextIdx;
    }, ROTATE_MS);
  }


  /* -----------------------------------------------------------
     4. THEME TOGGLE
     Toggles the .theme-light class on <html>, persists choice,
     updates the toggle button's aria-label.
  ----------------------------------------------------------- */

  const themeToggle = document.getElementById('themeToggle');

  const updateToggleLabel = () => {
    if (!themeToggle) return;
    const isLight = document.documentElement.classList.contains('theme-light');
    themeToggle.setAttribute(
      'aria-label',
      isLight ? 'Switch to dark theme' : 'Switch to light theme'
    );
  };
  updateToggleLabel();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('theme-light');
      try {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
      } catch (e) { /* localStorage may be blocked */ }
      updateToggleLabel();
    });
  }

  // Respond to system preference changes — but only when the user hasn't
  // explicitly chosen a theme yet (no localStorage entry)
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const systemHandler = (e) => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (saved) return; // user has chosen, don't override
    document.documentElement.classList.toggle('theme-light', e.matches);
    updateToggleLabel();
  };
  if (mq.addEventListener) mq.addEventListener('change', systemHandler);
  else if (mq.addListener) mq.addListener(systemHandler);   // older Safari


  /* -----------------------------------------------------------
     5. CUSTOM CURSOR
     Two layers — a tight dot that tracks instantly, and a ring
     that lerps toward the dot for a slight follow effect.
     Disabled on touch + reduced-motion + no hover-capable input.
  ----------------------------------------------------------- */

  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (supportsHover && !prefersReducedMotion && cursorDot && cursorRing) {

    document.body.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot tracks instantly via translate (no layout work)
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    // Ring uses a lerp so it follows with a soft delay
    const lerpFactor = 0.18;
    const animateRing = () => {
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    requestAnimationFrame(animateRing);

    // Hover targets — interactive elements
    const interactiveSelector = 'a, button, [role="button"], input[type="submit"], .preview-image';
    const imageSelector = '.preview-image, .case-study-gallery img';

    document.querySelectorAll(interactiveSelector).forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (el.matches(imageSelector)) {
          document.body.classList.add('cursor-on-image');
        } else {
          document.body.classList.add('cursor-on-link');
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-on-link', 'cursor-on-image');
      });
    });

    // Hide cursor when leaving window so it doesn't sit at the edge
    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '';
      cursorRing.style.opacity = '';
    });
  }

})();
