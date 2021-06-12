import * as PIXI from 'pixi.js';

// create app
const app = new PIXI.Application({backgroundColor: 0xdddddd, width: 1024, height: 768});
document.getElementById('app').appendChild(app.view);

const startGame = () => {
    const {width, height} = app.view;
    const mario = PIXI.Sprite.from('mario');
    console.log(width, height, mario.width, width - mario.width * 2);
    mario.anchor.x = 0.5;
    mario.anchor.y = 0.5;
    app.stage.addChild(mario);

    // tween mario
    // mario
    app.ticker.add(() => {
        const mWidth = width - mario.width;
        const mHeight = height - mario.height;
        const timeDiff = app.ticker.lastTime / 1000;
        mario.x = mario.width / 2 + mWidth / 2 + Math.cos(timeDiff) * mWidth / 2;
        mario.y = mario.height / 2 + mHeight / 2 + Math.sin(timeDiff) * mHeight / 2;
    });
};
const preload = () => {
    const loader = new PIXI.Loader();
    loader.add('mario', 'assets/mario.png');
    loader.onComplete.add(startGame);
    loader.load();
};

// add listeners
window.addEventListener('load', preload);

// DEBUG
// window.app = app;
// window.PIXI = PIXI;
