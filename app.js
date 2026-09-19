/* =========================================================
   PENSOU SEGUROS
   app.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CONFIGURAÇÃO
  ======================================================== */

  /*
    MAIS TARDE vamos substituir esta linha pela URL
    do Google Apps Script que enviará os leads para o Sheets.

    Exemplo:
    const SHEETS_ENDPOINT =
      "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";
  */

const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzfE0lrvmFe_OLGIFkBUB_X2O_O3Vvy64kX1v92Hin0VPUQHrgbwYJuEiiumj5oaxKQ/exec";

  /* =======================================================
     ELEMENTOS
  ======================================================== */

  const body = document.body;

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  const faqItems =
    document.querySelectorAll(".faq-item");

  const quoteModal =
    document.getElementById("quoteModal");

  const quoteClose =
    document.getElementById("quoteClose");

  const quoteBackdrop =
    document.querySelector(".quote-modal-backdrop");

  const quoteForm =
    document.getElementById("quoteForm");

  const quoteSteps =
    [...document.querySelectorAll(".quote-step")];

  const quotePrev =
    document.getElementById("quotePrev");

  const quoteNext =
    document.getElementById("quoteNext");

  const quoteSubmit =
    document.getElementById("quoteSubmit");

  const quoteProgressBar =
    document.getElementById("quoteProgressBar");

  const quoteStepCounter =
    document.getElementById("quoteStepCounter");

  const formStatus =
    document.getElementById("formStatus");

  const quoteSuccess =
    document.getElementById("quoteSuccess");

  const openQuoteButtons =
    document.querySelectorAll(".open-quote");

  const quoteTypeButtons =
    document.querySelectorAll(".quote-type");

  const quickQuoteOptions =
    document.querySelectorAll(".quick-quote-option");

  const whatsappInput =
    document.getElementById("whatsapp");

  const currentYear =
    document.getElementById("currentYear");

  const quotePage =
    document.getElementById("quotePage");

  const utmSource =
    document.getElementById("utmSource");

  const utmMedium =
    document.getElementById("utmMedium");

  const utmCampaign =
    document.getElementById("utmCampaign");

  let currentStep = 1;

  const totalSteps = quoteSteps.length;


  /* =======================================================
     ANO AUTOMÁTICO
  ======================================================== */

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     MENU MOBILE
  ======================================================== */

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.innerHTML =
        isOpen
          ? '<i class="fa-solid fa-xmark"></i>'
          : '<i class="fa-solid fa-bars"></i>';

    });


    mainNav
      .querySelectorAll("a")
      .forEach(link => {

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


  /* =======================================================
     FAQ
  ======================================================== */

  faqItems.forEach(item => {

    const button =
      item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {

      const isActive =
        item.classList.contains("active");


      faqItems.forEach(otherItem => {

        otherItem.classList.remove("active");

        const otherButton =
          otherItem.querySelector(".faq-question");

        if (otherButton) {
          otherButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });


      if (!isActive) {

        item.classList.add("active");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });


  /* =======================================================
     UTMs E ORIGEM
  ======================================================== */

  const params =
    new URLSearchParams(window.location.search);

  if (quotePage) {
    quotePage.value =
      window.location.href;
  }

  if (utmSource) {
    utmSource.value =
      params.get("utm_source") || "";
  }

  if (utmMedium) {
    utmMedium.value =
      params.get("utm_medium") || "";
  }

  if (utmCampaign) {
    utmCampaign.value =
      params.get("utm_campaign") || "";
  }


  /* =======================================================
     ABRIR MODAL
  ======================================================== */

  function openQuoteModal(
    selectedInsurance = null
  ) {

    if (!quoteModal) return;

    resetQuote();

    quoteModal.classList.add("open");

    quoteModal.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("modal-open");


    if (selectedInsurance) {

      const insuranceInput =
        quoteForm.querySelector(
          `input[name="seguro"][value="${CSS.escape(
            selectedInsurance
          )}"]`
        );

      if (insuranceInput) {
        insuranceInput.checked = true;
      }

    }


    setTimeout(() => {

      if (quoteClose) {
        quoteClose.focus();
      }

    }, 100);

  }


  /* =======================================================
     FECHAR MODAL
  ======================================================== */

  function closeQuoteModal() {

    if (!quoteModal) return;

    quoteModal.classList.remove("open");

    quoteModal.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("modal-open");

  }


  openQuoteButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => openQuoteModal()
    );

  });


  quoteTypeButtons.forEach(button => {

    button.addEventListener("click", () => {

      const insurance =
        button.dataset.insurance;

      openQuoteModal(insurance);

    });

  });


  quickQuoteOptions.forEach(button => {

    button.addEventListener("click", () => {

      const insurance =
        button.dataset.insurance;

      openQuoteModal(insurance);

    });

  });


  if (quoteClose) {

    quoteClose.addEventListener(
      "click",
      closeQuoteModal
    );

  }


  if (quoteBackdrop) {

    quoteBackdrop.addEventListener(
      "click",
      closeQuoteModal
    );

  }


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        quoteModal?.classList.contains("open")
      ) {
        closeQuoteModal();
      }

    }
  );


  /* =======================================================
     QUIZ
  ======================================================== */

  function showStep(stepNumber) {

    currentStep = stepNumber;


    quoteSteps.forEach(step => {

      step.classList.toggle(
        "active",
        Number(step.dataset.step) === currentStep
      );

    });


    const percentage =
      (currentStep / totalSteps) * 100;


    if (quoteProgressBar) {

      quoteProgressBar.style.width =
        `${percentage}%`;

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

      quoteNext.style.display =
        currentStep === totalSteps
          ? "none"
          : "inline-flex";

    }


    if (quoteSubmit) {

      quoteSubmit.style.display =
        currentStep === totalSteps
          ? "inline-flex"
          : "none";

    }


    clearStatus();

  }


  /* =======================================================
     VALIDAÇÃO POR ETAPA
  ======================================================== */

  function validateCurrentStep() {

    const currentStepElement =
      quoteSteps.find(
        step =>
          Number(step.dataset.step) ===
          currentStep
      );

    if (!currentStepElement) {
      return false;
    }


    const requiredFields =
      currentStepElement.querySelectorAll(
        "[required]"
      );


    for (const field of requiredFields) {

      if (field.type === "radio") {

        const groupName =
          field.name;

        const checked =
          currentStepElement.querySelector(
            `input[name="${groupName}"]:checked`
          );

        if (!checked) {

          showError(
            "Selecione uma opção para continuar."
          );

          return false;

        }

      }


      else if (field.type === "checkbox") {

        if (!field.checked) {

          showError(
            "Você precisa concordar com o uso dos dados para continuar."
          );

          return false;

        }

      }


      else {

        if (!field.value.trim()) {

          field.focus();

          showError(
            "Preencha os campos obrigatórios para continuar."
          );

          return false;

        }


        if (
          field.type === "email" &&
          field.value &&
          !isValidEmail(field.value)
        ) {

          field.focus();

          showError(
            "Digite um e-mail válido."
          );

          return false;

        }

      }

    }


    if (currentStep === 4) {

      const phone =
        whatsappInput?.value || "";

      const digits =
        phone.replace(/\D/g, "");

      if (
        digits.length < 10 ||
        digits.length > 11
      ) {

        whatsappInput?.focus();

        showError(
          "Digite um WhatsApp válido com DDD."
        );

        return false;

      }

    }


    clearStatus();

    return true;

  }


  /* =======================================================
     BOTÃO CONTINUAR
  ======================================================== */

  if (quoteNext) {

    quoteNext.addEventListener(
      "click",
      () => {

        if (!validateCurrentStep()) {
          return;
        }

        if (currentStep < totalSteps) {

          showStep(currentStep + 1);

          scrollModalTop();

        }

      }
    );

  }


  /* =======================================================
     BOTÃO VOLTAR
  ======================================================== */

  if (quotePrev) {

    quotePrev.addEventListener(
      "click",
      () => {

        if (currentStep > 1) {

          showStep(currentStep - 1);

          scrollModalTop();

        }

      }
    );

  }


  /* =======================================================
     AUTO AVANÇO NOS RADIOS
     Dá sensação de quiz
  ======================================================== */

  quoteForm
    ?.querySelectorAll(
      '.quote-option input[type="radio"]'
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        () => {

          if (currentStep === 1) {

            setTimeout(() => {

              if (
                validateCurrentStep() &&
                currentStep < totalSteps
              ) {

                showStep(2);

                scrollModalTop();

              }

            }, 260);

          }

        }
      );

    });


  quoteForm
    ?.querySelectorAll(
      '.quote-option-line input[type="radio"]'
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        () => {

          if (currentStep === 2) {

            setTimeout(() => {

              if (
                validateCurrentStep() &&
                currentStep < totalSteps
              ) {

                showStep(3);

                scrollModalTop();

              }

            }, 260);

          }

        }
      );

    });


  /* =======================================================
     MÁSCARA WHATSAPP
  ======================================================== */

  if (whatsappInput) {

    whatsappInput.addEventListener(
      "input",
      event => {

        let value =
          event.target.value
            .replace(/\D/g, "")
            .slice(0, 11);


        if (value.length <= 10) {

          value = value.replace(
            /^(\d{2})(\d)/g,
            "($1) $2"
          );

          value = value.replace(
            /(\d{4})(\d)/,
            "$1-$2"
          );

        }

        else {

          value = value.replace(
            /^(\d{2})(\d)/g,
            "($1) $2"
          );

          value = value.replace(
            /(\d{5})(\d)/,
            "$1-$2"
          );

        }


        event.target.value = value;

      }
    );

  }


  /* =======================================================
     SUBMIT
  ======================================================== */

  if (quoteForm) {

    quoteForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        if (!validateCurrentStep()) {
          return;
        }


        setSubmitting(true);

        clearStatus();


        const formData =
          new FormData(quoteForm);


        const data = {};

        formData.forEach(
          (value, key) => {
            data[key] = value;
          }
        );


        data.data_envio =
          new Date().toLocaleString(
            "pt-BR",
            {
              timeZone:
                "America/Sao_Paulo"
            }
          );


        /*
          Enquanto o Google Sheets ainda não está
          configurado, salvamos o lead em modo teste
          no console do navegador.

          Assim conseguimos testar todo o site
          antes da integração.
        */

        if (!SHEETS_ENDPOINT) {

          console.log(
            "Lead Pensou Seguros - MODO TESTE:",
            data
          );


          setTimeout(() => {

            setSubmitting(false);

            showSuccess();

          }, 700);


          return;

        }


        try {

          const bodyData =
            new URLSearchParams();


          Object.entries(data).forEach(
            ([key, value]) => {

              bodyData.append(
                key,
                value
              );

            }
          );


          await fetch(
            SHEETS_ENDPOINT,
            {
              method: "POST",
              mode: "no-cors",
              body: bodyData
            }
          );


          setSubmitting(false);

          showSuccess();


        }

        catch (error) {

          console.error(
            "Erro ao enviar cotação:",
            error
          );


          setSubmitting(false);


          showError(
            "Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp."
          );

        }

      }
    );

  }


  /* =======================================================
     ESTADO ENVIANDO
  ======================================================== */

  function setSubmitting(isSubmitting) {

    if (!quoteSubmit) return;


    quoteSubmit.disabled =
      isSubmitting;


    quoteSubmit.innerHTML =
      isSubmitting
        ? `
          <i class="fa-solid fa-spinner fa-spin"></i>
          Enviando...
        `
        : `
          Enviar cotação
          <i class="fa-solid fa-paper-plane"></i>
        `;

  }


  /* =======================================================
     SUCESSO
  ======================================================== */

  function showSuccess() {

    quoteForm.style.display =
      "none";

    quoteSuccess.classList.add(
      "active"
    );


    /*
      Evento personalizado.

      Mais tarde podemos usar isso para:
      Google Analytics
      Meta Pixel
      Google Ads
    */

    window.dispatchEvent(
      new CustomEvent(
        "pensouQuoteSubmitted"
      )
    );

  }


  /* =======================================================
     RESET
  ======================================================== */

  function resetQuote() {

    currentStep = 1;

    quoteForm?.reset();


    if (quoteForm) {

      quoteForm.style.display =
        "block";

    }


    if (quoteSuccess) {

      quoteSuccess.classList.remove(
        "active"
      );

    }


    if (quotePage) {

      quotePage.value =
        window.location.href;

    }


    if (utmSource) {

      utmSource.value =
        params.get("utm_source") || "";

    }


    if (utmMedium) {

      utmMedium.value =
        params.get("utm_medium") || "";

    }


    if (utmCampaign) {

      utmCampaign.value =
        params.get("utm_campaign") || "";

    }


    setSubmitting(false);

    showStep(1);

    clearStatus();

  }


  /* =======================================================
     HELPERS
  ======================================================== */

  function scrollModalTop() {

    const dialog =
      document.querySelector(
        ".quote-modal-dialog"
      );

    if (dialog) {

      dialog.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }


  function showError(message) {

    if (!formStatus) return;

    formStatus.textContent =
      message;

    formStatus.className =
      "form-status error";

  }


  function clearStatus() {

    if (!formStatus) return;

    formStatus.textContent =
      "";

    formStatus.className =
      "form-status";

  }


  function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }


  /* =======================================================
     SCROLL DO HEADER
  ======================================================== */

  const header =
    document.querySelector(".header");


  function updateHeader() {

    if (!header) return;


    if (window.scrollY > 20) {

      header.style.boxShadow =
        "0 8px 30px rgba(10, 31, 70, 0.08)";

    }

    else {

      header.style.boxShadow =
        "none";

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();


  /* =======================================================
     INICIALIZAÇÃO
  ======================================================== */

  showStep(1);

});
