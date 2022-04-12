let ctx;

const vel = 1;
let numOfPlays = 0;
let vx = (vy = 0);
let px = (py = 10);
let tp = (qp = 20);
let ax = (ay = 15);
let trail = [];
let tail = 5;

let latestInput;

clearPoint();

function start() {
  setVisible();
  reloadExeption();
  setCanvas();

  setInterval(game, 90);
}

function game() {
  numOfPlays++;

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

  trail.forEach(({ x, y }) => {
    ctx.fillRect(x * tp, y * tp, tp - 1, tp - 1);
    if (x == px && y == py) {
      if (trail.length > 5) {
        vx = vy = 0;
        tail = 5;
        died();
      }
    }
  });

  trail = [...trail, { x: px, y: py }];
  while (trail.length > tail) {
    trail.shift();
  }

  addPoint();
}

const addPoint = () => {
  if (ax == px && ay == py) {
    possibleX = Math.floor(Math.random() * qp);
    possibleY = Math.floor(Math.random() * qp);

    const isInside = trail.some(({ x, y }) => { return x == possibleX && y == possibleY });
    if (!isInside) {
      ax = possibleX;
      ay = possibleY;
      updatePoints();
      return tail++;
    } else {
      return addPoint();
    }
  }
};

const setCanvas = () => {
  document.getElementsByClassName("custom-btn btn-3").disabled = true;

  const stage = document.getElementById("stage");

  ctx = stage.getContext("2d");

  document.addEventListener("keydown", keyPush);
};

const setVisible = () => {
  const stage = document.getElementById("stage");
  const scoreboard = document.getElementById("scoreboard");

  stage.style.visibility = "visible";
  scoreboard.style.visibility = "visible";
};

const reloadExeption = () => {
  if (numOfPlays > 1) {
    location.reload();
  }
};

const died = () => {
  document.getElementById("btnJogar").innerHTML = "Jogar Novamente";
  document.removeEventListener("keydown", keyPush);
  alert("Fim de jogo! sua pontuacao foi: " + (trail.length - 5) + " macas");
};

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

const updatePoints = () => {
  const scoreboardDiv = document.getElementById("scoreboard");
  const points = trail.length - 4;
  const text = `Pontos: ${points}`;
  scoreboardDiv.innerHTML = text;
};

function clearPoint() {
  const scoreboardDiv = document.getElementById("scoreboard");
  const text = "Pontos: 0";
  scoreboardDiv.innerHTML = text;
}

let previousDirection;

const left = 37;
const right = 39;
const up = 38;
const down = 40;

const directionConfig = {
  [left]: { cant: right },
  [right]: { cant: left },
  [up]: { cant: down },
  [down]: { cant: up },
};

const keyPush = (event) => {
  const currentKey = event.keyCode;
  const exeptionDirection = directionConfig[currentKey].cant;

  if (previousDirection !== exeptionDirection) {
    previousDirection = currentKey;
    directionSwitch(currentKey);
  }
};

const directionSwitch = (key) => {
  switch (key) {
    case left:
      vx = -vel;
      vy = 0;
      break;
    case up:
      vx = 0;
      vy = -vel;
      break;
    case right:
      vx = vel;
      vy = 0;
      break;
    case down:
      vx = 0;
      vy = vel;
      break;
  }
};
