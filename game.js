'use strict';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const image = new Image();
image.src = 'cat.png';
const fishImage = new Image();
fishImage.src = 'fish.png';
const waterImage = new Image();
waterImage.src = 'water.png';
const cw = 50;
const ch = 80;
const jmax = 150;
let x = 0;
let y = canvas.height - ch;
let isJumping = false;
let rects = [];
let waters = [];

let fishc = 0;
let waterc = 0;
let gameover = false;

function draw() {

    if (parseInt(x / 150) > fishc) {
        if (Math.random() <= 0.8) {
            rects.push({x: x + 700, hit: false});
        }
        fishc = x / 150;
    }
    if (parseInt(x / 400) > waterc) {
        if (Math.random() <= 0.7) {
            waters.push({x: x + 700});
        }
        waterc = x / 400;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 100, y, cw, ch);
    for(const rect of rects) {
        if (x >= rect.x - 100 && x <= rect.x + 50 && y < canvas.height - jmax + 50) {
            rect.hit = true;
        }
        if (rect.hit === false) {
            context.drawImage(fishImage, rect.x - x + 10,canvas.height - ch - 100, 100, 50);
        } else {
            context.font = "20px Osaka";
            context.fillStyle  = "rgb(0, 0, 0)";
            context.fillText('100', rect.x - x,canvas.height - ch - 100, 100)
        }
    }
    for(const water of waters) {
        context.drawImage(waterImage, water.x - x,canvas.height - 40, 20, 40);
        if (x >= water.x - 150 && x <= water.x - 80 && y >= canvas.height - ch - 10) {
            gameover = true;
        }
    }
    if (isJumping == true) {
        y -= ((y - (canvas.height - ch - jmax)) / 5);
        if (y <= canvas.height - ch - jmax + 1) {
            isJumping = false;
        }
    }
    if (isJumping == false && y < canvas.height - ch) {
        y += (((canvas.height - ch) - y) / 5);
    }
    x += (3 + parseInt(x / 1000));
    let score = rects.filter((rect) => rect.hit ==  true).length * 100;
    context.font = "20px Osaka";
    context.fillText(`score: ${score}`, 0, 50, 100);
    if (gameover) {
        return;
    }
    requestAnimationFrame(draw);
}

window.onclick = event => {
    if (y > canvas.height - ch - 5) {
        isJumping = true;
    }
};

window.onkeydown = event => {
    if (y > canvas.height - ch - 5 && event.key == ' ') {
        isJumping = true;
    }
}

requestAnimationFrame(draw);