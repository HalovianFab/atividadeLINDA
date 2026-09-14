// ========================================
// CONFIGURAÇÃO DO JOGO
// ========================================

const config = {
    type: Phaser.AUTO,

    width: 800,
    height: 500,

    parent: "jogo",

    physics: {
        default: "arcade",

        arcade: {
            gravity: {
                y: 800
            },

            debug: false
        }
    },

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

let obstacles;

let chegouAoDestino = false;
let perdeuOJogo = false;

let mensagemFinal;


// ========================================
// PRELOAD
// ========================================

function preload() {

    // Não precisamos carregar imagens ainda.
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
    // OBSTÁCULOS
    // ------------------------------------

    obstacles = this.physics.add.staticGroup();


    // Obstáculo 1
    let obstaculo1 = this.add.rectangle(
        280,
        420,
        50,
        60,
        0x8e44ad
    );

    obstacles.add(obstaculo1);


    // Obstáculo 2
    let obstaculo2 = this.add.rectangle(
        450,
        420,
        50,
        60,
        0xe67e22
    );

    obstacles.add(obstaculo2);


    // Obstáculo 3
    let obstaculo3 = this.add.rectangle(
        600,
        420,
        50,
        60,
        0xc0392b
    );

    obstacles.add(obstaculo3);


    // ------------------------------------
    // COLISÃO COM OS OBSTÁCULOS
    // ------------------------------------

    this.physics.add.collider(
        player,
        obstacles,

        // Usamos uma função anônima para
        // manter a cena do Phaser disponível.
        () => {
            perdeu(this);
        }
    );


    // ------------------------------------
    // CONTROLES
    // ------------------------------------

    // Setas
    cursors = this.input.keyboard.createCursorKeys();


    // A, D e W
    keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        jump: Phaser.Input.Keyboard.KeyCodes.W
    });


    // ------------------------------------
    // PONTO DE DESTINO
    // ------------------------------------

    // Poste
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


    // ------------------------------------
    // TEXTO DA CHEGADA
    // ------------------------------------

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
    // INSTRUÇÕES
    // ------------------------------------

    this.add.text(
        20,
        20,
        "← → / A D = andar   ↑ / W / Espaço = pular",
        {
            fontSize: "18px",
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

    // Se perdeu ou venceu,
    // não permite mais movimentos.

    if (perdeuOJogo || chegouAoDestino) {
        return;
    }


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
    // PULO
    // ------------------------------------

    // O personagem só pode pular
    // quando estiver encostando no chão.

    if (
        (
            cursors.up.isDown ||
            keys.jump.isDown ||
            cursors.space.isDown
        )
        &&
        player.body.blocked.down
    ) {

        player.body.setVelocityY(-450);
    }


    // ------------------------------------
    // VERIFICAR CHEGADA
    // ------------------------------------

    if (
        player.x >= 720 &&
        !chegouAoDestino
    ) {

        chegouAoDestino = true;

        // Para o personagem
        player.body.setVelocityX(0);
        player.body.setVelocityY(0);


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

        mensagemFinal.setOrigin(0.5);
    }
}


// ========================================
// FUNÇÃO DE DERROTA
// ========================================

function perdeu(scene) {

    // Evita executar várias vezes
    if (perdeuOJogo) {
        return;
    }

    perdeuOJogo = true;


    // ------------------------------------
    // PARAR O PERSONAGEM
    // ------------------------------------

    player.body.setVelocityX(0);
    player.body.setVelocityY(0);

    // Desativa o corpo físico
    player.body.enable = false;


    // ------------------------------------
    // GAME OVER
    // ------------------------------------

    mensagemFinal = scene.add.text(
        400,
        220,
        "💥 GAME OVER!",
        {
            fontSize: "40px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#c0392b",
            strokeThickness: 7
        }
    );

    mensagemFinal.setOrigin(0.5);


    // ------------------------------------
    // MENSAGEM
    // ------------------------------------

    scene.add.text(
        400,
        275,
        "Você bateu em um obstáculo!",
        {
            fontSize: "20px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#c0392b",
            strokeThickness: 4
        }
    ).setOrigin(0.5);
}


// ========================================
// INICIAR O JOGO
// ========================================

const game = new Phaser.Game(config);
