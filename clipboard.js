// // clipboard.js

let clipboard = null;

function cut() {
  const shapesToCut = shapesInSelection(selection, shapes);
  const remainingShapes = shapes.filter(shape => !isShapeInSelection(shape, selection));
  clipboard = shapesToCut;
  return remainingShapes;
}

function copy() {
  clipboard = shapesInSelection(selection, shapes);
}

function paste() {
  if (clipboard) {
    const copiedShapes = clipboard.map(shape => ({
      ...shape,
      x: shape.x + x,
      y: shape.y + y
    }));
    clipboard = null;
    return copiedShapes;
  }
  return [];
}

function shapesInSelection(selection, shapes) {
  return shapes.filter(shape => isShapeInSelection(shape, selection));
}

function isShapeInSelection(shape, selection) {
  return (
    shape.x >= selection.x &&
    shape.x <= selection.x + selection.width &&
    shape.y >= selection.y &&
    shape.y <= selection.y + selection.height
  );
}

// export { cut, copy, paste };


// clipboard.js

// This module exports the cut, copy, and paste functions

export function something() {
    
}