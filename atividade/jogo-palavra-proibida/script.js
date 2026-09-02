// ===============================
// JOGO PALAVRA PROIBIDA
// ===============================


// Palavra secreta
const palavraSecreta = "BANANA";


// Palavra mostrada na tela
let palavraAtual = ["_", "_", "_", "_", "_", "_"];


// Chances
let chances = 5;


// Elementos do HTML
const palavraElement = document.getElementById("word");
const heartsElement = document.getElementById("hearts");
const messageElement = document.getElementById("message");
const keyboardElement = document.getElementById("keyboard");



// ===============================
// DICA VIP
// ===============================


const vipButton = document.getElementById("vip-button");
const vipHint = document.getElementById("vip-hint");


vipButton.addEventListener("click", () => {


    vipHint.classList.remove("hidden");


    vipHint.textContent =
        "🔐 Pista confidencial: É uma fruta amarela, mas a descrição tenta te enganar! 🍌";


    vipButton.disabled = true;
});



// ===============================
// APOSTA FINAL
// ===============================


const finalButton = document.getElementById("final-button");
const finalInput = document.getElementById("final-input");
const guessInput = document.getElementById("guess");
const submitGuess = document.getElementById("submit-guess");



// Abrir campo da aposta final
finalButton.addEventListener("click", () => {


    finalInput.classList.remove("hidden");


    guessInput.focus();


});



// Enviar aposta final
submitGuess.addEventListener("click", () => {


    const resposta = guessInput.value.trim().toUpperCase();


    if (resposta === "") {
        messageElement.textContent = "Digite uma palavra primeiro! 👀";
        return;
    }


    if (resposta === palavraSecreta) {


        palavraAtual = palavraSecreta.split("");


        atualizarTela();


        messageElement.textContent =
            "🎉 APOSTA CERTA! VOCÊ DESCOBRIU A PALAVRA! 🍌";


        desativarTeclado();


        finalButton.disabled = true;
        submitGuess.disabled = true;
        guessInput.disabled = true;


        // ATIVA O CAOS
        ativarCaos();


    } else {


        chances--;


        atualizarTela();


        if (chances <= 0) {


            messageElement.textContent =
                "💀 APOSTA ERRADA! Você perdeu todas as chances! A palavra era BANANA.";


            desativarTeclado();


            finalButton.disabled = true;
            submitGuess.disabled = true;
            guessInput.disabled = true;


        } else {


            messageElement.textContent =
                "❌ Cartada errada! Você perdeu uma chance.";


        }


    }


});



// Permitir apertar ENTER para enviar a aposta
guessInput.addEventListener("keydown", (event) => {


    if (event.key === "Enter") {
        submitGuess.click();
    }


});



// ===============================
// ATUALIZAR A TELA
// ===============================


function atualizarTela() {


    palavraElement.textContent = palavraAtual.join(" ");


    heartsElement.textContent =
        "❤️".repeat(chances);


}



// ===============================
// TECLADO
// ===============================


const botoes = keyboardElement.querySelectorAll("button");


botoes.forEach(botao => {


    botao.addEventListener("click", () => {


        const letra = botao.textContent;


        // Impede clicar novamente
        botao.disabled = true;



        // A letra existe?
        if (palavraSecreta.includes(letra)) {


            for (let i = 0; i < palavraSecreta.length; i++) {


                if (palavraSecreta[i] === letra) {
                    palavraAtual[i] = letra;
                }


            }


            messageElement.textContent =
                "✅ Boa! Você acertou uma letra!";


        } else {


            chances--;


            messageElement.textContent =
                "❌ Errou! Você perdeu uma chance.";


        }



        atualizarTela();


        verificarResultado();


    });


});



// ===============================
// VERIFICAR RESULTADO
// ===============================


function verificarResultado() {


    // Vitória
    if (!palavraAtual.includes("_")) {


        messageElement.textContent =
            "🎉 VOCÊ VENCEU! A palavra era BANANA! 🍌";


        desativarTeclado();


        finalButton.disabled = true;


        // ATIVA O CAOS
        ativarCaos();


        return;
    }



    // Derrota
    if (chances <= 0) {


        messageElement.textContent =
            "💀 VOCÊ PERDEU! A palavra era BANANA!";


        desativarTeclado();


        finalButton.disabled = true;


    }


}



// ===============================
// DESATIVAR TECLADO
// ===============================


function desativarTeclado() {


    botoes.forEach(botao => {
        botao.disabled = true;
    });


}



// ===============================
// VITÓRIA CAÓTICA
// ===============================


function ativarCaos() {


    const victoryScreen =
        document.getElementById("victory-screen");


    const chaosContainer =
        document.getElementById("chaos-container");


    // Mostra a tela de vitória
    victoryScreen.classList.remove("hidden");



    // Frases aleatórias
    const frases = [

        "VOCÊ ACERTOU",
        "BANANA",
        "COMO???",
        "ABSURDO",
        "IMPOSSÍVEL",
        "QUE HABILIDADE",
        "ACERTOU MESMO",
        "PARABÉNS",
        "NÃO ACREDITO",
        "100% BANANA",
        "VOCÊ É UM GÊNIO",
        "ERROU? NÃO.",
        "PALAVRA ENCONTRADA",
        "VITÓRIA",
        "HAHAHAHA",
        "POR QUÊ???",
        "🗿",
        "🍌",
        "🎉",
        "💎",
        "🔥"

    ];



    // ===============================
    // TEXTOS VOANDO
    // ===============================


    for (let i = 0; i < 45; i++) {


        const elemento =
            document.createElement("div");


        elemento.classList.add("chaos-object");


        elemento.textContent =
            frases[Math.floor(Math.random() * frases.length)];


        elemento.style.left =
            Math.random() * 100 + "%";


        elemento.style.top =
            Math.random() * 100 + "%";


        elemento.style.setProperty(
            "--x",
            (Math.random() * 800 - 400) + "px"
        );


        elemento.style.setProperty(
            "--y",
            (Math.random() * 800 - 400) + "px"
        );


        elemento.style.setProperty(
            "--rotation",
            (Math.random() * 360) + "deg"
        );


        elemento.style.setProperty(
            "--duration",
            (1.5 + Math.random() * 3) + "s"
        );


        chaosContainer.appendChild(elemento);


    }



    // ===============================
    // CONFETES
    // ===============================


    for (let i = 0; i < 120; i++) {


        const confetti =
            document.createElement("div");


        confetti.classList.add("confetti");


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.top =
            "-30px";


        confetti.style.setProperty(
            "--rotation",
            (Math.random() * 360) + "deg"
        );


        confetti.style.setProperty(
            "--duration",
            (2 + Math.random() * 4) + "s"
        );


        chaosContainer.appendChild(confetti);


    }


}



// ===============================
// INICIAR JOGO
// ===============================


atualizarTela();