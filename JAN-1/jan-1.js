const SPRAYS_COUNT = 7;
const X_BOUNDARY = 100;
const Y_BOUNDARY = 100;

const steps = 300;
const step = 1 / steps;
let currentT = 0;
let bezierFactor, start, end, handle1, handle2, d;
resetBezier();

const linearG = drawingContext.createLinearGradient(0, 0, width, height);
linearG.addColorStop(0, '#00ffff');
linearG.addColorStop(0.25, '#00ffff');
linearG.addColorStop(0.5, '#38c8ff ');
linearG.addColorStop(0.75, '#4693bc');
linearG.addColorStop(1, '#416782');
drawingContext.fillStyle = linearG;



function renderSprays() {
  // draw
  for (let i = 0; i < SPRAYS_COUNT; i++) {
    const { x, y } = getBezierPoint(i , currentT);
    ellipse(x, y, d);
  }

  // update
  currentT += step;
  if (currentT >= 1) {
    currentT = 0;
    resetBezier();
  }
}

function resetBezier() {
  bezierFactor = random(-50, 50);
  start = genEndPoint();
  end = genEndPoint(true);
  handle1 = genHandle();
  handle2 = genHandle();
  d = random(2, 10);
}

function genHandle() {
  return {
    x: random(0, width),
    y: random(0, height)
  }
}

function genEndPoint(isEnd = false) {
  const pointX = isEnd ? (width - X_BOUNDARY) : X_BOUNDARY;
  return {
    x: random(pointX, pointX + random(-20, 20)),
    y: random(Y_BOUNDARY, height - Y_BOUNDARY)
  }
}

function getBezierPoint(bezierIndex, percent) {
  const offsetX = bezierIndex * bezierFactor;
  const offsetY = bezierIndex * bezierFactor;

  const h1 = { x: handle1.x + offsetX,  y: handle1.y + offsetY };
  const h2 = { x: handle2.x - offsetX, y: handle2.y + offsetY };

  return {
    x: bezierPoint(start.x, h1.x, h2.x, end.x, percent),
    y: bezierPoint(start.y, h1.y, h2.y, end.y, percent)
  }
}

export function draw() {
  background(0, 10);
  noStroke();

  renderSprays();
}
