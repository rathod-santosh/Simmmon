let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score: <b>${level}</b>. Press any key to restart.`;
        document.body.style.background = "red";
        setTimeout(() => document.body.style.background = "#141e30", 150);
        reset();
    }
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
        let userColor = button.classList[1];
        userSeq.push(userColor);
        userFlash(button);
        checkAns(userSeq.length - 1);
    });
});