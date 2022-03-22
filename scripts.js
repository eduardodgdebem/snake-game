let isPlaying = new BehaviorSubject(false);

let ctx;
let numOfReplays = 0;

function start() {
  isPlaying = true;
  numOfReplays++;
  console.log(numOfReplays);

    setCanvas();  

  if(ctx) setInterval(game, 80);
}

const setCanvas = () => {
  document.getElementsByClassName("custom-btn btn-3").disabled = true;

  const style = document.createElement("style");
  style.innerHTML = `
        canvas {
            outline: none;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
            box-shadow:inset 2px 2px 2px 0px rgba(73, 73, 73, 0.5)
        }
        #stage { 
            width: 400px;
            height: 400px;
            border: 8px solid white;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: auto;
            margin-left: auto;
            margin-right: auto;
            display: block;
            box-shadow:inset 
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
    `;
  document.head.appendChild(style);

  let stage = document.getElementById("stage");
  ctx = stage.getContext("2d");

  document.addEventListener("keydown", keyPush);
};

const removeCanvas = () => {
  ctx = null;
};

const vel = 1;

let vx = 0;
let vy = 0;
let px = 10;
let py = 10;
let tp = 20;
let qp = 20;
let = ax = ay = 15;

let trail = [];
let tail = 5;

clearPoint();

function died() {
  removeCanvas();
  stopGame();
  document.removeEventListener("keydown", keyPush);
  alert("Fim de jogo! sua pontuacao foi: " + (trail.length - 5) + " macas");
}

const setDefaultValues = () => {
  vx = 0;
  vy = 0;
  px = 10;
  py = 10;
  tp = 20;
  qp = 20;
  ax = 15;
  ay = 15;
  trail = [];
  tail = 5;
};

function clearPoint() {
  const divPlacar = document.getElementById("placar");
  const html = "Pontos: 0";
  divPlacar.innerHTML = html;
}
function updatePoints() {
  const divPlacar = document.getElementById("placar");
  const points = trail.length - 4;
  const html = `Pontos: ${points}`;
  divPlacar.innerHTML = html;
}

function game() {
  px += vx;
  py += vy;
  if (px < 0) {
    px = qp - 1;
  }
  if (px > qp - 1) {
    px = 0;
  }
  if (py < 0) {
    py = qp - 1;
  }
  if (py > qp - 1) {
    py = 0;
  }

  ctx.fillStyle = "#d0e0f7";
  ctx.fillRect(0, 0, stage.width, stage.height);

  ctx.fillStyle = "red";
  ctx.fillRect(ax * tp, ay * tp, tp, tp);

  ctx.fillStyle = "#3a7830";

  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);
    if (trail[i].x == px && trail[i].y == py) {
      if (trail.length > 5) {
        died();
        console.log("opas");
        break;
      }
    }
  }

  trail = [...trail, { x: px, y: py }];
  while (trail.length > tail) {
    trail.shift();
  }

  if (ax == px && ay == py) {
    tail++;
    ax = Math.floor(Math.random() * qp);
    ay = Math.floor(Math.random() * qp);
    updatePoints();
  }
}

function stopGame() {
  isPlaying = false;
}

function keyPush(event) {
  switch (event.keyCode) {
    case 37: // Left
      vx = -vel;
      vy = 0;
      break;
    case 38: // up
      vx = 0;
      vy = -vel;
      break;
    case 39: // right
      vx = vel;
      vy = 0;
      break;
    case 40: // down
      vx = 0;
      vy = vel;
      break;
  }
}
