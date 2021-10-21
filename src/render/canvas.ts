import { Ant } from '../ant';
import { randomIntFromInterval } from '../helpers/maths';

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

export function setCanvasSize(width: number, height: number): void {
  canvas.width = width;
  canvas.height = height;
}

function init(
  ctx: CanvasRenderingContext2D,
  styleWidth: number,
  styleHeight: number,
  population: number
): void {
  console.log(styleHeight, styleWidth);
  setCanvasSize(styleWidth, styleHeight);
  ctx.fillStyle = '#0D080C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById('app')?.append(canvas);
  createAnts(1000);
}

function draw(ctx: CanvasRenderingContext2D): void {
  ctx.fillStyle = 'rgba(13, 8, 12, 0.1)';
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

export function start(
  width: number,
  height: number,
  antsPopulation: number
): void {
  if (ctx) {
    init(ctx, width, height, antsPopulation);
    draw(ctx);
  }
}
