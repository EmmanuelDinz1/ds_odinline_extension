document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuario = localStorage.getItem("nome");
    if (nomeUsuario) {
      document.getElementById("nomeUsuario").textContent = nomeUsuario;
    }
  });
  