// ========================================
// CONFIGURAÇÃO DO JOGO
// ========================================

const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 500,

    // O Phaser vai colocar o jogo dentro da div "jogo"
    parent: "jogo",

    // Sistema de física
    physics: {
        default: "arcade",

        arcade: {
            gravity: {
                y: 800
            },

            debug: false
        }
    },

    // Cenas do jogo
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// ========================================
// VARIÁVEIS
// ========================================

let player;
let ground;

let cursors;
let keys;

let chegouAoDestino = false;
let mensagemFinal;


// ========================================
// PRELOAD
// ========================================

function preload() {

    // Por enquanto não precisamos carregar imagens.
    // Vamos criar o personagem e o cenário
    // diretamente pelo Phaser.
}


// ========================================
// CREATE
// ========================================

function create() {

    // ------------------------------------
    // FUNDO
    // ------------------------------------

    this.cameras.main.setBackgroundColor("#87CEEB");


    // ------------------------------------
    // NUVENS
    // ------------------------------------

    this.add.circle(120, 90, 35, 0xffffff);
    this.add.circle(155, 90, 45, 0xffffff);
    this.add.circle(195, 90, 30, 0xffffff);

    this.add.circle(570, 130, 30, 0xffffff);
    this.add.circle(605, 125, 40, 0xffffff);
    this.add.circle(645, 135, 25, 0xffffff);


    // ------------------------------------
    // CHÃO
    // ------------------------------------

    ground = this.add.rectangle(
        400,
        475,
        800,
        50,
        0x43a047
    );

    // Adiciona física ao chão
    this.physics.add.existing(ground, true);


    // ------------------------------------
    // PERSONAGEM
    // ------------------------------------

    player = this.add.rectangle(
        100,
        420,
        40,
        60,
        0xff4d6d
    );

    // Adiciona física ao personagem
    this.physics.add.existing(player);


    // Impede o personagem de sair da tela
    player.body.setCollideWorldBounds(true);


    // ------------------------------------
    // COLISÃO COM O CHÃO
    // ------------------------------------

    this.physics.add.collider(
        player,
        ground
    );


    // ------------------------------------
    // CONTROLES
    // ------------------------------------

    // Setas do teclado
    cursors = this.input.keyboard.createCursorKeys();


    // Teclas A e D
    keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });


    // ------------------------------------
    // PONTO DE DESTINO
    // ------------------------------------

    // Poste da bandeira
    this.add.rectangle(
        740,
        400,
        6,
        100,
        0x555555
    );


    // Bandeira
    const bandeira = this.add.graphics();

    bandeira.fillStyle(
        0xffd54f,
        1
    );

    bandeira.fillTriangle(
        743,
        350,
        743,
        390,
        790,
        370
    );


    // Texto indicando o objetivo
    this.add.text(
        650,
        315,
        "CHEGADA!",
        {
            fontSize: "20px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#3288b5",
            strokeThickness: 4
        }
    );


    // ------------------------------------
    // TEXTO DE INSTRUÇÕES
    // ------------------------------------

    this.add.text(
        20,
        20,
        "← → ou A/D para mover",
        {
            fontSize: "20px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#3288b5",
            strokeThickness: 4
        }
    );
}


// ========================================
// UPDATE
// ========================================

function update() {

    // ------------------------------------
    // MOVIMENTO PARA A ESQUERDA
    // ------------------------------------

    if (
        cursors.left.isDown ||
        keys.left.isDown
    ) {

        player.body.setVelocityX(-200);
    }


    // ------------------------------------
    // MOVIMENTO PARA A DIREITA
    // ------------------------------------

    else if (
        cursors.right.isDown ||
        keys.right.isDown
    ) {

        player.body.setVelocityX(200);
    }


    // ------------------------------------
    // PARAR
    // ------------------------------------

    else {

        player.body.setVelocityX(0);
    }


    // ------------------------------------
    // VERIFICAR SE CHEGOU AO DESTINO
    // ------------------------------------

    if (
        player.x >= 720 &&
        !chegouAoDestino
    ) {

        chegouAoDestino = true;

        // Para o personagem
        player.body.setVelocityX(0);

        // Mensagem de vitória
        mensagemFinal = this.add.text(
            400,
            230,
            "🎉 Você chegou ao destino!",
            {
                fontSize: "30px",
                color: "#ffffff",
                fontStyle: "bold",
                stroke: "#3288b5",
                strokeThickness: 6
            }
        );

        // Centraliza a mensagem
        mensagemFinal.setOrigin(0.5);
    }
}


// ========================================
// INICIAR O JOGO
// ========================================

const game = new Phaser.Game(config);
