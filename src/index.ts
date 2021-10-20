import { Ant } from './ant';
import { randomIntFromInterval } from './helpers/maths';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const antsPool: Ant[] = [];

function populateAntPool(amount: number): void {
  for (let i = 0; i < amount; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const angle = randomIntFromInterval(0, 360);
    antsPool.push(new Ant(x, y, angle, canvas.width, canvas.height));
  }
}

function init(): void {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  document.getElementById('app')?.append(canvas);
  populateAntPool(10);
}

function draw(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba( 27, 38, 49, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(() => draw(ctx));
  antsPool.forEach((ant) => {
    ant.moove();
    const renderedAnt = new Path2D();
    renderedAnt.arc(ant.x, ant.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = ant.color;
    ctx.fill(renderedAnt);
  });
}
// Fullscreen canvas
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

if (ctx) {
  init();
  draw(ctx);
}
