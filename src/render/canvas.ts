import { Ant } from '../ant';
import { randomIntFromInterval } from '../helpers/maths';
import {
  generatePheromoneDataGrid,
  getMapIndexesFromPos,
  PheromoneDataGrid
} from '../pheromones';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

let pheromoneMap: PheromoneDataGrid = [];
const CELL_SIZE = 5;
const ants: Ant[] = [];

export function setCanvasSize(width: number, height: number): void {
  canvas.width = width;
  canvas.height = height;
}

function init(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  population: number
): void {
  setCanvasSize(width, height);
  ctx.fillStyle = '#0D080C';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById('app')?.append(canvas);
  createAnts(population);
  createPheromoneMap(CELL_SIZE, canvas.width, canvas.height);
}

function draw(ctx: CanvasRenderingContext2D): void {
  /// pheromone display
  pheromoneMap.forEach((row) => {
    row.forEach((cell) => {
      // eslint-disable-next-line max-len
      if (cell.toHomePheromoneConcentration > 0) {
        cell.toHomePheromoneConcentration -= 0.00003;
      }
      if (cell.toFoodPheromoneConcentration > 0) {
        cell.toFoodPheromoneConcentration -= 0.00003;
      }
      ctx.fillStyle = `rgba( 255, 0, 0, ${cell.toHomePheromoneConcentration})`;
      ctx.fillRect(cell.x, cell.y, cell.size, cell.size);
      ctx.fillStyle = `rgba( 0, 255, 0, ${cell.toFoodPheromoneConcentration})`;
      ctx.fillRect(cell.x, cell.y, cell.size, cell.size);
    });
  });
  ctx.fillStyle = 'rgba(13, 8, 12, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ants.forEach((ant) => {
    // this method handle all mooving behavior and updtate x & y
    ant.moove();
    ant.getCurrenAngle();
    const antPos = {
      x: ant.x,
      y: ant.y
    };

    if (
      antPos.x < 0 ||
      antPos.x > canvas.width ||
      antPos.y < 0 ||
      antPos.y > canvas.height
    ) {
      ant.takeFood();
      //ant.respawn();
    } else {
      const { rowI, columnI } = getMapIndexesFromPos(
        antPos.x,
        antPos.y,
        CELL_SIZE
      );

      const currentTile = pheromoneMap[rowI][columnI];
      if (ant.isHoldingFood) {
        currentTile.toFoodPheromoneConcentration += 0.0005;
      } else {
        currentTile.toHomePheromoneConcentration += 0.0005;
      }

      if (currentTile.foodConcentration > 0 && !ant.isHoldingFood) {
        ant.takeFood();
        currentTile.foodConcentration -= 0.001;
      }

      pheromoneMap[rowI][columnI] = currentTile;
      const renderedAnt = new Path2D();
      renderedAnt.arc(antPos.x, antPos.y, 1, 0, 2 * Math.PI);
      ctx.fillStyle = ant.color;
      ctx.fill(renderedAnt);
    }
  });

  requestAnimationFrame(() => draw(ctx));
}

function createAnts(amount: number): void {
  for (let i = 0; i < amount; i++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const angle = randomIntFromInterval(0, 360);
    ants.push(new Ant(x, y, angle, canvas.width, canvas.height));
  }
}

function createPheromoneMap(
  cellSize: number,
  width: number,
  height: number
): void {
  pheromoneMap = generatePheromoneDataGrid(cellSize, width, height);
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
