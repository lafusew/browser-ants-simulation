import { start } from './render/canvas';

let canvasSize: number;
if (window.innerHeight < 700) {
  canvasSize = window.innerHeight * 0.7;
} else {
  canvasSize = window.innerWidth * 0.7 > 700 ? 700 : window.innerWidth * 0.7;
}

const ANTS_POPULATION = 2000;

start(canvasSize, canvasSize, ANTS_POPULATION);
