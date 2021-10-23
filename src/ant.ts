import {
  createRandArray,
  degToRad,
  randomIntFromInterval
} from './helpers/maths';

export enum GlobalDir {
  TOP,
  LEFT,
  RIGHT,
  BOT
}

const RANDOM_POOL = createRandArray(10000);
enum Turn {
  RIGHT = 'right',
  LEFT = 'left',
  NULL = 'null'
}

export class Ant {
  private speed = 1.4;
  private turnDegAngle = 3.4;
  private turningDir: Turn = Turn.NULL;
  private rad: number;
  public baseRadAngle: number;
  public randPoolIndex: number = randomIntFromInterval(0, RANDOM_POOL.length);
  public color = '#D0CD94';
  public isHoldingFood = false;
  public isGoingTowardHome = false;

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
    this.baseRadAngle = this.rad;
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
      if (this.intend < 0.08) {
        this.turningDir = Turn.RIGHT;
      } else if (this.intend > 0.92) {
        this.turningDir = Turn.LEFT;
      }
    } else {
      this.manageCurrentTurn();
    }
  }

  // lookForPheromonePath() {}

  manageCurrentTurn(): void {
    if (this.turningDir === Turn.LEFT) {
      this.turnLeft();
    } else {
      this.turnRight();
    }
    if (this.intend < 0.1) {
      this.turningDir = Turn.NULL;
    }
  }

  turnRight(): void {
    this.deg += this.turnDegAngle;
    this.rad = degToRad(this.deg);
    while (this.rad > 2 * Math.PI) {
      this.rad -= 2 * Math.PI;
    }
  }

  turnLeft(): void {
    this.deg -= this.turnDegAngle;
    this.rad = degToRad(this.deg);
    while (this.rad < -2 * Math.PI) {
      this.rad += 2 * Math.PI;
    }
  }

  public getCurrenAngle(): GlobalDir {
    if (Math.PI / 4 < this.rad && this.rad < (3 * Math.PI) / 4) {
      return GlobalDir.BOT;
    }

    if ((3 * Math.PI) / 4 < this.rad && this.rad < (5 * Math.PI) / 4) {
      return GlobalDir.LEFT;
    }

    if ((5 * Math.PI) / 4 < this.rad && this.rad < (7 * Math.PI) / 4) {
      return GlobalDir.TOP;
    }

    return GlobalDir.RIGHT;
  }

  public respawn(): void {
    this.x = this.canvasWidth / 2;
    this.y = this.canvasHeight / 2;
  }

  public dropFood(): void {
    this.isHoldingFood = false;
  }

  public takeFood(): void {
    this.isHoldingFood = true;
    this.rad += Math.PI;
  }

  // public goHome(): void {
  //   this.rad = this.getAngleToCenter();
  // }

  // getAngleToCenter(): number {
  //   return (
  //     this.baseRadAngle -
  //     Math.atan2(this.canvasWidth / 2 - this.x, this.canvasHeight / 2 - this.y)
  //   );
  // }
}
