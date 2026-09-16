let nome = document.querySelector("#nome");
let sortear = document.querySelector("#sortear");
let resultado = document.querySelector("#resultado");
let premio = document.querySelector("#premio");

let brindes = [
    {
        nome: "Fone Bluetooth",
        imagem: "imagem/foneBluetooth.png"
    },
    {
        nome: "⌨️ Teclado"
    },
    {
        nome: "🖱️ Mouse"
    },
    {
        nome: "🔊 Caixa de Som Bluetooth"
    },
    {
        nome: "⌚ Smartwatch"
    },
    {
        nome: "🔋 Carregador Portátil"
    },
    {
        nome: "💾 Pen Drive"
    }
];

sortear.addEventListener("click", () => {

    let nomeCliente = nome.value.trim();

    // Verifica se o nome foi informado
    if (nomeCliente === "") {

        resultado.innerHTML = "⚠️ Por favor, informe seu nome.";
        premio.innerHTML = "";

        return;
    }

    // Gera um número aleatório
    let numeroAleatorio = Math.floor(Math.random() * brindes.length);

    // Escolhe o brinde
    let brindeSorteado = brindes[numeroAleatorio];

    // Apresenta o nome do cliente
    resultado.innerHTML = `
        <p>🎉 Parabéns, <strong>${nomeCliente}</strong>!</p>
        <p>Seu brinde foi:</p>
    `;

    // Se o brinde tiver imagem, mostra a imagem
    if (brindeSorteado.imagem) {

        premio.innerHTML = `
            <img src="${brindeSorteado.imagem}" alt="Fone Bluetooth">
            <p>${brindeSorteado.nome}</p>
        `;

    } else {

        // Caso não tenha imagem, mostra o emoji e nome
        premio.innerHTML = brindeSorteado.nome;
    }

    // Reinicia a animação
    premio.classList.remove("destaque");

    void premio.offsetWidth;

    // Aplica a animação
    premio.classList.add("destaque");
});