/* =========================================================
   PENSOU SEGUROS
   Cotação rápida → WhatsApp
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const WHATSAPP = "5511976828160";
  const body = document.body;

  /* ANO */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* MENU MOBILE */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const open = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuToggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

    });

    mainNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.innerHTML =
          '<i class="fa-solid fa-bars"></i>';

      });

    });

  }


  /* FAQ */

  document.querySelectorAll(".faq-item").forEach(item => {

    const button = item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {

      const wasActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(other => {

        other.classList.remove("active");

        const otherButton =
          other.querySelector(".faq-question");

        if (otherButton) {
          otherButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });

      if (!wasActive) {

        item.classList.add("active");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  /* COTAÇÃO */

  const quoteModal =
    document.getElementById("quoteModal");

  const quoteClose =
    document.getElementById("quoteClose");

  const quoteBackdrop =
    quoteModal?.querySelector(".quote-modal-backdrop");

  const quoteForm =
    document.getElementById("quoteForm");

  const quoteSteps =
    [...document.querySelectorAll(".quote-step")];

  const quotePrev =
    document.getElementById("quotePrev");

  const quoteNext =
    document.getElementById("quoteNext");

  const quoteSend =
    document.getElementById("quoteSend");

  const quoteProgressBar =
    document.getElementById("quoteProgressBar");

  const quoteStepCounter =
    document.getElementById("quoteStepCounter");

  const formStatus =
    document.getElementById("formStatus");

  const quoteSummary =
    document.getElementById("quoteSummary");

  const whatsappInput =
    document.getElementById("quoteWhatsapp");

  let currentStep = 1;
  const totalSteps = 3;
  let returnFocus = null;


  function digitsOnly(value) {

    return String(value || "")
      .replace(/\D/g, "");

  }


  function formatPhone(value) {

    let digits =
      digitsOnly(value).slice(0, 11);

    if (digits.length <= 10) {

      digits = digits.replace(
        /^(\d{2})(\d)/,
        "($1) $2"
      );

      digits = digits.replace(
        /(\d{4})(\d)/,
        "$1-$2"
      );

    } else {

      digits = digits.replace(
        /^(\d{2})(\d)/,
        "($1) $2"
      );

      digits = digits.replace(
        /(\d{5})(\d)/,
        "$1-$2"
      );

    }

    return digits;

  }


  function clearStatus() {

    if (!formStatus) return;

    formStatus.textContent = "";
    formStatus.className = "form-status";

  }


  function showError(message) {

    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = "form-status error";

  }


  function showStep(step) {

    currentStep = step;

    quoteSteps.forEach(item => {

      item.classList.toggle(
        "active",
        Number(item.dataset.step) === currentStep
      );

    });

    if (quoteProgressBar) {

      quoteProgressBar.style.width =
        `${(currentStep / totalSteps) * 100}%`;

    }

    if (quoteStepCounter) {

      quoteStepCounter.textContent =
        `Etapa ${currentStep} de ${totalSteps}`;

    }

    if (quotePrev) {

      quotePrev.style.visibility =
        currentStep === 1
          ? "hidden"
          : "visible";

    }

    if (quoteNext) {

      quoteNext.hidden =
        currentStep === totalSteps;

    }

    if (quoteSend) {

      quoteSend.hidden =
        currentStep !== totalSteps;

    }

    clearStatus();

    const dialog =
      quoteModal?.querySelector(".quote-modal-dialog");

    if (dialog) {
      dialog.scrollTop = 0;
    }

  }


  function resetQuote() {

    quoteForm?.reset();

    if (quoteSummary) {
      quoteSummary.innerHTML = "";
    }

    if (quoteSend) {
      quoteSend.href = "#";
    }

    showStep(1);

  }


  function openQuote(selectedInsurance = "") {

    if (!quoteModal || !quoteForm) return;

    returnFocus = document.activeElement;

    resetQuote();

    if (selectedInsurance) {

      const selected =
        [...quoteForm.querySelectorAll(
          'input[name="seguro"]'
        )].find(
          input =>
            input.value === selectedInsurance
        );

      if (selected) {
        selected.checked = true;
      }

    }

    quoteModal.classList.add("open");

    quoteModal.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("modal-open");

    setTimeout(
      () => quoteClose?.focus(),
      0
    );

  }


  function closeQuote() {

    if (!quoteModal) return;

    quoteModal.classList.remove("open");

    quoteModal.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("modal-open");

    if (
      returnFocus &&
      typeof returnFocus.focus === "function"
    ) {
      returnFocus.focus();
    }

  }


  document
    .querySelectorAll(
      ".open-quote, .quote-type, .quick-quote-option"
    )
    .forEach(button => {

      button.addEventListener("click", () => {

        openQuote(
          button.dataset.insurance || ""
        );

      });

    });


  quoteClose?.addEventListener(
    "click",
    closeQuote
  );


  quoteBackdrop?.addEventListener(
    "click",
    closeQuote
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        quoteModal?.classList.contains("open")
      ) {
        closeQuote();
      }

    }
  );


  function validateStep() {

    if (!quoteForm) return false;

    if (currentStep === 1) {

      const insurance =
        quoteForm.querySelector(
          'input[name="seguro"]:checked'
        );

      if (!insurance) {

        showError(
          "Escolha o tipo de seguro para continuar."
        );

        return false;

      }

      return true;

    }


    if (currentStep === 2) {

      const name =
        quoteForm.elements.nome;

      const phone =
        quoteForm.elements.whatsapp;

      const consent =
        quoteForm.elements.consentimento;


      if (
        !name.value.trim() ||
        name.value.trim().length < 2
      ) {

        name.focus();

        showError(
          "Informe seu nome para continuar."
        );

        return false;

      }


      const phoneDigits =
        digitsOnly(phone.value);

      if (
        phoneDigits.length < 10 ||
        phoneDigits.length > 11
      ) {

        phone.focus();

        showError(
          "Informe um WhatsApp válido com DDD."
        );

        return false;

      }


      if (!consent.checked) {

        consent.focus();

        showError(
          "Autorize o uso dos dados para continuar."
        );

        return false;

      }

      return true;

    }

    return true;

  }


  function buildSummaryAndWhatsApp() {

    if (
      !quoteForm ||
      !quoteSummary ||
      !quoteSend
    ) {
      return;
    }

    const seguro =
      quoteForm.elements.seguro.value;

    const nome =
      quoteForm.elements.nome.value.trim();

    const whatsapp =
      quoteForm.elements.whatsapp.value.trim();

    const cidade =
      quoteForm.elements.cidade.value.trim() ||
      "Não informada";


    const items = [
      ["Seguro", seguro],
      ["Nome", nome],
      ["WhatsApp", whatsapp],
      ["Cidade", cidade]
    ];


    quoteSummary.innerHTML = "";

    items.forEach(([label, value]) => {

      const card =
        document.createElement("div");

      card.className =
        "quote-summary-item";

      const small =
        document.createElement("span");

      small.textContent = label;

      const strong =
        document.createElement("strong");

      strong.textContent = value;

      card.append(
        small,
        strong
      );

      quoteSummary.appendChild(card);

    });


    const message = [
      "Olá, Pensou Seguros! Gostaria de solicitar uma cotação.",
      "",
      `Seguro: ${seguro}`,
      `Nome: ${nome}`,
      `WhatsApp: ${whatsapp}`,
      `Cidade: ${cidade}`,
      "",
      "Vim pelo site da Pensou Seguros."
    ].join("\n");


    quoteSend.href =
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  }


  quoteNext?.addEventListener(
    "click",
    () => {

      if (!validateStep()) return;

      if (currentStep === 1) {

        showStep(2);

        setTimeout(
          () => quoteForm?.elements.nome?.focus(),
          0
        );

        return;

      }


      if (currentStep === 2) {

        buildSummaryAndWhatsApp();
        showStep(3);

      }

    }
  );


  quotePrev?.addEventListener(
    "click",
    () => {

      if (currentStep > 1) {
        showStep(currentStep - 1);
      }

    }
  );


  whatsappInput?.addEventListener(
    "input",
    event => {

      event.target.value =
        formatPhone(event.target.value);

      clearStatus();

    }
  );


  /* HEADER AO ROLAR */

  const header =
    document.querySelector(".header");

  function updateHeader() {

    if (!header) return;

    header.style.boxShadow =
      window.scrollY > 20
        ? "0 8px 30px rgba(10, 31, 70, 0.08)"
        : "none";

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();

});