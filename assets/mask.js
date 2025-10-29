document.addEventListener("DOMContentLoaded", () => {
  // SPA: navegação entre seções
  const routes = {
    home: document.getElementById("home"),
    form: document.getElementById("form"),
  };

  function navigate(route) {
    Object.values(routes).forEach(section => section.style.display = "none");
    if (routes[route]) routes[route].style.display = "block";
  }

  window.addEventListener("hashchange", () => {
    const route = location.hash.replace("#", "");
    navigate(route);
  });

  navigate("home"); // rota inicial

  // Templates: renderizar alerta
  function renderAlert(message, type = "error") {
    const container = document.getElementById("feedback");
    container.innerHTML = `
      <div class="alert ${type}">${message}</div>
    `;
  }

  // Máscaras
  const cpf = document.querySelector('input[name="cpf"]');
  const telefone = document.querySelector('input[name="telefone"]');
  const cep = document.querySelector('input[name="cep"]');

  cpf.addEventListener("input", () => {
    cpf.value = cpf.value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  });

  telefone.addEventListener("input", () => {
    telefone.value = telefone.value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  });

  cep.addEventListener("input", () => {
    cep.value = cep.value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
  });

  // Validação
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    if (cpf.value.length !== 14) {
      renderAlert("CPF inválido");
      valid = false;
    } else if (telefone.value.length !== 15) {
      renderAlert("Telefone inválido");
      valid = false;
    } else if (cep.value.length !== 9) {
      renderAlert("CEP inválido");
      valid = false;
    }

    if (valid) {
      renderAlert("Formulário enviado com sucesso!", "success");
      form.reset();
    }
  });
});