import { setCanvasSize, start } from './render/canvas';

let canvasWidth: number = window.innerWidth * 0.7;
let canvasHeight: number = window.innerHeight * 0.7;
const ANTS_POPULATION = 1000;

// Fullscreen canvas
window.addEventListener('resize', () => {
  canvasWidth = window.innerWidth * 0.7;
  canvasHeight = window.innerHeight * 0.7;
  setCanvasSize(canvasWidth, canvasHeight);
});

start(canvasWidth, canvasHeight, ANTS_POPULATION);
