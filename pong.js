const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const field = new Image();
field.src = "http://onidj.com/wp-content/uploads/pink-snowflake-wallpaper-high-quality-resolution-768x432.jpg"
const stick1 = new Image();
stick1.src = "https://openclipart.org/image/2400px/svg_to_png/217570/stick.png"
const stick2 = new Image();
stick2.src = "https://openclipart.org/image/2400px/svg_to_png/217570/stick.png"
const fire = new Image();
fire.src = "https://orig00.deviantart.net/1fad/f/2012/146/0/b/fire_ball_png_by_dbszabo1-d515um9.png"
let myMusic;
const gameData = {
    stick1: {
        x: 10,
        y: 30,
        width: 50,
        height: 110,
        xDelta: 8,
        yDelta: 8
    },
    stick2: {
        x: 740,
        y: 30,
        width: 50,
        height: 110,
        xDelta: 8,
        yDelta: 8
    },
    fire: {
        x: (canvas.width - 60) / 2,
        y: (canvas.height - 60) / 2,
        radius: 60,
        width: 60,
        height: 60,
        xDelta: 0,
        yDelta: 0

    },
    gameOver: false,
    score1: 0,
    score2: 0
}

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;
const space = 32;
const w = 87;
const s = 83;
const a = 65;
const d = 68;

const startGame = function() {
	
    gameData.fire.xDelta = 7;
    gameData.fire.yDelta = 9;

};
const buttons = {
    downKey: false,
    leftKey: false,
    upKey: false,
    rightKey: false,
    w: false,
    s: false,
    a: false,
    d: false
}

function collision(obj1, obj2) {
    return (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y)
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === upKey) buttons.upKey = true;
    if (event.keyCode === downKey) buttons.downKey = true;
    if (event.keyCode === w) buttons.w = true;
    if (event.keyCode === s) buttons.s = true;

    if (event.keyCode === 32) {
        startGame();
    }

}, false);


document.addEventListener('keyup', function(event) {
    if (event.keyCode === upKey) buttons.upKey = false;
    if (event.keyCode === downKey) buttons.downKey = false;
    if (event.keyCode === w) buttons.w = false;
    if (event.keyCode === s) buttons.s = false;
}, false);

const won = function(player) {
    gameData.fire.xDelta = 0;
    gameData.fire.yDelta = 0;
    gameData.fire.x = (canvas.width - gameData.fire.width) / 2;
    //gameData.fire.y=(canvas.height-gameData.fire.height)/2;
    gameData.fire.y = Math.floor(Math.random() * (canvas.height - gameData.fire.height))
    gameData[player]++;
}

const updateData = function() {
    if (buttons.upKey) {
        if (gameData.stick2.y >= 10) {
            gameData.stick2.y -= gameData.stick2.yDelta;

        }
    }
    if (buttons.downKey) {
        if (gameData.stick2.y + gameData.stick2.height <= canvas.height - 10) {
            gameData.stick2.y += gameData.stick2.yDelta;
        }


    }
    if (buttons.w) {
        if (gameData.stick1.y >= 10) {
            gameData.stick1.y -= gameData.stick1.yDelta;

        }
    }
    if (buttons.s) {
        if (gameData.stick1.y + gameData.stick1.height <= canvas.height - 10) {
            gameData.stick1.y += gameData.stick1.yDelta;
        }


    }
    if (gameData.fire.x <= gameData.stick1.width) won("score2");
    else if (gameData.fire.x >= canvas.width - gameData.stick2.width - gameData.fire.width) won("score1");
    else if (collision(gameData.fire, gameData.stick2) || collision(gameData.stick1, gameData.fire)) {
        gameData.fire.xDelta *= -1;
    } else if (gameData.fire.y <= 0 || gameData.fire.y >= canvas.height - gameData.fire.height) {
        gameData.fire.yDelta *= -1;
    }
    gameData.fire.x += gameData.fire.xDelta;
    gameData.fire.y += gameData.fire.yDelta;

};


const draw = function() {
    ctx.drawImage(field, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(stick1, gameData.stick1.x, gameData.stick1.y, gameData.stick1.width, gameData.stick1.height);
    ctx.drawImage(stick2, gameData.stick2.x, gameData.stick2.y, gameData.stick2.width, gameData.stick2.height);
    ctx.drawImage(fire, gameData.fire.x-8, gameData.fire.y-8, gameData.fire.radius+16, gameData.fire.radius+16 );
    ctx.font = "100px Arial";
    ctx.fillStyle = "black";
    const text = "-"
    const halfLine = ctx.measureText(text).width / 2
    ctx.fillText(text, canvas.width / 2 - halfLine, 100);
    ctx.fillText(gameData.score1, (canvas.width / 2 - ctx.measureText(gameData.score1).width) - halfLine, 100);
    ctx.fillText(gameData.score2, canvas.width / 2 + halfLine, 100);
};

const loop = function() {
    updateData();
    draw();

    requestAnimationFrame(loop);
};
loop();