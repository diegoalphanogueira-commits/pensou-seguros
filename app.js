/* =========================================================
   PENSOU SEGUROS
   app.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     CONFIGURAÇÃO
  ======================================================== */

  const SHEETS_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbzfE0lrvmFe_OLGIFkBUB_X2O_O3Vvy64kX1v92Hin0VPUQHrgbwYJuEiiumj5oaxKQ/exec";


  /* =======================================================
     BASE
  ======================================================== */

  const body = document.body;

  const params =
    new URLSearchParams(window.location.search);

  const currentYear =
    document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     MENU MOBILE
  ======================================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const open =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      menuToggle.innerHTML =
        open
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

  document
    .querySelectorAll(".faq-item")
    .forEach(item => {

      const button =
        item.querySelector(".faq-question");

      if (!button) return;

      button.addEventListener("click", () => {

        const wasActive =
          item.classList.contains("active");

        document
          .querySelectorAll(".faq-item")
          .forEach(other => {

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


  /* =======================================================
     HELPERS GERAIS
  ======================================================== */

  function isAutoInsurance(value) {

    return value === "Seguro Auto";

  }


  function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }


  function digitsOnly(value) {

    return String(value || "")
      .replace(/\D/g, "");

  }


  function escapeHTML(value) {

    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function scrollDialogTop(selector) {

    const dialog =
      document.querySelector(selector);

    if (!dialog) return;

    dialog.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     QUIZ SIMPLES / OUTROS SEGUROS
  ======================================================== */

  const quoteModal =
    document.getElementById("quoteModal");

  const quoteClose =
    document.getElementById("quoteClose");

  const quoteBackdrop =
    quoteModal?.querySelector(
      ".quote-modal-backdrop"
    );

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

  const whatsappInput =
    document.getElementById("whatsapp");

  const quotePage =
    document.getElementById("quotePage");

  const utmSource =
    document.getElementById("utmSource");

  const utmMedium =
    document.getElementById("utmMedium");

  const utmCampaign =
    document.getElementById("utmCampaign");

  let currentStep = 1;

  const totalSteps =
    quoteSteps.length;


  /* =======================================================
     DADOS DE ORIGEM - QUIZ SIMPLES
  ======================================================== */

  function fillGeneralTracking() {

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

  }

  fillGeneralTracking();


  /* =======================================================
     ABRIR / FECHAR QUIZ SIMPLES
  ======================================================== */

  function openQuoteModal(
    selectedInsurance = null
  ) {

    if (!quoteModal) return;

    if (isAutoInsurance(selectedInsurance)) {
      openAutoQuoteModal();
      return;
    }

    resetQuote();

    quoteModal.classList.add("open");

    quoteModal.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("modal-open");


    if (selectedInsurance && quoteForm) {

      const radios =
        quoteForm.querySelectorAll(
          'input[name="seguro"]'
        );

      radios.forEach(input => {

        input.checked =
          input.value === selectedInsurance;

      });

    }

  }


  function closeQuoteModal() {

    if (!quoteModal) return;

    quoteModal.classList.remove("open");

    quoteModal.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("modal-open");

  }


  quoteClose?.addEventListener(
    "click",
    closeQuoteModal
  );


  quoteBackdrop?.addEventListener(
    "click",
    closeQuoteModal
  );


  /* =======================================================
     BOTÕES DO SITE
  ======================================================== */

  document
    .querySelectorAll(".open-quote")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => openQuoteModal()
      );

    });


  document
    .querySelectorAll(".quote-type")
    .forEach(button => {

      button.addEventListener("click", () => {

        const insurance =
          button.dataset.insurance || "";

        if (isAutoInsurance(insurance)) {
          openAutoQuoteModal();
        } else {
          openQuoteModal(insurance);
        }

      });

    });


  document
    .querySelectorAll(".quick-quote-option")
    .forEach(button => {

      button.addEventListener("click", () => {

        const insurance =
          button.dataset.insurance || "";

        if (isAutoInsurance(insurance)) {
          openAutoQuoteModal();
        } else {
          openQuoteModal(insurance);
        }

      });

    });


  /* =======================================================
     ETAPAS QUIZ SIMPLES
  ======================================================== */

  function showStep(stepNumber) {

    currentStep = stepNumber;

    quoteSteps.forEach(step => {

      step.classList.toggle(
        "active",
        Number(step.dataset.step) ===
          currentStep
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


    clearGeneralStatus();

  }


  function validateGeneralStep() {

    const step =
      quoteSteps.find(
        item =>
          Number(item.dataset.step) ===
          currentStep
      );

    if (!step) return false;


    const required =
      step.querySelectorAll("[required]");


    for (const field of required) {

      if (field.type === "radio") {

        const checked =
          step.querySelector(
            `input[name="${field.name}"]:checked`
          );

        if (!checked) {

          showGeneralError(
            "Selecione uma opção para continuar."
          );

          return false;

        }

      }

      else if (field.type === "checkbox") {

        if (!field.checked) {

          showGeneralError(
            "Você precisa concordar para continuar."
          );

          return false;

        }

      }

      else {

        if (!field.value.trim()) {

          field.focus();

          showGeneralError(
            "Preencha os campos obrigatórios."
          );

          return false;

        }


        if (
          field.type === "email" &&
          field.value &&
          !isValidEmail(field.value)
        ) {

          field.focus();

          showGeneralError(
            "Digite um e-mail válido."
          );

          return false;

        }

      }

    }


    if (currentStep === 4) {

      const phone =
        digitsOnly(
          whatsappInput?.value
        );

      if (
        phone.length < 10 ||
        phone.length > 11
      ) {

        whatsappInput?.focus();

        showGeneralError(
          "Digite um WhatsApp válido com DDD."
        );

        return false;

      }

    }


    clearGeneralStatus();

    return true;

  }


  quoteNext?.addEventListener(
    "click",
    () => {

      if (!validateGeneralStep()) {
        return;
      }

      if (currentStep < totalSteps) {

        showStep(currentStep + 1);

        scrollDialogTop(
          "#quoteModal .quote-modal-dialog"
        );

      }

    }
  );


  quotePrev?.addEventListener(
    "click",
    () => {

      if (currentStep > 1) {

        showStep(currentStep - 1);

        scrollDialogTop(
          "#quoteModal .quote-modal-dialog"
        );

      }

    }
  );


  /* =======================================================
     SE ESCOLHER AUTO DENTRO DO QUIZ SIMPLES
  ======================================================== */

  quoteForm
    ?.querySelectorAll(
      'input[name="seguro"]'
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        () => {

          if (input.value === "Seguro Auto") {

            closeQuoteModal();

            setTimeout(
              openAutoQuoteModal,
              120
            );

            return;

          }


          if (currentStep === 1) {

            setTimeout(() => {

              if (validateGeneralStep()) {

                showStep(2);

                scrollDialogTop(
                  "#quoteModal .quote-modal-dialog"
                );

              }

            }, 220);

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

              if (validateGeneralStep()) {

                showStep(3);

                scrollDialogTop(
                  "#quoteModal .quote-modal-dialog"
                );

              }

            }, 220);

          }

        }
      );

    });


  /* =======================================================
     MÁSCARA WHATSAPP QUIZ SIMPLES
  ======================================================== */

  whatsappInput?.addEventListener(
    "input",
    event => {

      event.target.value =
        formatPhone(event.target.value);

    }
  );


  /* =======================================================
     ENVIO QUIZ SIMPLES
  ======================================================== */

  quoteForm?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!validateGeneralStep()) {
        return;
      }


      setGeneralSubmitting(true);

      clearGeneralStatus();


      const formData =
        new FormData(quoteForm);

      const payload =
        new URLSearchParams();


      formData.forEach(
        (value, key) => {
          payload.append(key, value);
        }
      );


      payload.append(
        "data_envio",
        new Date().toLocaleString(
          "pt-BR",
          {
            timeZone:
              "America/Sao_Paulo"
          }
        )
      );


      try {

        await fetch(
          SHEETS_ENDPOINT,
          {
            method: "POST",
            mode: "no-cors",
            body: payload
          }
        );


        setGeneralSubmitting(false);

        quoteForm.style.display =
          "none";

        quoteSuccess?.classList.add(
          "active"
        );


      } catch (error) {

        console.error(error);

        setGeneralSubmitting(false);

        showGeneralError(
          "Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp."
        );

      }

    }
  );


  function setGeneralSubmitting(active) {

    if (!quoteSubmit) return;

    quoteSubmit.disabled = active;

    quoteSubmit.innerHTML =
      active
        ? `
          <i class="fa-solid fa-spinner fa-spin"></i>
          Enviando...
        `
        : `
          Enviar cotação
          <i class="fa-solid fa-paper-plane"></i>
        `;

  }


  function resetQuote() {

    currentStep = 1;

    quoteForm?.reset();

    if (quoteForm) {
      quoteForm.style.display =
        "block";
    }

    quoteSuccess?.classList.remove(
      "active"
    );

    fillGeneralTracking();

    setGeneralSubmitting(false);

    showStep(1);

    clearGeneralStatus();

  }


  function showGeneralError(message) {

    if (!formStatus) return;

    formStatus.textContent =
      message;

    formStatus.className =
      "form-status error";

  }


  function clearGeneralStatus() {

    if (!formStatus) return;

    formStatus.textContent = "";

    formStatus.className =
      "form-status";

  }


  /* =======================================================
     COTADOR COMPLETO - SEGURO AUTO
  ======================================================== */

  const autoModal =
    document.getElementById(
      "autoQuoteModal"
    );

  const autoBackdrop =
    document.getElementById(
      "autoQuoteBackdrop"
    );

  const autoClose =
    document.getElementById(
      "autoQuoteClose"
    );

  const autoForm =
    document.getElementById(
      "autoQuoteForm"
    );

  const autoSteps =
    [
      ...document.querySelectorAll(
        ".auto-quote-step"
      )
    ];

  const autoPrev =
    document.getElementById(
      "autoQuotePrev"
    );

  const autoNext =
    document.getElementById(
      "autoQuoteNext"
    );

  const autoSubmit =
    document.getElementById(
      "autoQuoteSubmit"
    );

  const autoProgress =
    document.getElementById(
      "autoQuoteProgressBar"
    );

  const autoCounter =
    document.getElementById(
      "autoQuoteStepCounter"
    );

  const autoStatus =
    document.getElementById(
      "autoFormStatus"
    );

  const autoSuccess =
    document.getElementById(
      "autoQuoteSuccess"
    );

  const autoReview =
    document.getElementById(
      "autoQuoteReview"
    );

  const autoSuccessId =
    document.getElementById(
      "autoSuccessId"
    );

  const autoPage =
    document.getElementById(
      "autoQuotePage"
    );

  const autoUtmSource =
    document.getElementById(
      "autoUtmSource"
    );

  const autoUtmMedium =
    document.getElementById(
      "autoUtmMedium"
    );

  const autoUtmCampaign =
    document.getElementById(
      "autoUtmCampaign"
    );

  const autoCpfCnpj =
    document.getElementById(
      "autoCpfCnpj"
    );

  const autoCep =
    document.getElementById(
      "autoCepPernoite"
    );

  const autoCelular =
    document.getElementById(
      "autoCelular"
    );

  const autoPlaca =
    document.getElementById(
      "autoPlaca"
    );

  const autoValorFipe =
    document.getElementById(
      "autoValorFipe"
    );

  const autoMenores26 =
    document.getElementById(
      "autoMenores26"
    );

  const autoIdadeMenor =
    document.getElementById(
      "autoIdadeMenor"
    );

  const autoIdadeMenorGroup =
    document.getElementById(
      "autoIdadeMenorGroup"
    );

  const autoInicio =
    document.getElementById(
      "autoInicioVigencia"
    );

  const autoFim =
    document.getElementById(
      "autoFimVigencia"
    );

  let autoCurrentStep = 1;

  const autoTotalSteps =
    autoSteps.length;


  /* =======================================================
     TRACKING AUTO
  ======================================================== */

  function fillAutoTracking() {

    if (autoPage) {
      autoPage.value =
        window.location.href;
    }

    if (autoUtmSource) {
      autoUtmSource.value =
        params.get("utm_source") || "";
    }

    if (autoUtmMedium) {
      autoUtmMedium.value =
        params.get("utm_medium") || "";
    }

    if (autoUtmCampaign) {
      autoUtmCampaign.value =
        params.get("utm_campaign") || "";
    }

  }


  /* =======================================================
     ABRIR / FECHAR AUTO
  ======================================================== */

  function openAutoQuoteModal() {

    if (!autoModal) return;

    resetAutoQuote();

    autoModal.classList.add("open");

    autoModal.setAttribute(
      "aria-hidden",
      "false"
    );

    body.classList.add("modal-open");

  }


  function closeAutoQuoteModal() {

    if (!autoModal) return;

    autoModal.classList.remove("open");

    autoModal.setAttribute(
      "aria-hidden",
      "true"
    );

    body.classList.remove("modal-open");

  }


  autoClose?.addEventListener(
    "click",
    closeAutoQuoteModal
  );


  autoBackdrop?.addEventListener(
    "click",
    closeAutoQuoteModal
  );


  /* =======================================================
     ESC FECHA QUALQUER MODAL
  ======================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }

      if (
        autoModal?.classList.contains(
          "open"
        )
      ) {
        closeAutoQuoteModal();
        return;
      }

      if (
        quoteModal?.classList.contains(
          "open"
        )
      ) {
        closeQuoteModal();
      }

    }
  );


  /* =======================================================
     EXIBIÇÃO DAS ETAPAS AUTO
  ======================================================== */

  function showAutoStep(stepNumber) {

    autoCurrentStep = stepNumber;


    autoSteps.forEach(step => {

      step.classList.toggle(
        "active",
        Number(step.dataset.autoStep) ===
          autoCurrentStep
      );

    });


    const percentage =
      (
        autoCurrentStep /
        autoTotalSteps
      ) * 100;


    if (autoProgress) {
      autoProgress.style.width =
        `${percentage}%`;
    }


    if (autoCounter) {
      autoCounter.textContent =
        `Etapa ${autoCurrentStep} de ${autoTotalSteps}`;
    }


    if (autoPrev) {
      autoPrev.style.visibility =
        autoCurrentStep === 1
          ? "hidden"
          : "visible";
    }


    if (autoNext) {
      autoNext.style.display =
        autoCurrentStep ===
        autoTotalSteps
          ? "none"
          : "inline-flex";
    }


    if (autoSubmit) {
      autoSubmit.style.display =
        autoCurrentStep ===
        autoTotalSteps
          ? "inline-flex"
          : "none";
    }


    if (
      autoCurrentStep ===
      autoTotalSteps
    ) {
      buildAutoReview();
    }


    clearAutoStatus();

  }


  /* =======================================================
     VALIDAÇÃO AUTO
  ======================================================== */

  function validateAutoStep() {

    const step =
      autoSteps.find(
        item =>
          Number(
            item.dataset.autoStep
          ) === autoCurrentStep
      );

    if (!step) return false;


    clearAutoFieldErrors();


    const required =
      step.querySelectorAll(
        "[required]"
      );


    const radioGroups =
      new Set();


    for (const field of required) {

      if (field.type === "radio") {

        if (
          radioGroups.has(field.name)
        ) {
          continue;
        }

        radioGroups.add(field.name);

        const checked =
          step.querySelector(
            `input[name="${field.name}"]:checked`
          );

        if (!checked) {

          showAutoError(
            "Responda todas as perguntas obrigatórias para continuar."
          );

          return false;

        }

        continue;

      }


      if (field.type === "checkbox") {

        if (!field.checked) {

          showAutoError(
            "Você precisa aceitar a autorização de uso dos dados para enviar a cotação."
          );

          return false;

        }

        continue;

      }


      if (!String(field.value).trim()) {

        markAutoFieldError(field);

        field.focus();

        showAutoError(
          "Preencha os campos obrigatórios para continuar."
        );

        return false;

      }


      if (
        field.type === "email" &&
        !isValidEmail(field.value)
      ) {

        markAutoFieldError(field);

        field.focus();

        showAutoError(
          "Digite um e-mail válido."
        );

        return false;

      }

    }


    /* CPF / CNPJ */

    if (autoCurrentStep === 2) {

      const cpfCnpjDigits =
        digitsOnly(
          autoCpfCnpj?.value
        );

      if (
        cpfCnpjDigits.length !== 11 &&
        cpfCnpjDigits.length !== 14
      ) {

        markAutoFieldError(
          autoCpfCnpj
        );

        autoCpfCnpj?.focus();

        showAutoError(
          "Digite um CPF ou CNPJ válido."
        );

        return false;

      }


      const cepDigits =
        digitsOnly(
          autoCep?.value
        );

      if (cepDigits.length !== 8) {

        markAutoFieldError(
          autoCep
        );

        autoCep?.focus();

        showAutoError(
          "Digite um CEP válido."
        );

        return false;

      }


      const phoneDigits =
        digitsOnly(
          autoCelular?.value
        );

      if (
        phoneDigits.length < 10 ||
        phoneDigits.length > 11
      ) {

        markAutoFieldError(
          autoCelular
        );

        autoCelular?.focus();

        showAutoError(
          "Digite um celular válido com DDD."
        );

        return false;

      }

    }


    /* Datas */

    if (autoCurrentStep === 1) {

      if (
        autoInicio?.value &&
        autoFim?.value &&
        autoFim.value <
          autoInicio.value
      ) {

        markAutoFieldError(
          autoFim
        );

        autoFim?.focus();

        showAutoError(
          "A data final não pode ser anterior ao início de vigência."
        );

        return false;

      }

    }


    /* Menor condutor */

    if (autoCurrentStep === 6) {

      if (
        autoMenores26?.value ===
        "Sim"
      ) {

        const idade =
          Number(
            autoIdadeMenor?.value
          );

        if (
          !idade ||
          idade < 18 ||
          idade > 25
        ) {

          markAutoFieldError(
            autoIdadeMenor
          );

          autoIdadeMenor?.focus();

          showAutoError(
            "Informe a idade do condutor menor de 26 anos."
          );

          return false;

        }

      }

    }


    clearAutoStatus();

    return true;

  }


  /* =======================================================
     CONTROLES AUTO
  ======================================================== */

  autoNext?.addEventListener(
    "click",
    () => {

      if (!validateAutoStep()) {
        return;
      }


      if (
        autoCurrentStep <
        autoTotalSteps
      ) {

        showAutoStep(
          autoCurrentStep + 1
        );

        scrollDialogTop(
          "#autoQuoteModal .quote-modal-dialog"
        );

      }

    }
  );


  autoPrev?.addEventListener(
    "click",
    () => {

      if (autoCurrentStep > 1) {

        showAutoStep(
          autoCurrentStep - 1
        );

        scrollDialogTop(
          "#autoQuoteModal .quote-modal-dialog"
        );

      }

    }
  );


  /* =======================================================
     CAMPOS CONDICIONAIS
  ======================================================== */

  function updateMinorDriverField() {

    if (
      !autoMenores26 ||
      !autoIdadeMenor ||
      !autoIdadeMenorGroup
    ) {
      return;
    }


    if (
      autoMenores26.value ===
      "Sim"
    ) {

      autoIdadeMenorGroup.style.display =
        "flex";

      autoIdadeMenor.required =
        true;

    }

    else {

      autoIdadeMenorGroup.style.display =
        "none";

      autoIdadeMenor.required =
        false;

      autoIdadeMenor.value =
        "";

    }

  }


  autoMenores26?.addEventListener(
    "change",
    updateMinorDriverField
  );


  /* =======================================================
     MÁSCARAS AUTO
  ======================================================== */

  autoCpfCnpj?.addEventListener(
    "input",
    event => {

      event.target.value =
        formatCpfCnpj(
          event.target.value
        );

    }
  );


  autoCep?.addEventListener(
    "input",
    event => {

      let value =
        digitsOnly(
          event.target.value
        ).slice(0, 8);

      if (value.length > 5) {

        value =
          value.slice(0, 5) +
          "-" +
          value.slice(5);

      }

      event.target.value =
        value;

    }
  );


  autoCelular?.addEventListener(
    "input",
    event => {

      event.target.value =
        formatPhone(
          event.target.value
        );

    }
  );


  autoPlaca?.addEventListener(
    "input",
    event => {

      event.target.value =
        String(
          event.target.value || ""
        )
          .toUpperCase()
          .replace(
            /[^A-Z0-9]/g,
            ""
          )
          .slice(0, 7);

    }
  );


  autoValorFipe?.addEventListener(
    "input",
    event => {

      event.target.value =
        formatCurrency(
          event.target.value
        );

    }
  );


  /* =======================================================
     REVISÃO
  ======================================================== */

  function buildAutoReview() {

    if (
      !autoReview ||
      !autoForm
    ) {
      return;
    }


    const data =
      new FormData(autoForm);

    const get = key =>
      escapeHTML(
        data.get(key) || "-"
      );


    autoReview.innerHTML = `

      <div class="auto-review-section-title">
        Cotação
      </div>

      ${reviewCard(
        "Tipo",
        get("tipo_cotacao")
      )}

      ${reviewCard(
        "Vigência",
        `${get("inicio_vigencia")} até ${get("fim_vigencia")}`
      )}


      <div class="auto-review-section-title">
        Segurado
      </div>

      ${reviewCard(
        "Nome",
        get("nome_razao_social")
      )}

      ${reviewCard(
        "CPF/CNPJ",
        get("cpf_cnpj")
      )}

      ${reviewCard(
        "Celular",
        get("celular")
      )}

      ${reviewCard(
        "E-mail",
        get("email")
      )}


      <div class="auto-review-section-title">
        Veículo
      </div>

      ${reviewCard(
        "Veículo",
        `${get("marca")} ${get("modelo")}`,
        true
      )}

      ${reviewCard(
        "Ano",
        `${get("ano_fabricacao")} / ${get("ano_modelo")}`
      )}

      ${reviewCard(
        "Placa",
        get("placa")
      )}

      ${reviewCard(
        "Uso",
        get("tipo_uso")
      )}

      ${reviewCard(
        "CEP de pernoite",
        get("cep_pernoite")
      )}

      ${reviewCard(
        "Km mensal",
        get("km_mensal")
      )}

    `;

  }


  function reviewCard(
    label,
    value,
    full = false
  ) {

    return `
      <div class="auto-review-card ${
        full ? "full" : ""
      }">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `;

  }


  /* =======================================================
     ENVIO COTAÇÃO AUTO
  ======================================================== */

  autoForm?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      if (!validateAutoStep()) {
        return;
      }


      setAutoSubmitting(true);

      clearAutoStatus();


      const formData =
        new FormData(autoForm);

      const payload =
        new URLSearchParams();


      formData.forEach(
        (value, key) => {

          payload.append(
            key,
            value
          );

        }
      );


      try {

        /*
          Usamos no-cors para comunicação
          com o Google Apps Script.
          O Apps Script registra a cotação
          no Sheets.
        */

        await fetch(
          SHEETS_ENDPOINT,
          {
            method: "POST",
            mode: "no-cors",
            body: payload
          }
        );


        setAutoSubmitting(false);


        autoForm.style.display =
          "none";


        autoSuccess?.classList.add(
          "active"
        );


        /*
          O ID é gerado pelo Apps Script.
          Como o envio usa no-cors,
          o navegador não consegue ler
          a resposta do Google.
          Por isso não exibimos o ID
          na tela neste momento.
        */

        if (autoSuccessId) {

          autoSuccessId.classList.remove(
            "active"
          );

          autoSuccessId.textContent =
            "";

        }


        window.dispatchEvent(
          new CustomEvent(
            "pensouAutoQuoteSubmitted"
          )
        );


      } catch (error) {

        console.error(
          "Erro cotação Auto:",
          error
        );


        setAutoSubmitting(false);


        showAutoError(
          "Não foi possível enviar sua cotação agora. Tente novamente ou fale conosco pelo WhatsApp."
        );

      }

    }
  );


  function setAutoSubmitting(active) {

    if (!autoSubmit) return;


    autoSubmit.disabled =
      active;


    autoSubmit.innerHTML =
      active
        ? `
          <i class="fa-solid fa-spinner fa-spin"></i>
          Enviando...
        `
        : `
          Solicitar cotação
          <i class="fa-solid fa-paper-plane"></i>
        `;

  }


  /* =======================================================
     RESET AUTO
  ======================================================== */

  function resetAutoQuote() {

    autoCurrentStep = 1;


    autoForm?.reset();


    if (autoForm) {
      autoForm.style.display =
        "block";
    }


    autoSuccess?.classList.remove(
      "active"
    );


    if (autoSuccessId) {

      autoSuccessId.classList.remove(
        "active"
      );

      autoSuccessId.textContent =
        "";

    }


    fillAutoTracking();

    updateMinorDriverField();

    clearAutoStatus();

    clearAutoFieldErrors();

    setAutoSubmitting(false);

    showAutoStep(1);

  }


  /* =======================================================
     ERROS AUTO
  ======================================================== */

  function showAutoError(message) {

    if (!autoStatus) return;


    autoStatus.textContent =
      message;


    autoStatus.className =
      "form-status error";

  }


  function clearAutoStatus() {

    if (!autoStatus) return;


    autoStatus.textContent =
      "";


    autoStatus.className =
      "form-status";

  }


  function markAutoFieldError(field) {

    if (!field) return;

    field.classList.add(
      "auto-field-error"
    );

  }


  function clearAutoFieldErrors() {

    autoForm
      ?.querySelectorAll(
        ".auto-field-error"
      )
      .forEach(field => {

        field.classList.remove(
          "auto-field-error"
        );

      });

  }


  /* =======================================================
     FORMATAÇÕES
  ======================================================== */

  function formatPhone(value) {

    let digits =
      digitsOnly(value)
        .slice(0, 11);


    if (digits.length <= 10) {

      digits = digits.replace(
        /^(\d{2})(\d)/,
        "($1) $2"
      );

      digits = digits.replace(
        /(\d{4})(\d)/,
        "$1-$2"
      );

    }

    else {

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


  function formatCpfCnpj(value) {

    let digits =
      digitsOnly(value)
        .slice(0, 14);


    if (digits.length <= 11) {

      digits = digits.replace(
        /(\d{3})(\d)/,
        "$1.$2"
      );

      digits = digits.replace(
        /(\d{3})(\d)/,
        "$1.$2"
      );

      digits = digits.replace(
        /(\d{3})(\d{1,2})$/,
        "$1-$2"
      );

    }

    else {

      digits = digits.replace(
        /^(\d{2})(\d)/,
        "$1.$2"
      );

      digits = digits.replace(
        /^(\d{2})\.(\d{3})(\d)/,
        "$1.$2.$3"
      );

      digits = digits.replace(
        /\.(\d{3})(\d)/,
        ".$1/$2"
      );

      digits = digits.replace(
        /(\d{4})(\d)/,
        "$1-$2"
      );

    }


    return digits;

  }


  function formatCurrency(value) {

    const digits =
      digitsOnly(value);


    if (!digits) {
      return "";
    }


    const number =
      Number(digits) / 100;


    return number.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    );

  }


  /* =======================================================
     HEADER AO ROLAR
  ======================================================== */

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
    {
      passive: true
    }
  );


  /* =======================================================
     INICIALIZAÇÃO
  ======================================================== */

  fillAutoTracking();

  updateMinorDriverField();

  showStep(1);

  showAutoStep(1);

  updateHeader();

});
