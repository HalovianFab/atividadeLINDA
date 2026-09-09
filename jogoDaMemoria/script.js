// ==============================
// JOGO DA MEMÓRIA 🧠
// ==============================
// FRUTIGER AERO EDITION 🌿🫧
// ==============================


// ==============================
// ELEMENTOS DO HTML
// ==============================

const tabuleiro = document.getElementById("tabuleiro");
const tempoElemento = document.getElementById("tempo");
const pontuacaoElemento = document.getElementById("pontuacao");
const faseElemento = document.getElementById("fase");


// ==============================
// CONFIGURAÇÕES
// ==============================

let faseAtual = 1;
let pontuacao = 0;

let cartasViradas = [];
let paresEncontrados = 0;

let bloqueado = false;

let tempoRestante = 60;
let cronometro = null;


// ==============================
// LISTA DAS IMAGENS
// ==============================

const imagens = [
    "foto1.jpg",
    "foto2.jpg",
    "foto3.jpg",
    "foto4.jpg",
    "foto5.jpg",
    "foto6.jpg",
    "foto7.jpg",
    "foto8.jpg",
    "foto9.jpg",
    "foto10.jpg"
];


// ==============================
// INICIAR O JOGO
// ==============================

iniciarFase();


// =========================================================
// 🌿 EFEITOS DE NATUREZA
// =========================================================


// ==============================
// CRIAR BOLHA
// ==============================

function criarBolha(x, y) {

    const bolha = document.createElement("span");

    bolha.style.position = "fixed";

    bolha.style.left = x + "px";
    bolha.style.top = y + "px";

    const tamanho =
        Math.floor(Math.random() * 16) + 8;

    bolha.style.width =
        tamanho + "px";

    bolha.style.height =
        tamanho + "px";

    bolha.style.borderRadius =
        "50%";

    /*
       Vidro transparente
    */

    bolha.style.background =
        "radial-gradient(circle at 30% 25%, " +
        "rgba(255,255,255,0.95) 0 10%, " +
        "rgba(255,255,255,0.35) 25%, " +
        "rgba(180,240,255,0.15) 60%, " +
        "transparent 75%)";

    bolha.style.border =
        "1px solid rgba(255,255,255,0.8)";

    bolha.style.boxShadow =
        "0 0 8px rgba(255,255,255,0.7), " +
        "inset 1px 1px 3px rgba(255,255,255,0.9)";

    bolha.style.pointerEvents =
        "none";

    bolha.style.zIndex =
        "9999";

    /*
       Variáveis para o movimento
    */

    const movimentoX =
        Math.floor(Math.random() * 100) - 50;

    const movimentoY =
        Math.floor(Math.random() * 120) + 70;

    const duracao =
        (Math.random() * 0.8 + 1.2);

    bolha.animate(

        [
            {
                transform:
                    "translate(0, 0) scale(0.3)",

                opacity: 0
            },

            {
                transform:
                    "translate(" +
                    movimentoX / 2 +
                    "px, -" +
                    movimentoY / 2 +
                    "px) scale(1)",

                opacity: 0.9
            },

            {
                transform:
                    "translate(" +
                    movimentoX +
                    "px, -" +
                    movimentoY +
                    "px) scale(1.3)",

                opacity: 0
            }
        ],

        {
            duration:
                duracao * 1000,

            easing:
                "ease-out",

            fill:
                "forwards"
        }
    );

    document.body.appendChild(bolha);

    setTimeout(function() {

        bolha.remove();

    }, duracao * 1000 + 100);
}


// ==============================
// EXPLOSÃO DE BOLHAS
// ==============================

function explosaoDeBolhas(x, y, quantidade = 7) {

    for (let i = 0; i < quantidade; i++) {

        setTimeout(function() {

            criarBolha(x, y);

        }, i * 35);
    }
}


// ==============================
// 🍃 CRIAR FOLHA
// ==============================

function criarFolha(x, y, tamanhoExtra = 0) {

    const folha = document.createElement("span");

    folha.style.position = "fixed";

    folha.style.left = x + "px";
    folha.style.top = y + "px";

    const tamanho =
        Math.floor(Math.random() * 13) +
        15 +
        tamanhoExtra;

    folha.style.width =
        tamanho + "px";

    folha.style.height =
        tamanho / 2 + "px";

    /*
       Formato de folha
    */

    folha.style.borderRadius =
        "100% 0 100% 0";

    folha.style.background =
        "linear-gradient(" +
        (Math.random() * 360) +
        "deg, " +
        "#b9f58b, " +
        "#4fc45a 55%, " +
        "#208c3d" +
        ")";

    folha.style.border =
        "1px solid rgba(255,255,255,0.45)";

    folha.style.boxShadow =
        "inset 2px 2px 3px rgba(255,255,255,0.45), " +
        "0 3px 7px rgba(20,100,40,0.25)";

    folha.style.pointerEvents =
        "none";

    folha.style.zIndex =
        "9999";

    /*
       Movimento da folha
    */

    const movimentoX =
        Math.floor(Math.random() * 260) - 130;

    const movimentoY =
        Math.floor(Math.random() * 170) + 100;

    const rotacaoInicial =
        Math.floor(Math.random() * 180);

    const rotacaoFinal =
        rotacaoInicial +
        Math.floor(Math.random() * 540) -
        270;

    const duracao =
        Math.random() * 1.2 + 1.8;

    folha.animate(

        [
            {
                transform:
                    "translate(0, 0) " +
                    "rotate(" +
                    rotacaoInicial +
                    "deg) " +
                    "scale(0.5)",

                opacity: 0
            },

            {
                transform:
                    "translate(" +
                    movimentoX / 2 +
                    "px, -" +
                    movimentoY / 2 +
                    "px) " +
                    "rotate(" +
                    (rotacaoInicial + 180) +
                    "deg) " +
                    "scale(1)",

                opacity: 0.95
            },

            {
                transform:
                    "translate(" +
                    movimentoX +
                    "px, -" +
                    movimentoY +
                    "px) " +
                    "rotate(" +
                    rotacaoFinal +
                    "deg) " +
                    "scale(0.8)",

                opacity: 0
            }
        ],

        {
            duration:
                duracao * 1000,

            easing:
                "ease-in-out",

            fill:
                "forwards"
        }
    );

    document.body.appendChild(folha);

    setTimeout(function() {

        folha.remove();

    }, duracao * 1000 + 100);
}


// ==============================
// 🍃 BRISA DE INÍCIO DE FASE
// ==============================

function brisaDeFase() {

    /*
       Bolhas e folhas começam
       em vários pontos da parte inferior.
    */

    for (let i = 0; i < 18; i++) {

        setTimeout(function() {

            const x =
                Math.random() *
                window.innerWidth;

            const y =
                window.innerHeight +
                Math.random() * 80;

            criarBolha(
                x,
                y
            );

        }, i * 100);
    }


    for (let i = 0; i < 14; i++) {

        setTimeout(function() {

            const x =
                Math.random() *
                window.innerWidth;

            const y =
                window.innerHeight +
                Math.random() * 100;

            criarFolha(
                x,
                y,
                2
            );

        }, i * 140);
    }
}


// =========================================================
// 🌿 INICIAR UMA FASE
// =========================================================

function iniciarFase() {

    clearInterval(cronometro);

    tabuleiro.innerHTML = "";

    cartasViradas = [];

    paresEncontrados = 0;

    bloqueado = false;


    // ==============================
    // QUANTIDADE DE PARES
    // ==============================

    let quantidadePares =
        faseAtual + 1;

    quantidadePares =
        Math.min(
            quantidadePares,
            imagens.length
        );


    // ==============================
    // ATUALIZAR FASE
    // ==============================

    faseElemento.textContent =
        "Fase: " + faseAtual;


    // ==============================
    // CRIAR OS PARES
    // ==============================

    let cartas = [];


    for (
        let i = 0;
        i < quantidadePares;
        i++
    ) {

        cartas.push(
            imagens[i]
        );

        cartas.push(
            imagens[i]
        );
    }


    // ==============================
    // EMBARALHAR
    // ==============================

    cartas.sort(
        () =>
            Math.random() - 0.5
    );


    // ==============================
    // CRIAR CARTAS
    // ==============================

    cartas.forEach(
        function(imagem) {

            criarCarta(imagem);

        }
    );


    // ==============================
    // 🌿 BRISA DA NOVA FASE
    // ==============================

    brisaDeFase();


    // ==============================
    // CRONÔMETRO
    // ==============================

    iniciarCronometro();
}


// =========================================================
// 🃏 CRIAR CARTA
// =========================================================

function criarCarta(imagem) {

    const carta =
        document.createElement("div");

    carta.classList.add(
        "carta"
    );

    carta.dataset.imagem =
        imagem;


    // ==============================
    // CRIAR IMAGEM
    // ==============================

    const img =
        document.createElement("img");

    img.src =
        "imagens/" + imagem;

    img.style.display =
        "none";


    carta.appendChild(img);


    // ==============================
    // CLIQUE
    // ==============================

    carta.addEventListener(
        "click",
        function(event) {

            virarCarta(
                carta,
                event
            );

        }
    );


    tabuleiro.appendChild(
        carta
    );
}


// =========================================================
// 🃏 VIRAR CARTA
// =========================================================

function virarCarta(
    carta,
    evento
) {

    // ==============================
    // VERIFICAÇÕES
    // ==============================

    if (bloqueado) {
        return;
    }

    if (
        cartasViradas.includes(carta)
    ) {
        return;
    }

    if (
        carta.classList.contains(
            "encontrada"
        )
    ) {
        return;
    }


    // ==============================
    // 🫧 EFEITO DO CLIQUE
    // ==============================

    explosaoDeBolhas(
        evento.clientX,
        evento.clientY,
        8
    );


    // ==============================
    // 🍃 ALGUMAS FOLHAS
    // ==============================

    for (let i = 0; i < 2; i++) {

        criarFolha(
            evento.clientX,
            evento.clientY
        );
    }


    // ==============================
    // MOSTRAR IMAGEM
    // ==============================

    const imagem =
        carta.querySelector("img");

    imagem.style.display =
        "block";


    // ==============================
    // GUARDAR CARTA
    // ==============================

    cartasViradas.push(
        carta
    );


    // ==============================
    // DUAS CARTAS
    // ==============================

    if (
        cartasViradas.length === 2
    ) {

        verificarPar();

    }
}


// =========================================================
// 💚 VERIFICAR PAR
// =========================================================

function verificarPar() {

    const carta1 =
        cartasViradas[0];

    const carta2 =
        cartasViradas[1];


    const imagem1 =
        carta1.dataset.imagem;

    const imagem2 =
        carta2.dataset.imagem;


    bloqueado = true;


    // ==============================
    // 🎉 ACERTOU
    // ==============================

    if (
        imagem1 === imagem2
    ) {

        carta1.classList.add(
            "encontrada"
        );

        carta2.classList.add(
            "encontrada"
        );


        // ==============================
        // +350 PONTOS
        // ==============================

        pontuacao += 350;


        pontuacaoElemento.textContent =
            "🏆 Pontos: " +
            pontuacao;


        // ==============================
        // MAIS UM PAR
        // ==============================

        paresEncontrados++;


        // ==============================
        // EFEITO ESPECIAL
        // ==============================

        const rect =
            carta1.getBoundingClientRect();

        const centroX =
            rect.left +
            rect.width / 2;

        const centroY =
            rect.top +
            rect.height / 2;


        explosaoDeBolhas(
            centroX,
            centroY,
            12
        );


        for (let i = 0; i < 5; i++) {

            criarFolha(
                centroX,
                centroY,
                5
            );
        }


        // ==============================
        // LIMPAR
        // ==============================

        cartasViradas = [];

        bloqueado = false;


        // ==============================
        // VERIFICAR FIM
        // ==============================

        verificarFimDaFase();
    }


    // ==============================
    // 💔 ERROU
    // ==============================

    else {

        setTimeout(
            function() {

                carta1
                    .querySelector("img")
                    .style.display =
                    "none";

                carta2
                    .querySelector("img")
                    .style.display =
                    "none";


                cartasViradas = [];

                bloqueado = false;

            },
            1000
        );
    }
}


// =========================================================
// 🏆 VERIFICAR FIM DA FASE
// =========================================================

function verificarFimDaFase() {

    let quantidadePares =
        faseAtual + 1;

    quantidadePares =
        Math.min(
            quantidadePares,
            imagens.length
        );


    if (
        paresEncontrados ===
        quantidadePares
    ) {

        clearInterval(
            cronometro
        );

        bloqueado = true;


        setTimeout(
            function() {


                // ==============================
                // 🏆 ÚLTIMA FASE
                // ==============================

                if (
                    faseAtual === 9
                ) {

                    alert(
                        "🏆 PARABÉNS!\n\n" +
                        "Você completou todas as fases!\n\n" +
                        "Pontuação final: " +
                        pontuacao
                    );

                    return;
                }


                // ==============================
                // 🎉 PRÓXIMA FASE
                // ==============================

                alert(
                    "🎉 Fase " +
                    faseAtual +
                    " concluída!"
                );


                faseAtual++;


                iniciarFase();

            },
            500
        );
    }
}


// =========================================================
// ⏱️ CRONÔMETRO
// =========================================================

function iniciarCronometro() {

    clearInterval(
        cronometro
    );


    tempoRestante = 60;


    atualizarTempo();


    cronometro =
        setInterval(
            function() {

                tempoRestante--;


                atualizarTempo();


                // ==============================
                // 💀 TEMPO ACABOU
                // ==============================

                if (
                    tempoRestante <= 0
                ) {

                    clearInterval(
                        cronometro
                    );

                    bloqueado = true;

                    cartasViradas = [];


                    alert(
                        "💀 O tempo acabou!\n\n" +
                        "Você chegou até a fase " +
                        faseAtual +
                        ".\n\n" +
                        "Pontuação: " +
                        pontuacao
                    );
                }

            },
            1000
        );
}


// =========================================================
// ⏱️ ATUALIZAR TEMPO
// =========================================================

function atualizarTempo() {

    const minutos =
        Math.floor(
            tempoRestante / 60
        );

    const segundos =
        tempoRestante % 60;


    const minutosTexto =
        String(minutos)
            .padStart(2, "0");

    const segundosTexto =
        String(segundos)
            .padStart(2, "0");


    tempoElemento.textContent =
        "⏱️ " +
        minutosTexto +
        ":" +
        segundosTexto;
}