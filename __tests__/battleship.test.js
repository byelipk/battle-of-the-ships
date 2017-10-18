var { 
  buildGrid, 
  placeShipHorizontally,
  placeShipVertically,
  fire,
  hasShipsRemaining
} = require("../src/functions");

test("buildGrid works", () => {
  const grid = buildGrid();

  const expected = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ];

  expect(grid).toEqual(expected);
});

test("placeShipHorizontally works", () => {
  const grid = buildGrid();

  const expected = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ '#', '#', '#', '#', '#', 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ];

  const result = placeShipHorizontally(grid, {row: 3, col: 0, size: 5})

  expect(result).toEqual(expected);
});

test("placeShipVertically works", () => {
  const grid = buildGrid();

  const expected = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, '#', 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, '#', 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, '#', 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
  ];

  const result = placeShipVertically(grid, {row: 2, col: 5, size: 3})

  expect(result).toEqual(expected);
});

test('ships cannot overlap', () => {
  const grid = buildGrid();

  placeShipVertically(grid, {row: 0, col: 0, size: 5});

  expect(() => placeShipHorizontally(grid, {row: 0, col: 0, size: 2})).toThrow();
  expect(() => placeShipVertically(grid, {row: 4, col: 0, size: 2})).toThrow();
});

test('firing on a ship works', () => {
  const grid = buildGrid();
  
  placeShipVertically(grid, {row: 0, col: 0, size: 5});

  expect( fire(grid, { row: 0, col: 0 }).result ).toEqual( "HIT" );
  expect( fire(grid, { row: 0, col: 0 }).result ).toEqual( "ALREADY HIT" );
  expect( fire(grid, { row: 0, col: 1 }).result ).toEqual( "MISS" );
});

test('hasShipsRemaining works', () => {
  var grid = buildGrid();
  
  grid = placeShipVertically(grid, {row: 0, col: 0, size: 5});

  expect(hasShipsRemaining(grid)).toBe(true);

  var { grid: g1 } = fire(grid, { row: 0, col: 0 });
  var { grid: g2 } = fire(g1, { row: 1, col: 0 });
  var { grid: g3 } = fire(g2, { row: 2, col: 0 });
  var { grid: g4 } = fire(g3, { row: 3, col: 0 });
  var { grid: g5 } = fire(g4, { row: 4, col: 0 });

  expect(hasShipsRemaining(g5)).toBe(false);
});