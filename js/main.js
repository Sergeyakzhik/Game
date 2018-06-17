let requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

let ctx = CNVS.getContext("2d");

let lastTime;

function mainLoop() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(mainLoop);
}

function init() {
    bg = ctx.createPattern(resources.get('assets/images/battlefield.png'), 'no-repeat');

    // reset();
    lastTime = Date.now();
    mainLoop();
}

resources.load([
    'assets/images/battlefield.png',
    'assets/images/img_map.png'
]);

resources.onReady(init);

let player = {
    posit: [100, 460],
    sprite: new Sprite('assets/images/img_map.png', [0, 0], [247, 263], 7, [0, 1, 2])
}

let opponent = {
    posit: [1000, 460],
    sprite: new Sprite('assets/images/img_map.png', [0, 1100], [704, 267])
}

var gameTime = 0;
var bg;

var playerSpeed = 500;

function update(dt) {
    gameTime += dt;

    handleInput(dt);
    updateEntities(dt);
}

function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
    }
}

function updateEntities(dt) {
    ctx.clearRect(0, 0, CNVS.width, CNVS.height);
    player.sprite.update(dt);
}

// function checkPlayerBounds() {
//     if(player.pos[0] < 0)
//         player.pos[0] = 0;
//     else if(player.pos[0] > CNVS.width - player.sprite.size[0])
//         player.pos[0] = CNVS.width - player.sprite.size[0];
//
//     if(player.pos[1] < 0)
//         player.pos[1] = 0;
//     else if(player.pos[1] > CNVS.height - player.sprite.size[1])
//         player.pos[1] = CNVS.height - player.sprite.size[1];
// }

function render() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, CNVS.width, CNVS.height);
    renderEntity(player);
    renderEntity(opponent);
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.posit[0], entity.posit[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function reset() {
    gameTime = 0;

    player.posit = [50, CNVS.height / 2];
};
