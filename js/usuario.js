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
            if (!response.ok) {
                throw new Error("Erro ao buscar as compras do usuário.");
            }
            return response.json();
        })
        .then(data => {
            const container = $("#compras-container");
            console.log(data)
            if (data.length === 0) {
                container.append("<p>Você ainda não possui compras registradas.</p>");
                return;
            }
            data.forEach(produto => {
                const card = `
                  <div class="col-md-4 mb-4">
                    <div class="card h-100">
                      <img src="${produto.urlImagem}" class="card-img-top" alt="${produto.descricao}">
                      <div class="card-body">
                        <h5 class="card-title">${produto.descricao}</h5>
                        <p class="card-text">Valor: R$ ${parseFloat(produto.valor).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                `;
                container.append(card);
            });
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Não foi possível carregar suas compras.");
        });
});
