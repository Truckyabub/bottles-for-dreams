(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileNavQuery = window.matchMedia("(max-width: 900px)");

  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const backToTop = document.querySelector("[data-back-to-top]");
  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  const copyButton = document.querySelector("[data-copy-event-details]");
  const printButton = document.querySelector("[data-print-poster]");
  const comingSoonButtons = Array.from(document.querySelectorAll("[data-coming-soon]"));
  const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-item]"));
  const galleryModal = document.querySelector(".gallery-modal");
  const galleryCloseButtons = Array.from(document.querySelectorAll("[data-gallery-close]"));
  const galleryModalTitle = document.querySelector("#gallery-modal-title");
  const galleryModalCaption = document.querySelector("#gallery-modal-caption");
  const galleryModalImage = document.querySelector(".gallery-modal__image");
  const galleryModalPlaceholder = document.querySelector(".gallery-modal__placeholder");
  const galleryLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  const eventCopySource = document.querySelector("#event-copy-source");
  const galleryImageCards = Array.from(document.querySelectorAll(".gallery-card"));

  let modalTrigger = null;

  const isReducedMotion = () => prefersReducedMotion.matches;

  const syncNavState = () => {
    if (!primaryNav || !menuToggle) return;

    const mobile = mobileNavQuery.matches;
    if (!mobile) {
      primaryNav.hidden = false;
      menuToggle.setAttribute("aria-expanded", "false");
      return;
    }

    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    primaryNav.hidden = !isOpen;
  };

  const openNav = () => {
    if (!primaryNav || !menuToggle) return;
    primaryNav.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
  };

  const closeNav = () => {
    if (!primaryNav || !menuToggle) return;
    menuToggle.setAttribute("aria-expanded", "false");
    if (mobileNavQuery.matches) {
      primaryNav.hidden = true;
    }
  };

  if (menuToggle && primaryNav) {
    syncNavState();
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    primaryNav.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      closeNav();
    });

    mobileNavQuery.addEventListener("change", syncNavState);
  }

  galleryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: isReducedMotion() ? "auto" : "smooth", block: "start" });

      if (history.pushState) {
        history.pushState(null, "", href);
      }
    });
  });

  const revealObserver = "IntersectionObserver" in window && !isReducedMotion()
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" })
    : null;

  revealItems.forEach((item) => {
    if (revealObserver) {
      revealObserver.observe(item);
    } else {
      item.classList.add("is-visible");
    }
  });

  const updateBackToTop = () => {
    if (!backToTop) return;
    const shouldShow = window.scrollY > 650;
    backToTop.classList.toggle("is-visible", shouldShow);
  };

  if (backToTop) {
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: isReducedMotion() ? "auto" : "smooth" });
    });
  }

  const copyTextToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "readonly");
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  };

  const flashButtonLabel = (button, label, delay = 1700) => {
    if (!button) return;
    const original = button.textContent;
    button.textContent = label;
    window.setTimeout(() => {
      button.textContent = original;
    }, delay);
  };

  if (copyButton && eventCopySource) {
    copyButton.addEventListener("click", async () => {
      const heading = document.querySelector("#event-title");
      const copyText = [heading ? heading.innerText : "", eventCopySource.innerText]
        .filter(Boolean)
        .join("\n\n")
        .trim();

      try {
        await copyTextToClipboard(copyText);
        flashButtonLabel(copyButton, "Copied");
      } catch {
        flashButtonLabel(copyButton, "Copy failed");
      }
    });
  }

  if (printButton) {
    printButton.addEventListener("click", () => {
      window.print();
    });
  }

  comingSoonButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.alert("Coming soon after the family confirms the details.");
    });
  });

  const setModalVisible = (visible) => {
    if (!galleryModal) return;
    galleryModal.hidden = !visible;
    galleryModal.setAttribute("aria-hidden", String(!visible));
    document.body.classList.toggle("modal-open", visible);
  };

  const closeGallery = () => {
    if (!galleryModal) return;

    setModalVisible(false);
    if (galleryModalImage) {
      galleryModalImage.removeAttribute("src");
      galleryModalImage.classList.remove("is-loaded");
    }

    if (galleryModalPlaceholder) {
      galleryModalPlaceholder.hidden = false;
    }

    if (modalTrigger && typeof modalTrigger.focus === "function") {
      modalTrigger.focus();
    }

    modalTrigger = null;
  };

  const openGallery = (button) => {
    if (!galleryModal || !galleryModalTitle || !galleryModalCaption || !galleryModalImage) return;

    modalTrigger = button;
    const title = button.dataset.galleryTitle || "Gallery image";
    const caption = button.dataset.galleryCaption || title;
    const src = button.dataset.gallerySrc || "";
    const alt = button.dataset.galleryAlt || title;

    galleryModalTitle.textContent = title;
    galleryModalCaption.textContent = caption;
    galleryModalImage.alt = alt;
    galleryModalImage.classList.remove("is-loaded");

    if (galleryModalPlaceholder) {
      galleryModalPlaceholder.hidden = false;
    }

    if (src) {
      galleryModalImage.src = src;
    }

    setModalVisible(true);
    window.requestAnimationFrame(() => {
      const closeButton = galleryModal.querySelector(".gallery-modal__close");
      if (closeButton) closeButton.focus();
    });
  };

  galleryButtons.forEach((button) => {
    const img = button.querySelector("img");

    if (img) {
      const markLoaded = () => {
        button.classList.add("is-loaded");
      };

      if (img.complete && img.naturalWidth > 0) {
        markLoaded();
      } else {
        img.addEventListener("load", markLoaded, { once: true });
        img.addEventListener("error", () => {
          button.classList.remove("is-loaded");
        }, { once: true });
      }
    }

    button.addEventListener("click", () => openGallery(button));
  });

  galleryCloseButtons.forEach((button) => {
    button.addEventListener("click", closeGallery);
  });

  if (galleryModal) {
    galleryModal.addEventListener("click", (event) => {
      if (event.target.matches("[data-gallery-close]")) {
        closeGallery();
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (galleryModal && !galleryModal.hidden) {
        closeGallery();
        return;
      }

      if (primaryNav && !primaryNav.hidden && mobileNavQuery.matches) {
        closeNav();
      }
    }
  });

  window.addEventListener("scroll", updateBackToTop, { passive: true });

  window.addEventListener("resize", () => {
    syncNavState();
  });

  if (galleryModalImage) {
    galleryModalImage.addEventListener("load", () => {
      galleryModalImage.classList.add("is-loaded");
      if (galleryModalPlaceholder) {
        galleryModalPlaceholder.hidden = true;
      }
    });

    galleryModalImage.addEventListener("error", () => {
      galleryModalImage.classList.remove("is-loaded");
      if (galleryModalPlaceholder) {
        galleryModalPlaceholder.hidden = false;
      }
    });
  }

  syncNavState();
  updateBackToTop();
})();
