const meter = document.getElementById("meter");
const rect = meter.getBoundingClientRect();
const hammer = document.getElementById("hammer");
const redScore=document.getElementById("redScore");
const greenScore=document.getElementById("greenScore");
const turn1=document.getElementById("turn");
const table = document.getElementById("table");
const score = document.querySelector(".score");
const needleContainer = document.querySelector(".needle-container");
let turn="red"
const noOfEdges = 7;
const noOfLayers = 1;
const weights = [0, 0, 30, 60, 90, 60, 30, 0]; // Indexed from 1
const Gamescore={red:0,green:0}
// Position hammer aligned with meter
hammer.style.position = "relative";
hammer.style.transform = "rotate(0deg)";
hammer.style.left="0px"
hammer.style.top = `${-100}px`;
table.style.marginLeft = `${rect.left  - 50}px`;

function hit() {
    const angularVelocity = 4; // radians/sec
    const maxAngleDeg = 90;
    let angle = 0;

    const fps = 30;
    const interval = 1000 / fps;
    const angularVelocityDeg = angularVelocity * (180 / Math.PI);
    const angleStep = angularVelocityDeg / fps;

    const rotateInterval = setInterval(() => {
        if (angle >= maxAngleDeg) {
            clearInterval(rotateInterval);
            return;
        }

        angle += angleStep;
        hammer.style.transform = `rotate(-${angle}deg)`;
    }, interval);
}

function weightAssign() {
    const r = [90];
    const needle = document.getElementById('needle');
const needleContainer = document.querySelector('.needle-container');

// First find bounds of both
const needleRect = needle.getBoundingClientRect();
const containerRect = needleContainer.getBoundingClientRect();


// To find center of needle **within its parent**
const xCentre = (needleRect.left - containerRect.left) + needleRect.width / 2;
const yCentre = (needleRect.top - containerRect.top) + needleRect.height / 2;

console.log('Needle center (within parent) => X:', xCentre, 'Y:', yCentre);
    
    let k = 1;

    for (let i = 0; i < noOfLayers; i++) {
        for (let j = 0; j < noOfEdges; j++) {
            const interiorAngle = 180 / 6;
            const angle = -(Math.PI / 180) * interiorAngle * j;
            const x = Math.round(xCentre + r[i] * Math.cos(angle));
            const y = Math.round(yCentre + r[i] * Math.sin(angle));

            const node = document.createElement('p');
            node.style.position = "absolute";
            node.className = "node";
            node.id = k;
            node.innerText = `${Math.floor((100 / 90) * weights[k])}`;
            node.style.left = `${x + x * 0.05}px`; 
            node.style.top = `${y - y * 0.15}px`;  
            node.value = (k - 1) * 30;

            needleContainer.appendChild(node);
            k++;
        }
    }
}
weightAssign();

let angle = 180;
let rotatingForward = true;
let globalInterval;
let rotateInterval;

function needle() {
    const needle = document.getElementById("needle");
    let angularVelocity = 1;
    const maxAngleDeg = 0;
    const minAngleDeg = 180;
    const fps = 60;
    const interval = 1000 / fps;
    let angleStep = angularVelocity * (180 / Math.PI) / fps;

    needle.style.transformOrigin = "left bottom";
    let isRotating = false;

    globalInterval = setInterval(() => {
        if (isRotating) return;
        isRotating = true;

        rotateInterval = setInterval(() => {
            let fakeAngle = angle > 90 ? 180 - angle : angle;
            angularVelocity = 1 + Math.pow(fakeAngle / 90, 2);
            angleStep = angularVelocity * (180 / Math.PI) / fps;

            if (rotatingForward) {
                angle -= angleStep;
                if (angle <= maxAngleDeg) {
                    angle = maxAngleDeg;
                    rotatingForward = false;
                    clearInterval(rotateInterval);
                    isRotating = false;
                }
            } else {
                angle += angleStep;
                if (angle >= minAngleDeg) {
                    angle = minAngleDeg;
                    rotatingForward = true;
                    clearInterval(rotateInterval);
                    isRotating = false;
                }
            }

            needle.style.transform = `translateX(0px) rotate(-${angle}deg)`;
        }, interval);
    }, 800);
}

function render() {
    clearInterval(globalInterval);
    clearInterval(rotateInterval);
    hit();

    let dummyScore = 0;
    let trueAngle = angle > 90 ? 180 - angle : angle;
    const value = Math.floor((10 / 9) * trueAngle);

    const updateScoreInterval = setInterval(() => {
        if (dummyScore >= value) {
            clearInterval(updateScoreInterval);
            
            if(turn === "red") {
                Gamescore.red += value;
                redScore.innerHTML = `<h1>${Gamescore.red}</h1>`;
            }
            else{
                Gamescore.green += value;
                greenScore.innerHTML = `<h1>${Gamescore.green}</h1>`;
            }
            
            turn= turn === "red" ? "green" : "red";
            turn1.innerHTML = `${turn}'s Turn`;
            needle()
        } else {
            dummyScore += 1;
            score.innerHTML = `<h1>${dummyScore}</h1>`;
        }
    }, 30);
    
}

needle();
