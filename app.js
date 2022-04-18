// capture the mouse down event
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// DOM Variables
const sketch = document.querySelector(".container");
let clear = document.querySelector(".clear");
let toggleRandom = document.querySelector(".random");

// app variables
let randomColor = false;

// A function that draw's a grid
function drawGrid(pixels = 16) {
    sketch.style = `grid-template-columns: repeat(${pixels}, 1fr);
            grid-template-rows: repeat(${pixels}, 1fr);`;
    for (let i = 0; i < pixels; i++) {
        for (let j = 0; j < pixels; j++) {
            const pixel = document.createElement("div");
            sketch.appendChild(pixel);
        }
    }
}

// a function that adds Event listenrer's for each pixel in the grid
function addenventlistners(pixels) {
    pixels.forEach((pixel) => {
        pixel.addEventListener("mousedown", (e) => {
            // paint the pixel
            if (randomColor) {
                let rgb = {
                    R: Math.floor(Math.random() * 256), 
                    G: Math.floor(Math.random() * 256), 
                    B: Math.floor(Math.random() * 256)
                }
                e.target.style = `background-color: rgb(${rgb.R}, ${rgb.G}, ${rgb.B});`;
            }
            else {
                e.target.style = "background-color: black;";
            }

        });
        pixel.addEventListener("mouseover", (e) => {
            if (!mouseDown) return;
            // paint the pixel
            if (randomColor) {
                let rgb = {
                    R: Math.floor(Math.random() * 256), 
                    G: Math.floor(Math.random() * 256), 
                    B: Math.floor(Math.random() * 256)
                }
                e.target.style = `background-color: rgb(${rgb.R}, ${rgb.G}, ${rgb.B});`;
            }
            else {
                e.target.style = "background-color: black;";
            }
        });
    })
}

// drawing a 16 pixels grid on the load of the webpage
window.onload = () => {
    drawGrid(16);
    // array for each pixel in grid
    const pixels = Array.from(document.querySelectorAll(".container div"));

    addenventlistners(pixels);
    
}

// event listener for clear button click
clear.addEventListener("click", () => {
    sketch.innerHTML = "";
    let width = Number(prompt("Type the number of squares you want, between 0 and 100", "16"))
    if (width === NaN || width > 100 || width < 0) return;
    
    drawGrid(width);
    
    // array for each pixel in grid
    const pixels = Array.from(document.querySelectorAll(".container div"));
    
    addenventlistners(pixels);
});

// add event listener for toggle random button
toggleRandom.addEventListener("click", () => {
    if (randomColor) {
        randomColor = false;
        toggleRandom.textContent = "toggle Random Colors";
    }
    else {
        randomColor = true;
        toggleRandom.textContent = "toggle Black Colors";
    }
});