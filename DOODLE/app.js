// I only want the contents of this file to load only once all the HTML has been written. An alternative
// is to put your JS file linking on the buttom of the HTML. This way looks bettaa!
document.addEventListener ("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const doodler = document.createElement("div"); // creating a div named doodler (we haven't placed it anywhere yet)
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let score = 0;

    function createDoodler () { // creating a doodler and placing it inside the grid
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + "px";
        doodler.style.bottom = doodlerBottomSpace + "px";
    }

    class Platform {
        constructor (newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement("div");
            const visual = this.visual; // this.visual.classList.add("platform") wont work.
            visual.classList.add("platform");
            visual.style.left = this.left + "px";
            visual.style.bottom = this.bottom + "px";
            grid.appendChild(visual);
        }
    }

    function createPlatforms () {
        for (let i = 0; i < platformCount; i ++) {
            let platformGap =  600 / platformCount;
            let newPlatBottom = 100 + i * platformGap;
            let newPlatform = new Platform (newPlatBottom);
            platforms.push (newPlatform);
            console.log (platforms);
        }
    }

    function movePlatforms () {
        if (doodlerBottomSpace > 200) {
            platforms.forEach (platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + "px";
                if (platform.bottom < 0) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove("platform");
                    platforms.shift();
                    score ++;
                    console.log(platforms);
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                }
            })
        }
    }

    function jump () {
        clearInterval (downTimerId);
        isJumping = true;
        let jumpingSpeed = 30
        // to be able to stop this clear interval once we dont want it to keep moving.
        upTimerId = setInterval (function () {
            doodlerBottomSpace += jumpingSpeed;
            if (jumpingSpeed >= 5) jumpingSpeed /= 1.15;
            doodler.style.bottom = doodlerBottomSpace + "px";
            if (doodlerBottomSpace - startPoint > 200) {
                fall ();
            }
        }, 30);
        
    }

    function fall () {
        clearInterval (upTimerId);
        isJumping = false;
        let fallingSpeed = 2
        downTimerId = setInterval (function () {
            doodlerBottomSpace -= fallingSpeed;
            if (fallingSpeed <= 6) fallingSpeed *= 1.02;
            doodler.style.bottom = doodlerBottomSpace + "px";
            if (doodlerBottomSpace <= 0) {
                gameOver ();
            }
            platforms.forEach ((platform) => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    (doodlerLeftSpace + 60 >= platform.left) &&
                    (doodlerLeftSpace <= platform.left + 85) &&
                    !isJumping
                ){
                    console.log ("landed");
                    startPoint = doodlerBottomSpace;
                    jump ();
                }
            })
        }, 15)
    }

    function gameOver () {
        console.log ("game over");
        isGameOver = true;
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML = `
        <p class="score">Your Score is: <span id="score">${score}</span></p>
        <p class="restart">Please Press Any Key to Restart! </p>
        `

        clearInterval (upTimerId);
        clearInterval (downTimerId);
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
        document.addEventListener("keyup", () => {
            isGameOver = false;
            start();
        });
    }

    function control (e) {
        if (e.key === "ArrowLeft" && !isGoingLeft && !isGameOver) {
            moveLeft ();
        } else if (e.key === "ArrowRight" && !isGoingRight && !isGameOver) {
            moveRight ();
        } else if (e.key === "ArrowUp") {
            // move right
        }
    }

    function moveLeft () {
        clearInterval(rightTimerId);
        /*
        if (isGoingRight) {
            clearInterval (rightTimeId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        */
        isGoingLeft = true;
        isGoingRight = false;
        console.log ("going left");
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 5) {
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + "px";
            } else {
                clearInterval(leftTimerId);
                moveRight ();
            }
        }, 30);
    }

    function moveRight () {
        clearInterval(leftTimerId);
        /*
        if (isGoingLeft) {
            clearInterval (leftTimeId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        */
        isGoingRight = true;
        isGoingLeft = false;
        console.log ("going right");
        rightTimerId = setInterval (function () {
            if (doodlerLeftSpace <= 340){
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + "px";
            } else {
                clearInterval(rightTimerId);
                moveLeft ();
            }
        }, 30);
    }

    function isGoingStraight () {
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function start () {
        if (!isGameOver) {
            grid.innerHTML = "";
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener("keyup", control);
        }
    }
    // attach to button
    start();
})