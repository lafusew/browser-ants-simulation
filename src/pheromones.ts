export interface PheromoneTile {
  x: number;
  y: number;
  size: number;
  toHomePheromoneConcentration: number;
  toFoodPheromoneConcentration: number;
  foodConcentration: number;
}

export type PheromoneDataGrid = PheromoneTile[][];

export function generatePheromoneDataGrid(
  cellSize: number,
  canvasWidth: number,
  canvasHeight: number
): PheromoneDataGrid {
  const rows = Math.floor(canvasHeight / cellSize) + 1;
  const columns = Math.floor(canvasWidth / cellSize) + 1;
  const pheromoneTileMap: PheromoneTile[][] = [];
  for (let i = 0; i < rows; i++) {
    pheromoneTileMap.push([]);
    for (let j = 0; j < columns; j++) {
      const dataTile: PheromoneTile = {
        x: j * cellSize,
        y: i * cellSize,
        size: cellSize,
        toFoodPheromoneConcentration: 0,
        toHomePheromoneConcentration: 0,
        foodConcentration: 0
      };
      pheromoneTileMap[i].push(dataTile);
    }
  }
  return pheromoneTileMap;
}

export function getMapIndexesFromPos(
  x: number,
  y: number,
  cellSize: number
): { rowI: number; columnI: number } {
  const rowI = Math.floor(y / cellSize);
  const columnI = Math.floor(x / cellSize);
  return { rowI, columnI };
}
