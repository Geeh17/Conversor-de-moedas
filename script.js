document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("converter-form");
  const resultado = document.getElementById("resultado");
  const atualizacao = document.getElementById("atualizacao");
  let cotacoes = {};

  const simbolos = {
    USD: "$", EUR: "€", GBP: "£", ARS: "$", JPY: "¥", CNY: "¥", CAD: "$", AUD: "$",
    CHF: "CHF", BTC: "₿", ETH: "Ξ", LTC: "Ł"
  };

  fetch("https://economia.awesomeapi.com.br/json/all")
    .then(res => res.json())
    .then(data => {
      cotacoes = data;
    })
    .catch(() => {
      resultado.textContent = "Erro ao carregar cotações. Tente novamente mais tarde.";
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valor = parseFloat(document.getElementById("valor").value);
    const moeda = document.getElementById("moeda").value;

    if (!cotacoes[moeda]) {
      resultado.textContent = "Moeda selecionada inválida.";
      return;
    }

    const cotacao = parseFloat(cotacoes[moeda].bid);
    const convertido = (valor * cotacao).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const simboloMoeda = simbolos[moeda] || moeda;
    resultado.innerHTML = `Resultado: <strong>${simboloMoeda}${valor.toFixed(2)} = ${convertido}</strong>`;

    const data = cotacoes[moeda].create_date;
    const dia = data.substring(8, 10);
    const mes = data.substring(5, 7);
    const ano = data.substring(0, 4);
    const hora = data.substring(11, 16);
    atualizacao.textContent = `Cotação atualizada em ${dia}/${mes}/${ano} às ${hora}`;
  });
});