import { Ant } from './ant';
import { randomIntFromInterval } from './helpers/maths';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const ants: Ant[] = [];

function createAnts(amount: number): void {
  for (let i = 0; i < amount; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const angle = randomIntFromInterval(0, 360);
    ants.push(new Ant(x, y, angle, canvas.width, canvas.height));
  }
}

function init(ctx: CanvasRenderingContext2D): void {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  ctx.fillStyle = '#191019';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById('app')?.append(canvas);
  createAnts(20000);
}

function draw(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba(25, 16, 25, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ants.forEach((ant) => {
    ant.moove();
    const renderedAnt = new Path2D();
    renderedAnt.arc(ant.x, ant.y, 1, 0, 2 * Math.PI);
    ctx.fillStyle = ant.color;
    ctx.fill(renderedAnt);
  });
  requestAnimationFrame(() => draw(ctx));
}
// Fullscreen canvas
window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

if (ctx) {
  init(ctx);
  draw(ctx);
}
