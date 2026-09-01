let lampada = document.getElementById("lampada");
let botao = document.getElementById("botao");
let pinguim = document.getElementById("pinguim");

let ligada = false;
let intervalo;

botao.addEventListener("click", function() {

    if (ligada == false) {

        // Liga a lâmpada
        lampada.src = "imagens/lampadaAcessa.png";

        // Libera o pinguim para dançar
        pinguim.src = "imagens/bailando.gif";

        botao.textContent = "🔌 Desligar lâmpada";

        ligada = true;

        // Começa a trocar as cores
        intervalo = setInterval(function() {

            let cores = [
                "red",
                "blue",
                "purple",
                "hotpink",
                "cyan",
                "lime",
                "orange",
                "yellow"
            ];

            let corAleatoria = cores[Math.floor(Math.random() * cores.length)];

            // Brilho intenso da lâmpada
            lampada.style.filter =
                "drop-shadow(0 0 20px " + corAleatoria + ")" +
                " drop-shadow(0 0 40px " + corAleatoria + ")" +
                " drop-shadow(0 0 70px " + corAleatoria + ")" +
                " drop-shadow(0 0 110px " + corAleatoria + ")";

        }, 500);

    } else {

        // Desliga a lâmpada
        lampada.src = "imagens/lampadaApagada.png";

        // Congela o pinguim
        pinguim.src = "imagens/bailandoCongelado.png";

        botao.textContent = "💡 Ligar lâmpada";

        ligada = false;

        // Para a troca de cores
        clearInterval(intervalo);

        // Remove o brilho
        lampada.style.filter = "none";
    }
});