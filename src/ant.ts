import {
  createRandArray,
  degToRad,
  randomIntFromInterval
} from './helpers/maths';

const RANDOM_POOL = createRandArray(10000);
enum Turn {
  RIGHT = 'right',
  LEFT = 'left',
  NULL = 'null'
}

export class Ant {
  private speed = 1;
  private turnDegAngle = 3;
  private turningDir: Turn = Turn.NULL;
  private rad: number;
  public randPoolIndex: number = randomIntFromInterval(0, RANDOM_POOL.length);
  public color = '#D0CD94';
  //+ Math.floor(Math.random() * 16777215).toString(16);

  canvasWidth: number;
  canvasHeight: number;
  x: number;
  y: number;
  intend: number;
  deg: number;

  constructor(
    x: number,
    y: number,
    angle: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.x = x;
    this.y = y;
    this.rad = degToRad(angle);
    this.deg = angle;
    this.intend = 0.5;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
  }

  moove(): void {
    this.wonderAround();
    this.y += Math.sin(this.rad) * this.speed;
    this.x += Math.cos(this.rad) * this.speed;
  }

  wonderAround(): void {
    // get a random value from the pre-generated arr
    this.intend = RANDOM_POOL[this.randPoolIndex];
    if (this.randPoolIndex >= RANDOM_POOL.length - 1) {
      this.randPoolIndex = 0;
    } else {
      this.randPoolIndex += 1;
    }

    if (this.turningDir === Turn.NULL) {
      if (this.intend < 0.001) {
        this.turningDir = Turn.RIGHT;
      } else if (this.intend > 0.999) {
        this.turningDir = Turn.RIGHT;
      }
    } else {
      this.manageCurrentTurn();
    }
  }

  manageCurrentTurn(): void {
    if (this.turningDir === Turn.LEFT) {
      this.turnLeft();
    } else {
      this.turnRight();
    }
    // if (this.intend < 0.2) {
    //   this.turningDir = Turn.NULL;
    // }
  }

  turnRight(): void {
    this.deg += this.turnDegAngle;
    this.rad = degToRad(this.deg);
  }

  turnLeft(): void {
    this.deg -= this.turnDegAngle;
    this.rad = degToRad(this.deg);
  }
}
