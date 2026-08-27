// 1. Função Nominal
function verificarParImpar(numero) {
    if (numero % 2 == 0) {
        console.log("O número é par")
    } else {
        console.log("O número é ímpar")
    }
}

verificarParImpar(8)


// 2. Função Anônima
let verificarParImparAnonima = function(numero) {
    if (numero % 2 == 0) {
        console.log("O número é par")
    } else {
        console.log("O número é ímpar")
    }
}

verificarParImparAnonima(7)


// 3. Arrow Function
let verificarParImparArrow = (numero) => {
    if (numero % 2 == 0) {
        console.log("O número é par")
    } else {
        console.log("O número é ímpar")
    }
}

verificarParImparArrow(10)