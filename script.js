(function () {
  "use strict";

  var header = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var navLinks = document.querySelectorAll("[data-nav-link]");
  var sections = ["home", "menu", "access"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function headerOffset() {
    return header.offsetHeight;
  }

  /* ---- smooth scroll with fixed-header offset ---- */
  function scrollToTarget(targetId) {
    var target = document.getElementById(targetId);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: top, behavior: "smooth" });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("data-target");
      if (!targetId) return;
      event.preventDefault();
      scrollToTarget(targetId);
      closeMobileNav();
    });
  });

  /* ---- mobile nav toggle ---- */
  function openMobileNav() {
    mainNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "メニューを閉じる");
  }

  function closeMobileNav() {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "メニューを開く");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.contains("is-open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMobileNav();
  });

  /* ---- header background + active link on scroll ---- */
  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  function updateActiveLink() {
    var scrollPos = window.scrollY + headerOffset() + 40;
    var currentId = sections[0] ? sections[0].id : null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute("data-target") === currentId;
      link.classList.toggle("is-active", isMatch);
    });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateHeaderState();
      updateActiveLink();
      ticking = false;
    });
  });

  updateHeaderState();
  updateActiveLink();

  /* ---- scroll reveal for menu / access content ---- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
