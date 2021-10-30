import { AntsSimulation } from './core/simulation';

// Simulation related global vars
const MAX_POP = 6000;
let SIM: AntsSimulation;
let amount = 100;
let paused = false;

// Dom elements for vanilla controls
let amountDiv: HTMLDivElement;
let startBtn: HTMLButtonElement;
let pauseBtn: HTMLButtonElement;
let stopBtn: HTMLButtonElement;
let populationBtns: HTMLCollectionOf<HTMLButtonElement>;
let populationControls: HTMLDivElement;

document.addEventListener('DOMContentLoaded', () => {
  // Get all required DOM references by hand
  amountDiv = document.getElementById('population-count') as HTMLDivElement;
  amountDiv.innerHTML = amount.toString();
  startBtn = document.getElementById('start') as HTMLButtonElement;
  pauseBtn = document.getElementById('pause') as HTMLButtonElement;
  stopBtn = document.getElementById('stop') as HTMLButtonElement;

  populationControls = document.getElementById(
    'population-control'
  ) as HTMLDivElement;
  populationBtns = document.getElementsByClassName(
    'population-btn'
  ) as HTMLCollectionOf<HTMLButtonElement>;

  // Handle btns & listenners
  handlePopulationEventListenners('ADD');
  startBtn.addEventListener('click', startSimulation);
});

function startSimulation(): void {
  // Set size
  let canvasSize: number;
  if (window.innerHeight < 700) {
    canvasSize = window.innerHeight * 0.7;
  } else {
    canvasSize = window.innerWidth * 0.7 > 700 ? 700 : window.innerWidth * 0.7;
  }

  // Handle btns & listenners
  startBtn.removeEventListener('click', startSimulation);
  pauseBtn.addEventListener('click', pauseSimulation);
  stopBtn.addEventListener('click', stopSimulation);
  handlePopulationEventListenners('REMOVE');

  // Instancing simulation
  const ants_population = amount;
  if (ants_population > 5000) {
    SIM = new AntsSimulation(canvasSize, canvasSize, 5000, 5);
  } else {
    SIM = new AntsSimulation(canvasSize, canvasSize, ants_population, 5);
  }

  // Triggering render loop
  draw();
}

function pauseSimulation(): void {
  // Handle btns & listenners
  pauseBtn.innerHTML = 'Resume';
  pauseBtn.removeEventListener('click', pauseSimulation);
  pauseBtn.addEventListener('click', resumeSimulation);

  // Pause
  paused = true;
}

function resumeSimulation(): void {
  // Handle btns & listenners
  pauseBtn.innerHTML = 'Pause';
  pauseBtn.removeEventListener('click', resumeSimulation);
  pauseBtn.addEventListener('click', pauseSimulation);

  // Resume
  paused = false;
  draw();
}

function stopSimulation(): void {
  // Reset pause btn
  paused = false;
  pauseBtn.innerHTML = 'Pause';

  // handle Listenners
  handlePopulationEventListenners('ADD');
  stopBtn.removeEventListener('click', stopSimulation);
  try {
    pauseBtn.removeEventListener('click', pauseSimulation);
  } catch {
    pauseBtn.removeEventListener('click', resumeSimulation);
  }
  startBtn.addEventListener('click', startSimulation);

  // Removing simulation instance in DOM & JS
  SIM.canvas.remove();
  SIM = null;
}

function handlePopulationEventListenners(type: 'ADD' | 'REMOVE'): void {
  // Add or remove all populations controls click listenners
  for (let i = 0; i < populationBtns.length; i++) {
    if (type === 'ADD') {
      populationControls.style.display = 'flex';
      populationBtns.item(i).addEventListener('click', changePopulation);
    }

    if (type === 'REMOVE') {
      populationControls.style.display = 'none';
      populationBtns.item(i).removeEventListener('click', changePopulation);
    }
  }
}

function changePopulation(e: any): void {
  const amountToAdd = parseInt(e.target.innerText);

  // Add or substract only if in range
  if (amountToAdd > 0) {
    if (amountToAdd <= MAX_POP - amount) {
      amount += amountToAdd;
      amountDiv.innerHTML = amount.toString();
    }
  } else {
    if (Math.abs(amountToAdd) <= amount) {
      amount += amountToAdd;
      amountDiv.innerHTML = amount.toString();
    }
  }
}

function draw(): void {
  if (SIM && !paused) {
    SIM.updateSimulation();
    SIM.render();

    requestAnimationFrame(draw);
  }
}
