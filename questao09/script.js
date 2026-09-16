let nome = document.querySelector("#nome");
let valor = document.querySelector("#valor");
let calcular = document.querySelector("#calcular");
let resultado = document.querySelector("#resultado");

calcular.addEventListener("click", () => {

    let nomeCliente = nome.value;
    let valorCompra = Number(valor.value);

    let percentualDesconto;
    let valorDesconto;
    let valorFinal;

    if (valorCompra <= 100) {
        percentualDesconto = 0;
    } 
    else if (valorCompra <= 500) {
        percentualDesconto = 0.10;
    } 
    else {
        percentualDesconto = 0.20;
    }

    valorDesconto = valorCompra * percentualDesconto;
    valorFinal = valorCompra - valorDesconto;

    resultado.innerHTML = `
        <p><strong>Cliente:</strong> ${nomeCliente}</p>
        <p><strong>Valor da compra:</strong> R$ ${valorCompra.toFixed(2)}</p>
        <p><strong>Desconto:</strong> R$ ${valorDesconto.toFixed(2)}</p>
        <p><strong>Valor final:</strong> R$ ${valorFinal.toFixed(2)}</p>
    `;
});