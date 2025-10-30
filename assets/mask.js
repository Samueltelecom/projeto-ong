document.addEventListener("DOMContentLoaded", () => {
  // Templates: renderizar alerta
  function renderAlert(message, type = "error") {
    const container = document.getElementById("feedback");
    container.innerHTML = `<div class="alert ${type}">${message}</div>`;
    container.scrollIntoView({ behavior: "smooth" });
  }

  // Máscaras
  const cpf = document.querySelector('input[name="cpf"]');
  const telefone = document.querySelector('input[name="telefone"]');
  const cep = document.querySelector('input[name="cep"]');

  if (cpf) {
    cpf.addEventListener("input", () => {
      cpf.value = cpf.value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    });
  }

  if (telefone) {
    telefone.addEventListener("input", () => {
      telefone.value = telefone.value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    });
  }

  if (cep) {
    cep.addEventListener("input", () => {
      cep.value = cep.value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
    });
  }

  // Validação
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      if (cpf && cpf.value.length !== 14) {
        renderAlert("CPF inválido");
        valid = false;
      } else if (telefone && telefone.value.length !== 15) {
        renderAlert("Telefone inválido");
        valid = false;
      } else if (cep && cep.value.length !== 9) {
        renderAlert("CEP inválido");
        valid = false;
      }

      if (valid) {
        renderAlert("Formulário enviado com sucesso!", "success");
        form.reset();
      }
    });
  }
});

// Alternância de tema
document.getElementById("toggle-theme").addEventListener("click", () => {
  const body = document.body;
  const current = body.getAttribute("data-theme");
  const next = current === "light" ? "dark" : current === "dark" ? "contrast" : "light";
  body.setAttribute("data-theme", next);
});