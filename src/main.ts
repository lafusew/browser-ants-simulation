import { AntsSimulation } from './core/simulation';

let SIM: AntsSimulation;

let amountInput: HTMLInputElement;
let btn: HTMLButtonElement;

document.addEventListener('DOMContentLoaded', () => {
  amountInput = document.getElementById('amount') as HTMLInputElement;
  btn = document.getElementById('start') as HTMLButtonElement;
  btn.addEventListener('click', instanciateSimulation);
});

function instanciateSimulation(): void {
  let canvasSize: number;
  const ants_population = parseInt(amountInput.value);

  if (window.innerHeight < 700) {
    canvasSize = window.innerHeight * 0.7;
  } else {
    canvasSize = window.innerWidth * 0.7 > 700 ? 700 : window.innerWidth * 0.7;
  }

  btn.removeEventListener('click', instanciateSimulation);
  btn.innerHTML = 'Stop';

  document.getElementById('params-container').replaceChildren(btn);
  btn.addEventListener('click', stopSimulation);

  if (ants_population > 5000) {
    SIM = new AntsSimulation(canvasSize, canvasSize, 5000, 5);
  } else {
    SIM = new AntsSimulation(canvasSize, canvasSize, ants_population, 5);
  }

  draw();
}

function stopSimulation(): void {
  btn.removeEventListener('click', stopSimulation);
  btn.innerHTML = 'Start';

  btn.addEventListener('click', instanciateSimulation);

  SIM.canvas.remove();

  // Remove pointing reference to trigger garbage collector
  SIM = null;
}

function draw(): void {
  if (SIM) {
    SIM.updateSimulation();
    SIM.render();

    requestAnimationFrame(draw);
  }
}
