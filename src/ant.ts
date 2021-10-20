import { degToRad } from './helpers/maths';

enum Turn {
  RIGHT = 'right',
  LEFT = 'left',
  NULL = 'null'
}

export class Ant {
  private speed = 1;
  private turnDegAngle = 5;
  private turningDir: Turn = Turn.NULL;
  private rad: number;
  public color = '#fff'; // + Math.floor(Math.random() * 16777215).toString(16);

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
    this.intend = Math.random();

    if (this.turningDir === Turn.NULL) {
      if (this.intend < 0.05) {
        this.turningDir = Turn.RIGHT;
      } else if (this.intend > 0.95) {
        this.turningDir = Turn.LEFT;
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
    if (this.intend < 0.2) {
      this.turningDir = Turn.NULL;
    }
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
