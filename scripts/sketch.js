var minVal = -0.5;
var maxVal = 0.5;

var minSlider;
var maxSlider;

var canvasWidth = 500;
var canvasHeigth = 500;

function setup() {
    createCanvas(canvasWidth, canvasHeigth);
    pixelDensity(1);

    minSlider = createSlider(-2.5, 0, -2.5, 0, 0.01);
    maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
    var maxIteration = 100;

    loadPixels();

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, minSlider.value(), maxSlider.value());
            var b = map(y, 0, height, minSlider.value(), maxSlider.value());

            var nIteration = 0;
            var cReal = a;
            var cComplex = b;

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
