export interface DataTile {
  x: number;
  y: number;
  size: number;
  toHomePheromoneConcentration: number;
  toFoodPheromoneConcentration: number;
  foodConcentration: number;
}

export function generateDataTileMap(
  cellSize: number,
  canvasWidth: number,
  canvasHeight: number
): DataTile[][] {
  const rows = Math.floor(canvasHeight / cellSize);
  const columns = Math.floor(canvasWidth / cellSize);
  const dataTileMap: DataTile[][] = [];
  for (let i = 0; i < rows; i++) {
    dataTileMap.push([]);
    for (let j = 0; j < columns; j++) {
      const dataTile: DataTile = {
        x: j * cellSize,
        y: i * cellSize,
        size: cellSize,
        toFoodPheromoneConcentration: 0,
        toHomePheromoneConcentration: 0,
        foodConcentration: 0
      };
      dataTileMap[i].push(dataTile);
    }
  }
  return dataTileMap;
}
