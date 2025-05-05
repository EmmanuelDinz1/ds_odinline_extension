// validação do formulário
$(document).ready(function() {
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
      }
    });
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
          window.location.href = "menu.html";
        } else {
          alert("Login ou senha inválidos!");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  }
  