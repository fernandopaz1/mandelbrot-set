var mandelbrot = false;
var julia = true;
juliaVariable = false;

document.querySelector("button#mandelbrot").addEventListener("click", (e) => {
    mandelbrot = true;
    julia = false;
    juliaVariable = false;
    //   redraw();
});

document.querySelector("button#julia").addEventListener("click", (e) => {
    mandelbrot = false;
    julia = true;
    juliaVariable = false;
    //    redraw();
});

document
    .querySelector("button#juliaVariable")
    .addEventListener("click", (e) => {
        mandelbrot = false;
        julia = false;
        juliaVariable = true;
        //   redraw();
    });

var minVal = -0.5;
var maxVal = 0.5;

var minSlider;
var maxSlider;
var angle = 0;
var canvasWidth = 300;
var canvasHeigth = 300;

function setup() {
    createCanvas(canvasWidth, canvasHeigth);
    pixelDensity(1);
    colorMode(HSB, 1);
    //Con HSB los colores esta ne base a hue, staturation y brighness

    minSlider = createSlider(-2.5, 0, -2.5, 0, 0.01);
    maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
    var maxIteration = 50;
    angle += 0.02;
    loadPixels();

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var nIteration = 0;
            var a, b, cReal, cComplex;
            a = map(x, 0, width, minSlider.value(), maxSlider.value());
            b = map(y, 0, height, minSlider.value(), maxSlider.value());
            if (mandelbrot) {
                cReal = a;
                cComplex = b;
            } else if (julia) {
                cReal = map(mouseX, 0, width, -1, 1);
                cComplex = map(mouseY, 0, height, -1, 1);
            } else {
                cReal = Math.cos(angle * 3.213);
                cComplex = Math.sin(angle);
            }
            while (nIteration < maxIteration) {
                var real = a * a - b * b;
                var complex = 2 * a * b;

                a = real + cReal;
                b = complex + cComplex;

                if (a * a + b * b > 16) {
                    break;
                }
                nIteration++;
            }

            var bright = map(nIteration, 0, maxIteration, 0, 255);

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = bright;
            pixels[pix + 1] = bright;
            pixels[pix + 2] = bright;
            pixels[pix + 3] = 220;
        }
    }
    updatePixels();
}
