// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// let drawing = false;
// let x0, y0;
// let startX, startY;
// let currentMode = "freehand";
// let currentColor = "#000";
// let undoStack = [];
// let redoStack = [];


// // Function definitions for drawing shapes
// function drawLine(x1, y1, x2, y2) {
//   ctx.beginPath();
//   ctx.moveTo(x1, y1);
//   ctx.lineTo(x2, y2);
//   ctx.strokeStyle = currentColor;
//   ctx.stroke();
// }

// function drawRectangle(x1, y1, x2, y2) {
//   const width = x2 - x1;
//   const height = y2 - y1;
  
//   ctx.strokeStyle = currentColor;
//   ctx.strokeRect(x1, y1, width, height);
// }

// function drawEllipse(x1, y1, x2, y2) {
//   const radiusX = Math.abs((x2 - x1) / 2);
//   const radiusY = Math.abs((y2 - y1) / 2);
//   const centerX = x1 + radiusX;
//   const centerY = y1 + radiusY;

//   ctx.strokeStyle = currentColor;
//   ctx.beginPath();
//   ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
//   ctx.stroke();
// }

// canvas.addEventListener("mousedown", (e) => {
//   drawing = true;
//   const canvasRect = canvas.getBoundingClientRect();
//   x0 = e.clientX - canvasRect.left;
//   y0 = e.clientY - canvasRect.top;

//   if (currentMode === "line" || currentMode === "rectangle" || currentMode === "ellipse") {
//     startX = x0;
//     startY = y0;
//   }
// });

// canvas.addEventListener("mousemove", (e) => {
//   if (!drawing) return;
//   const canvasRect = canvas.getBoundingClientRect();
//   const x = e.clientX - canvasRect.left;
//   const y = e.clientY - canvasRect.top;

//   if (currentMode === "freehand") {
//     ctx.beginPath();
//     ctx.moveTo(x0, y0);
//     ctx.lineTo(x, y);
//     ctx.strokeStyle = currentColor;
//     ctx.stroke();

//     x0 = x;
//     y0 = y;
//   }
// });

// canvas.addEventListener("mouseup", () => {
//   if (drawing) {
//     drawing = false;
//     if (currentMode !== "freehand") {
//       if (currentMode === "line") {
//         drawLine(startX, startY, x0, y0);
//       } else if (currentMode === "rectangle") {
//         drawRectangle(startX, startY, x0, y0);
//       } else if (currentMode === "ellipse") {
//         drawEllipse(startX, startY, x0, y0);
//       }
//       pushToUndoStack();
//     }
//   }
// });

// canvas.addEventListener("mouseout", () => {
//   if (drawing) {
//     drawing = false;
//     if (currentMode !== "freehand") {
//       if (currentMode === "line") {
//         drawLine(startX, startY, x0, y0);
//       } else if (currentMode === "rectangle") {
//         drawRectangle(startX, startY, x0, y0);
//       } else if (currentMode === "ellipse") {
//         drawEllipse(startX, startY, x0, y0);
//       }
//       pushToUndoStack();
//     }
//   }
// });

// canvas.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// });

// function clearCanvas() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   undoStack = [];
//   redoStack = [];
// }

// function changeMode(mode) {
//   currentMode = mode;
// }

// function changeColor(color) {
//   currentColor = color;
//   ctx.strokeStyle = currentColor;
// }

// function pushToUndoStack() {
//   ctx.canvas.willReadFrequently = true; // Set willReadFrequently attribute
//   undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
//   redoStack = [];
//   ctx.canvas.willReadFrequently = false; // Reset willReadFrequently attribute
// }

// function undo() {
//   if (undoStack.length > 0) {
//     redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
//     const imageData = undoStack.pop();
//     ctx.putImageData(imageData, 0, 0);
//   }
// }

// function redo() {
//   if (redoStack.length > 0) {
//     undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
//     const imageData = redoStack.pop();
//     ctx.putImageData(imageData, 0, 0);
//   }
// }

// // Event listeners for UI buttons
// document.getElementById("clearButton").addEventListener("click", clearCanvas);
// document.getElementById("freehandMode").addEventListener("click", () => changeMode("freehand"));
// document.getElementById("lineMode").addEventListener("click", () => changeMode("line"));
// document.getElementById("rectangleMode").addEventListener("click", () => changeMode("rectangle"));
// document.getElementById("ellipseMode").addEventListener("click", () => changeMode("ellipse"));
// document.getElementById("colorPicker").addEventListener("input", (e) => changeColor(e.target.value));
// document.getElementById("undoButton").addEventListener("click", undo);
// document.getElementById("redoButton").addEventListener("click", redo);

// canvas.width = 800;
// canvas.height = 600;
// changeColor("#000"); // Default color




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

  if (currentMode === "line" || currentMode === "rectangle" || currentMode === "ellipse") {
    startX = x0;
    startY = y0;
  }
  console.log("draw start");  

});

// canvas.addEventListener("mousemove", (e) => {
//   if (!drawing) return;
//   const canvasRect = canvas.getBoundingClientRect();
//   const x = e.clientX - canvasRect.left;
//   const y = e.clientY - canvasRect.top;

//   if (currentMode === "freehand") {
//     drawFreehand(x, y);
//     console.log("drawing...");
// } else if (currentMode === "line") {
//   console.log(startX, startY, x, y);
//   drawLine(startX, startY, x, y);
// } else if (currentMode === "rectangle") {
//   drawRectangle(startX, startY, x, y);
// } else if (currentMode === "ellipse") {
//   drawEllipse(startX, startY, x, y);
// }
// });



canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const canvasRect = canvas.getBoundingClientRect();
  const x = e.clientX - canvasRect.left;
  const y = e.clientY - canvasRect.top;

  if (currentMode === "freehand") {
    drawFreehand(x, y);
  } else if (currentMode === "line" || currentMode === "rectangle" || currentMode === "ellipse") {
    // Clear the canvas and redraw previous shapes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawUndoStack();

    if (currentMode === "line") {
      drawLine(startX, startY, x, y);
    } else if (currentMode === "rectangle") {
      drawRectangle(startX, startY, x, y);
    } else if (currentMode === "ellipse") {
      drawEllipse(startX, startY, x, y);
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
      }
      pushToUndoStack();

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
  ctx.strokeRect(x1, y1, width, height);
}

function drawEllipse(x1, y1, x2, y2) {
  const radiusX = Math.abs((x2 - x1) / 2);
  const radiusY = Math.abs((y2 - y1) / 2);
  const centerX = x1 + radiusX;
  const centerY = y1 + radiusY;

  ctx.strokeStyle = currentColor;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.stroke();
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
document.getElementById("colorPicker").addEventListener("input", (e) => changeColor(e.target.value));
document.getElementById("undoButton").addEventListener("click", undo);
document.getElementById("redoButton").addEventListener("click", redo);

canvas.width = 800;
canvas.height = 600;
changeColor("#000"); // Default color
