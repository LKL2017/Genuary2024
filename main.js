let drawFunc = () => {};

const CANVAS_W = 1200;
const CANVAS_H = 742

// p5.js setup
function setup() {
  const canvas = document.getElementById('scene');
  createCanvas(CANVAS_W, CANVAS_H, canvas);
  background(220);
}
// p5.js draw
function draw() {
  drawFunc();
}


const group = document.querySelector('.gen-groups');
const GenCount = 1;

for (let i = 1; i <= GenCount; i++) {
  const button = document.createElement('button');
  button.setAttribute('date', i + '');
  button.innerText = `JAN - ${i}`;
  group.appendChild(button);
}

group.addEventListener('click', e => {
  const date = e.target.getAttribute('date');
  import(`./JAN-${date}/jan-${date}.js`)
    .then(res => drawFunc = res.draw)
    .catch(err => console.log('not yet started'))
  ;
});


