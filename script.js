const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

let drawing = false;
let x0, y0;
let startX, startY;
let currentMode = "freehand";
let currentColor = "#000";
let undoStack = [];
let redoStack = [];

function redrawUndoStack() {
  for (const imageData of undoStack) {
    ctx.putImageData(imageData, 0, 0);
  }
}

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  const canvasRect = canvas.getBoundingClientRect();
  x0 = e.clientX - canvasRect.left;
  y0 = e.clientY - canvasRect.top;

  if (currentMode === "line" || currentMode === "rectangle" || currentMode === "ellipse" || currentMode === "circle" || currentMode === "square") {
    startX = x0;
    startY = y0;
  }
  console.log("draw start");  

});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const canvasRect = canvas.getBoundingClientRect();
  const x = Math.round(e.clientX - canvasRect.left); // Round coordinates
  const y = Math.round(e.clientY - canvasRect.top);

  if (currentMode === "freehand") {
    drawFreehand(x, y);
  } else if (currentMode === "line" || currentMode === "rectangle" || currentMode === "ellipse" || currentMode === "circle" || currentMode === "square") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawUndoStack();

    if (currentMode === "line") {
      drawLine(startX, startY, x, y);
    } else if (currentMode === "rectangle") {
      drawRectangle(startX, startY, x, y);
    } else if (currentMode === "ellipse") {
      drawEllipse(startX, startY, x, y);
    } else if (currentMode === "circle") {
      drawCircle(startX, startY, x, y);
    } else if (currentMode === "square") {
      drawSquare(startX, startY, x, y);
    }
  }
});



canvas.addEventListener("mouseup", (e) => {
  if (drawing) {
    drawing = false;
    console.log("draw end"); 
    const canvasRect = canvas.getBoundingClientRect();
    const x0 = e.clientX - canvasRect.left;
    const y0 = e.clientY - canvasRect.top; 
    if (currentMode !== "freehand") {
      if (currentMode === "line") {
        console.log(startX, startY, x0, y0);
        drawLine(startX, startY, x0, y0);
      } else if (currentMode === "rectangle") {
        drawRectangle(startX, startY, x0, y0);
      } else if (currentMode === "ellipse") {
        drawEllipse(startX, startY, x0, y0);
      }else if (currentMode === "circle") {
        drawCircle(startX, startY, x0, y0); // Add this line
      } else if (currentMode === "square") {
        drawSquare(startX, startY, x0, y0); // Add this line
      }      
    }
    pushToUndoStack();
    redrawUndoStack(); // Call the defined function

  }
});

canvas.addEventListener("mouseout", () => {
  if (drawing) {
    drawing = false;
    if (currentMode !== "freehand") {
      if (currentMode === "line") {
        drawLine(startX, startY, x0, y0);
      } else if (currentMode === "rectangle") {
        drawRectangle(startX, startY, x0, y0);
      } else if (currentMode === "ellipse") {
        drawEllipse(startX, startY, x0, y0);
      } else if (currentMode === "circle") {
        drawCircle(startX, startY, x0, y0); // Add this line
      } else if (currentMode === "square") {
        drawSquare(startX, startY, x0, y0); // Add this line
      }
      pushToUndoStack();
      redrawUndoStack(); // Call the defined function


    }
  }
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  undoStack = [];
  redoStack = [];
}

function changeMode(mode) {
  currentMode = mode;
}

function changeColor(color) {
  currentColor = color;
  ctx.strokeStyle = currentColor;

  // Update the background color of the colorPicker button
  const colorPickerButton = document.getElementById("colorPicker");
  colorPickerButton.style.backgroundColor = currentColor;
}

function pushToUndoStack() {
  ctx.willReadFrequently = true;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  console.log(undoStack)
  redoStack = [];
  ctx.willReadFrequently = false; // Reset the attribute after readback
}


function undo() {
  if (undoStack.length > 0) {
    redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    const imageData = undoStack.pop();
    ctx.putImageData(imageData, 0, 0);
  }
}

function redo() {
  if (redoStack.length > 0) {
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    const imageData = redoStack.pop();
    ctx.putImageData(imageData, 0, 0);
  }
}

function drawFreehand(x, y) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x, y);
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  x0 = x;
  y0 = y;
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = currentColor;
  ctx.stroke();
}

function drawRectangle(x1, y1, x2, y2) {
  const width = x2 - x1;
  const height = y2 - y1;

  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor; // Set the fill color
  ctx.fillRect(x1, y1, width, height); // Fill the rectangle
  ctx.strokeRect(x1, y1, width, height);
}

function drawEllipse(x1, y1, x2, y2) {
  const radiusX = Math.abs((x2 - x1) / 2);
  const radiusY = Math.abs((y2 - y1) / 2);
  const centerX = x1 + radiusX;
  const centerY = y1 + radiusY;

  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function drawCircle(x1, y1, x2, y2) {
  const radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
  ctx.beginPath();
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function drawSquare(x1, y1, x2, y2) {
  const sideLength = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1));
  const x = x1 < x2 ? x1 : x1 - sideLength;
  const y = y1 < y2 ? y1 : y1 - sideLength;
  
  ctx.strokeStyle = currentColor;
  ctx.fillStyle = currentColor;
  ctx.fillRect(x, y, sideLength, sideLength);
  ctx.strokeRect(x, y, sideLength, sideLength);
}


document.getElementById("colorPicker").addEventListener("input", (e) => {
  const selectedColor = e.target.value;
  document.getElementById("selectedColor").style.backgroundColor = selectedColor;
});


// Event listeners for UI buttons
document.getElementById("clearButton").addEventListener("click", clearCanvas);
document.getElementById("freehandMode").addEventListener("click", () => changeMode("freehand"));
document.getElementById("lineMode").addEventListener("click", () => changeMode("line"));
document.getElementById("rectangleMode").addEventListener("click", () => changeMode("rectangle"));
document.getElementById("ellipseMode").addEventListener("click", () => changeMode("ellipse"));
document.getElementById("circleMode").addEventListener("click", () => changeMode("circle")); 
document.getElementById("squareMode").addEventListener("click", () => changeMode("square")); 
document.getElementById("colorPicker").addEventListener("input", (e) => changeColor(e.target.value));
document.getElementById("undoButton").addEventListener("click", undo);
document.getElementById("redoButton").addEventListener("click", redo);

canvas.width = 1000;
canvas.height = 600;
changeColor("#000"); // Default color

const customColorButton = document.getElementById("customColorButton");
const colorPicker = document.getElementById("colorPicker");

customColorButton.addEventListener("click", () => {
  colorPicker.click(); // Open the color picker when the custom button is clicked
});

colorPicker.addEventListener("input", (e) => {
  const selectedColor = e.target.value;
  customColorButton.style.backgroundColor = selectedColor;
});


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

document.getElementById("copyButton").addEventListener("click", () => {
  if (selection) {
    copy(selection, shapes);
  }
});

document.getElementById("pasteButton").addEventListener("click", () => {
  if (clipboard) {
    const newShapes = paste(20, 20); // Adjust the pasted shapes' position
    shapes.push(...newShapes);
    redrawCanvas(); // Call your redraw function here
  }
});
