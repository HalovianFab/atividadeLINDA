// Quantidade e preço dos produtos
let camisetas = 3;
let precoCamiseta = 40;

let calcas = 2;
let precoCalca = 80;

let tenis = 1;
let precoTenis = 150;

// Calculando os valores
let valorCamisetas = camisetas * precoCamiseta;
let valorCalcas = calcas * precoCalca;
let valorTenis = tenis * precoTenis;

let valorTotal = valorCamisetas + valorCalcas + valorTenis;

// Quantidade total de itens
let quantidadeItens = camisetas + calcas + tenis;

// Valor médio gasto por item
let valorMedio = valorTotal / quantidadeItens;

// Imprimindo os resultados
console.log("Valor das camisetas: R$ " + valorCamisetas.toFixed(2));
console.log("Valor das calças: R$ " + valorCalcas.toFixed(2));
console.log("Valor total da compra: R$ " + valorTotal.toFixed(2));
console.log("Valor médio gasto por item: R$ " + valorMedio.toFixed(2));