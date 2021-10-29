/* eslint-disable max-len */
import { randomIntFromInterval } from '../helpers/maths';
import { Ant } from './ant';

interface PheromoneTile {
  x: number;
  y: number;
  size: number;
  toHomePheromoneConcentration: number;
  toFoodPheromoneConcentration: number;
  foodConcentration: number;
}

export class AntsSimulation {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ants: Ant[];
  private pheromoneMap: PheromoneTile[][];
  private pheromoneCellSize: number;

  constructor(
    width: number,
    height: number,
    population: number,
    pheromoneCellSize: number
  ) {
    // Create Dom and get needed references
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;

    // Initialization draw & append
    this.ctx.fillStyle = '#0D080C';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    document.getElementById('app')?.append(this.canvas);

    this.ants = this.generateAnts(population);
    this.pheromoneCellSize = pheromoneCellSize;
    this.pheromoneMap = this.generatePheromoneMap(
      this.canvas.width,
      this.canvas.height
    );
  }

  updateSimulation(): void {
    // Global pheromone decay
    this.pheromoneMap.forEach((row) => {
      row.forEach((cell) => {
        if (cell.toHomePheromoneConcentration > 0) {
          cell.toHomePheromoneConcentration -= 0.00003;
        }

        if (cell.toFoodPheromoneConcentration > 0) {
          cell.toFoodPheromoneConcentration -= 0.00006;
        }
      });
    });

    // Ants intern moovemoment behavior
    this.ants.forEach((ant) => {
      ant.moove();

      // Temporary food taking
      if (
        ant.x > this.canvas.width ||
        ant.x < 0 ||
        ant.y < 0 ||
        ant.y > this.canvas.height
      ) {
        ant.takeFood();
      }

      try {
        this.updatePheromoneTile(ant.x, ant.y, ant.isHoldingFood);
      } catch {}
    });
  }

  render(): void {
    // Draw background
    this.ctx.fillStyle = 'rgba(13, 8, 12, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw pheromone concentration;
    this.pheromoneMap.forEach((row) => {
      row.forEach((cell) => {
        this.ctx.fillStyle = `rgba( 255, 0, 0, ${cell.toHomePheromoneConcentration})`;
        this.ctx.fillRect(cell.x, cell.y, cell.size, cell.size);
        this.ctx.fillStyle = `rgba( 0, 255, 0, ${cell.toFoodPheromoneConcentration})`;
        this.ctx.fillRect(cell.x, cell.y, cell.size, cell.size);
      });
    });

    this.ants.forEach((ant) => {
      const renderedAnt = new Path2D();
      renderedAnt.arc(ant.x, ant.y, 1, 0, 2 * Math.PI);
      this.ctx.fillStyle = ant.color;
      this.ctx.fill(renderedAnt);
    });
  }

  private updatePheromoneTile(
    x: number,
    y: number,
    isAntHoldingFood: boolean
  ): { updatedTile: PheromoneTile; foodAvailableToTake: boolean } {
    const rowI = Math.floor(y / this.pheromoneCellSize);
    const columnI = Math.floor(x / this.pheromoneCellSize);
    const currentTile = this.pheromoneMap[rowI][columnI];
    let foodAvailableToTake = false;

    if (isAntHoldingFood) {
      if (currentTile.toFoodPheromoneConcentration < 1) {
        currentTile.toFoodPheromoneConcentration += 0.005;
      }
    } else {
      currentTile.toHomePheromoneConcentration += 0.0009;
    }

    if (currentTile.foodConcentration > 0 && !isAntHoldingFood) {
      foodAvailableToTake = true;
      currentTile.foodConcentration -= 0.001;
    }

    this.pheromoneMap[rowI][columnI] = currentTile;

    return {
      updatedTile: currentTile,
      foodAvailableToTake
    };
  }

  private generatePheromoneMap(
    canvasWidth: number,
    canvasHeight: number
  ): PheromoneTile[][] {
    const rows = Math.floor(canvasHeight / this.pheromoneCellSize) + 1;
    const columns = Math.floor(canvasWidth / this.pheromoneCellSize) + 1;
    const pheromoneTileMap: PheromoneTile[][] = [];
    for (let i = 0; i < rows; i++) {
      pheromoneTileMap.push([]);
      for (let j = 0; j < columns; j++) {
        const dataTile: PheromoneTile = {
          x: j * this.pheromoneCellSize,
          y: i * this.pheromoneCellSize,
          size: this.pheromoneCellSize,
          toFoodPheromoneConcentration: 0,
          toHomePheromoneConcentration: 0,
          foodConcentration: 0
        };
        pheromoneTileMap[i].push(dataTile);
      }
    }
    return pheromoneTileMap;
  }

  private generateAnts(amount: number): Ant[] {
    const ants: Ant[] = [];
    for (let i = 0; i < amount; i++) {
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      const angle = randomIntFromInterval(0, 360);
      ants.push(new Ant(x, y, angle, this.canvas.width, this.canvas.height));
    }

    return ants;
  }
}
