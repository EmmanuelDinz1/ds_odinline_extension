// Validação do formulário
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
        required: "Campo obrigatório",
        minlength: "Mínimo 3 caracteres"
      },
      senha: {
        required: "Campo obrigatório",
        minlength: "Mínimo 3 caracteres"
      }
    },
    errorPlacement: function(error, element) {
      error.appendTo(element.parent().parent());
    },
    highlight: function(element) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function(element) {
      $(element).removeClass('is-invalid');
    }
  });
});

// Função de autenticação melhorada
async function autenticar() {
  if (!$("#formulario").valid()) return;

  const login = $("#login").val().trim();
  const senha = $("#senha").val().trim();
  const url = `https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`;
  
  try {
    const response = await fetch(url);
    
    if (response.status === 404) {
      showError('Usuário não cadastrado!');
      return;
    }

    if (!response.ok) {
      showError('Erro na autenticação');
      return;
    }

    const jsonResponse = await response.json();
    
    if (!jsonResponse.chave || !jsonResponse.nome) {
      showError('Dados de usuário inválidos');
      return;
    }

    localStorage.setItem("chave", jsonResponse.chave);
    localStorage.setItem("nome", jsonResponse.nome);
    window.location.href = "menu.html";

  } catch (error) {
    console.error("Erro:", error);
    showError('Erro de conexão com o servidor');
  }
}

// Função para mostrar erros
function showError(message) {
  $(".error-feedback").remove();
  const errorHtml = `<div class="error-feedback text-danger mt-2 text-center">${message}</div>`;
  $("#botaoLoginContainer").before(errorHtml);
}

// Eventos
$("#formulario").on("submit", function(e) {
  e.preventDefault();
  autenticar();
});

$("#senha").on("keypress", function(e) {
  if (e.which === 13) autenticar();
});