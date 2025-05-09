document.addEventListener('DOMContentLoaded', () => {
  const nomeUsuario = localStorage.getItem("nome");
  if (nomeUsuario) {
    document.getElementById("nomeUsuario").textContent = nomeUsuario;
  }
});
$(document).ready(function () {
  const chave = localStorage.getItem("chave");
  if (!chave) {
    alert("Usuário não autenticado. Por favor, faça login.");
    window.location.href = "login.html";
    return;
  }

  const url = `https://api-odinline.odiloncorrea.com/produto/${chave}/usuario`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar as compras do usuário.");
      return response.json();
    })
    .then(data => {
      const apiContainer = $("#compras-container");
      const localContainer = $("#compras-local-container");

      // Limpa containers
      apiContainer.empty();
      localContainer.empty();

      // Processa compras da API
      if (data.length > 0) {
        data.forEach(produto => {
          apiContainer.append(`
                      <div class="col-md-4 mb-4">
                        <div class="card h-100">
                          <img src="${produto.urlImagem}" class="card-img-top" alt="${produto.descricao}">
                          <div class="card-body">
                            <h5 class="card-title">${produto.descricao}</h5>
                            <p class="card-text">Valor: R$ ${parseFloat(produto.valor).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    `);
        });
      } else {
        apiContainer.append("<p class='text-muted'>Nenhuma compra registrada na plataforma.</p>");
      }

      // Processa compras locais
      const comprasLocais = JSON.parse(localStorage.getItem('compras')) || [];
      if (comprasLocais.length > 0) {
        comprasLocais.forEach(produto => {
          localContainer.append(`
                      <div class="col-md-4 mb-4">
                        <div class="card h-100">
                          <div class="card-body">
                            <h5 class="card-title">${produto.descricao}</h5>
                            <p class="card-text">Valor: R$ ${parseFloat(produto.valor).toFixed(2)}</p>
                            <p class="card-text small text-muted">Comprado em: ${produto.data}</p>
                          </div>
                        </div>
                      </div>
                    `);
        });
      } else {
        localContainer.append("<p class='text-muted'>Nenhuma compra realizada localmente.</p>");
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Não foi possível carregar suas compras.");
    });
});