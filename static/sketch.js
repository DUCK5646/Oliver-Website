let barY = []
let barYinverse = []
let gradientRed = []
let gradientGreen = []
let gradientGreen2 = []
let gradientBlue = []

function setup() {
    let canvas = createCanvas(windowWidth, 400);
    canvas.parent('sketchContainer');

    for (let i = 0; i < 80; i++) {
        barY[i] = random(0, 200)
    }
}

function draw() {
    createCanvas(windowWidth, 400);
    background(100,100,100,0);

    //lines
    for (let i = 0; i < windowWidth; i += 1.1) {
        barY[i] = random(0, 200)
        strokeCap(PROJECT)
        //RGB
        let gradientGreen = i * 1
        let gradientBlue = 75 + i * 1
        let gradientGreen2 = 50 + i * 1
        let gradientRed = 75 + i * 1
        //top

        let barX = i * 5

        strokeWeight(5)
        stroke(1, gradientGreen2, gradientBlue)
        line(barX, barY[i], barX, 200)
        //bottom
        stroke(gradientRed, gradientGreen, 1)
        barYinverse[i] = map(barY[i], 0, 200, 400, 200)
        line(barX, barYinverse[i], barX, 200)

    }
}