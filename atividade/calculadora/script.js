// Pegamos a tela da calculadora
let tela = document.getElementById("tela");

// Adiciona um número ou operador na tela
function adicionar(valor) {
    tela.value += valor;
}

// Limpa completamente a tela
function limpar() {
    tela.value = "";
}

// Apaga o último caractere
function apagar() {
    tela.value = tela.value.slice(0, -1);
}

// Faz o cálculo
function calcular() {

    try {
        tela.value = eval(tela.value);
    } catch {
        tela.value = "Erro";
    }

}