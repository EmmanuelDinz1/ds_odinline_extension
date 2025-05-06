// validação do formulário
$(document).ready(function () {
  $("#formulario").validate({
    rules: {
      login: {
        required: true,
        minlength: 3
      },
      senha: {
        required: true,
        minlength: 3
      }
    },
    messages: {
      login: {
        required: "Campo obrigatório"
      },
      senha: {
        required: "Campo obrigatório"
      }
    }
  });
});

$("#senha").on("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // evita envio padrão
    autenticar();
  }
});

// função de autenticação
async function autenticar() {
  if ($("#formulario").valid()) {
    const login = $("#login").val();
    const senha = $("#senha").val();
    const url = `https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonResponse = await response.json();
        localStorage.setItem("chave", jsonResponse.chave);
        localStorage.setItem("nome", jsonResponse.nome);
        window.location.href = "menu.html";
      } else {
        alert("Login ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  }
}
