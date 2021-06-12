# Set up steps

## Initialize npm

create a folder for a project. go to that folder in your command line terminal. enter the command:

```bash
npm init -y
```

## Install required packages

```bash
npm i -D parcel-bundler parcel-plugin-static-files-copy
npm i pixi.js
```

## Add parcel commands to `package.json`

Open `package.json` file and replace `scripts` section with the following:

```json
  "scripts": {
    "start": "parcel index.html --open",
    "build": "parcel build index.html --no-source-maps"
  },
```

## Create source files

Create index.html in the root of the project:

```html
<html>

<head>
    <title>My parcel game</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="styles.scss" />
</head>

<body>
    <div id="app"></div>
    <script src="src/index.js"></script>
</body>

</html>

```

Create `styles.scss` in the root of the project:

```scss
html, body {
    padding: 0;
    margin: 0;
    outline: 0;
    border: none;
}

canvas {
    margin: 10px;
}
```

Create folder `src` in the root of the project and index.js file in it (`src/index.js`):

```javascript
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
```

Create folder `assets` in the project root. Put `mario.png` there.

Now we need to let parcel know that asset files should be served from the folder `assets`. Add that block to `package.json`:

```json
  "staticFiles": {
    "staticPath": [
      {
        "staticPath": "assets",
        "staticOutDir": "assets/"
      }
    ]
  }
```

## Run it:

```bash
npm start
```
