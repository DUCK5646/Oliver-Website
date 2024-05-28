let simpSynth; //first, you need a variable to store each synth you want to makea
let kickDrum, snareDrum;

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

    simpSynth = new Tone.Synth({
        oscillator: {
            type: "square" //the type of waveform the synthesizer produces. Can be square, since, triangle, or sawtooth
        },
        envelope: { //sets the various sound properties for the synth
            attack: 0.05,
            decay: 0.5,
            sustain: 1,
            release: 3
        },
        volume: -20
    }).toMaster();
    kickDrum = new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: {
            type: "square" //the type of waveform the synthesizer produces. Can be square, since, triangle, or sawtooth
        },
        envelope: { //sets the various sound properties for the synth
            attack: 0.1,
            decay: 0.4,
            sustain: 0.01,
            release: 1.4,
            attackCurve: "exponential"
        },
        volume: -20
    }).toMaster();
    snareDrum = new Tone.NoiseSynth({
        pitchDecay: 0.05,
        octaves: 10,
        oscillator: {
            type: "square" //the type of waveform the synthesizer produces. Can be square, since, triangle, or sawtooth
        },
        envelope: { //sets the various sound properties for the synth
            attack: 0.1,
            decay: 0.4,
            sustain: 0.01,
            release: 1.4,
            attackCurve: "exponential"
        },
        volume: -20
    }).toMaster();
}

function draw() {
  textAlign(CENTER);
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

function mousePressed() {
         // Define the sequence of notes
    const notes = ["D5","D4", "F4","F5", "A4", "C5", "E5", "E4#"];

    // Define the time intervals for each note
    const intervals = [0,0, 0.5, 1, 1.5, 2, 2.5,3];

    const kickPattern = [0, 3];
    const snarePattern = [.5];

    // Create a loop that will trigger the notes
    const loop = new Tone.Loop(time => {
        for (let i = 0; i < notes.length; i++) {
            simpSynth.triggerAttackRelease(notes[i], "4n", time + intervals[i]);
        }
    }, "2m").start(0);
     // Create a loop for the kick drum
    const kickLoop = new Tone.Loop(time => {
        kickPattern.forEach(interval => {
            kickDrum.triggerAttackRelease("D1", "4n", time + interval);
        });
    }, "1m").start(0); // Loop every measure

    // Create a loop for the snare drum
    const snareLoop = new Tone.Loop(time => {
        snarePattern.forEach(interval => {
            snareDrum.triggerAttackRelease("4n", time + interval);
        });
    }, "1m").start(0); // Loop every measure

    // Start the transport
    Tone.Transport.start();
}