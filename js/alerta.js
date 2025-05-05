document.addEventListener('DOMContentLoaded', () => {
    const formAlerta = document.getElementById('formAlerta');
    const listaAlertas = document.getElementById('listaAlertas');
  
    // Carregar alertas do localStorage
    let alertas = JSON.parse(localStorage.getItem('alertas')) || [];
  
    // Função para salvar alertas no localStorage
    const salvarAlertas = () => {
      localStorage.setItem('alertas', JSON.stringify(alertas));
    };
  
    // Função para renderizar os alertas na tabela
    const renderizarAlertas = () => {
      listaAlertas.innerHTML = '';
      alertas.forEach((alerta, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${alerta.produtoId}</td>
          <td>R$ ${parseFloat(alerta.valorDesejado).toFixed(2)}</td>
          <td>${alerta.acao}</td>
          <td>
            <button class="btn btn-danger btn-sm btn-remover" data-index="${index}">
              Remover
            </button>
          </td>
        `;
        listaAlertas.appendChild(row);
      });
  
      // Ativar botões de remover
      document.querySelectorAll('.btn-remover').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = btn.getAttribute('data-index');
          alertas.splice(i, 1);
          salvarAlertas();
          renderizarAlertas();
        });
      });
    };
  
    // Verificar preços dos produtos
    const verificarPrecos = async () => {
      for (let i = alertas.length - 1; i >= 0; i--) {
        const alerta = alertas[i];
        try {
          const res = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.produtoId}`);
          if (!res.ok) continue;
          const produto = await res.json();
          const valorAtual = parseFloat(produto.valor);
  
          if (valorAtual <= parseFloat(alerta.valorDesejado)) {
            if (alerta.acao === 'notificar') {
              // mensagem visual
              window.alert(`🔔 ${produto.descricao} chegou a R$ ${valorAtual.toFixed(2)}!`);
            } else {
              // registrar compra local
              const compras = JSON.parse(localStorage.getItem('compras')) || [];
              compras.push({
                produtoId: produto.id,
                descricao: produto.descricao,
                valor: valorAtual,
                data: new Date().toLocaleString()
              });
              localStorage.setItem('compras', JSON.stringify(compras));
              window.alert(`✅ Compra registrada: ${produto.descricao} por R$ ${valorAtual.toFixed(2)}`);
            }
            // remover alerta
            alertas.splice(i, 1);
            salvarAlertas();
          }
        } catch (e) {
          console.error('Erro ao verificar preço:', e);
        }
      }
      renderizarAlertas();
    };
  
    // Evento de submissão do formulário
    formAlerta.addEventListener('submit', e => {
      e.preventDefault();
      const produtoId = document.getElementById('produtoId').value.trim();
      const valorDesejado = document.getElementById('valorDesejado').value.trim();
      const acao = document.getElementById('acao').value;
  
      // validação única por produto
      if (alertas.some(a => a.produtoId === produtoId)) {
        return window.alert('Já existe um alerta para este produto.');
      }
  
      alertas.push({ produtoId, valorDesejado, acao });
      salvarAlertas();
      renderizarAlertas();
      formAlerta.reset();
      // fecha o modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalAlerta'));
      modal.hide();
    });
  
    // inicialização
    renderizarAlertas();
    // checa preços a cada 5 minutos
    setInterval(verificarPrecos, 5 * 60 * 1000);
  });
  