export function randomFloatFromInterval(min: number, max: number): number {
  // min and max included
  return Math.random() * (max - min + 1) + min;
}

export function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function degToRad(degAngle: number): number {
  return (degAngle * Math.PI) / 180;
}
