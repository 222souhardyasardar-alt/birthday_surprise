/* =========================================================
   BIRTHDAY WEBSITE
   ========================================================= */


/* ================= PERSONAL SETTINGS ================= */

const CONFIG = {

    name: "Bestie",

    age: "17 YEARS,",

    letter: `
You deserve a year filled with beautiful surprises,
genuine smiles and moments that make you stop
and think, "I want to remember this."

Thank you for being someone who can make
ordinary moments feel a little more special.

Thank you for every memory we've been through together,
from our childhood to our almost end year of school.

I hope you keep chasing the things that make you
happy, laughing at the ridiculous things,
and believing in yourself even on the days
when things don't go perfectly.

There are so many memories still waiting
to be made. And so much to do with our lives,
while still staying in touch just like we are now,
just like Besties.✨

So here's to another amazing chapter of you. ♡
`

};


/* ================= ELEMENTS ================= */

const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


/* ================= PERSONAL TEXT ================= */

document.getElementById("introName").textContent = CONFIG.name;
document.getElementById("finalName").textContent = CONFIG.name;
document.getElementById("ageDisplay").textContent = CONFIG.age;


/* ================= SCREEN SYSTEM ================= */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
    }

}


/* ================= MUSIC ================= */

function startMusic() {

    music.play()
        .then(() => {

            musicPlaying = true;
            musicBtn.textContent = "♫";

        })
        .catch(() => {

            musicPlaying = false;

        });

}


musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();
        musicPlaying = false;
        musicBtn.textContent = "🔇";

    } else {

        music.play();
        musicPlaying = true;
        musicBtn.textContent = "♫";

    }

});


/* ================= START ================= */

document.getElementById("beginBtn").addEventListener("click", () => {

    startMusic();

    showScreen("welcome");

});


/* ================= NEXT BUTTONS ================= */

document.querySelectorAll("[data-next]").forEach(button => {

    button.addEventListener("click", () => {

        const next = button.dataset.next;

        showScreen(next);

        if (next === "letter") {
            startLetter();
        }

        if (next === "celebration") {
            startFireworks();
        }

    });

});


/* =========================================================
   BALLOONS
   ========================================================= */

const balloons = document.querySelectorAll(".balloon");

let poppedBalloons = 0;

balloons.forEach(balloon => {

    balloon.addEventListener("click", () => {

        if (balloon.classList.contains("popped")) {
            return;
        }

        balloon.classList.add("popped");

        poppedBalloons++;

        document.getElementById("balloonCounter").textContent =
            `${poppedBalloons} / 8 popped`;


        /* Show balloon message */

        showPopup(balloon.dataset.message);


        if (poppedBalloons === balloons.length) {

            document
                .getElementById("balloonNext")
                .classList.remove("hidden");

        }

    });

});


document.getElementById("balloonNext").addEventListener("click", () => {

    showScreen("photos");

});


/* =========================================================
   HIDDEN POLAROID
   ========================================================= */

const hiddenPhotoBtn =
    document.getElementById("hiddenPhotoBtn");

const hiddenPolaroid =
    document.getElementById("hiddenPolaroid");


hiddenPhotoBtn.addEventListener("click", () => {

    hiddenPolaroid.classList.add("show");

    hiddenPhotoBtn.textContent = "You found it ✨";

});


/* =========================================================
   GIFT
   ========================================================= */

const giftBox =
    document.getElementById("giftBox");

const coupon =
    document.getElementById("birthdayCoupon");

const envelope =
    document.getElementById("envelopeBtn");

const giftNext =
    document.getElementById("giftNext");

let giftOpened = false;


giftBox.addEventListener("click", () => {

    if (giftOpened) {
        return;
    }

    giftOpened = true;

    giftBox.classList.add("open");

    setTimeout(() => {

        coupon.classList.add("show");
        envelope.classList.add("show");
        giftNext.classList.remove("hidden");

    }, 650);

});


/* =========================================================
   ENVELOPE
   ========================================================= */

envelope.addEventListener("click", () => {

    showPopup(`
        <p style="font-family:Caveat;font-size:26px;">
            Psst... 🤫
        </p>

        <br>

        <p>
            You're officially allowed to have
            an unnecessarily good birthday today. ✨
        </p>

        <br>

        <p style="opacity:.6;">
            No refunds. No exchanges.
        </p>
    `);

});


giftNext.addEventListener("click", () => {

    showScreen("cake");

});


/* =========================================================
   CAKE / CANDLES
   ========================================================= */

const flames =
    document.querySelectorAll(".flame");

let candlesOff = 0;


flames.forEach(flame => {

    flame.addEventListener("click", () => {

        if (flame.style.display === "none") {
            return;
        }

        flame.style.display = "none";

        candlesOff++;

        if (candlesOff === flames.length) {

            document
                .getElementById("wishArea")
                .classList.add("show");

        }

    });

});


/* =========================================================
   SHOOTING STAR WISH
   ========================================================= */

document.getElementById("wishStar").addEventListener("click", () => {

    const star = document.getElementById("wishStar");

    star.style.animation = "none";

    setTimeout(() => {

        star.style.animation =
            "wishFinal 1.5s ease forwards";

    }, 10);


    showPopup(`
        <p style="font-family:Caveat;font-size:30px;">
            Wish locked in. ✨
        </p>

        <br>

        <p>
            Now let's make some noise.
        </p>
    `);


    setTimeout(() => {

        document
            .getElementById("cakeNext")
            .classList.remove("hidden");

    }, 1000);

});


document.getElementById("cakeNext").addEventListener("click", () => {

    showScreen("celebration");

    startFireworks();

});


/* =========================================================
   FIREWORKS
   ========================================================= */

let fireworksStarted = false;


function startFireworks() {

    if (fireworksStarted) {
        return;
    }

    fireworksStarted = true;

    const canvas =
        document.getElementById("fireworksCanvas");

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    const particles = [];


    function createFirework(x, y) {

        for (let i = 0; i < 45; i++) {

            const angle =
                Math.random() * Math.PI * 2;

            const speed =
                Math.random() * 5 + 2;

            particles.push({

                x: x,
                y: y,

                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,

                life: 100

            });

        }

    }


    function animate() {

        ctx.fillStyle = "rgba(5,3,10,.2)";
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        if (Math.random() < .04) {

            createFirework(

                Math.random() * canvas.width,

                Math.random() *
                canvas.height *
                .55

            );

        }


        particles.forEach((p, index) => {

            p.x += p.vx;
            p.y += p.vy;

            p.vy += .04;

            p.life--;

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `hsla(${Math.random() * 360},100%,75%,${p.life / 100})`;

            ctx.fill();


            if (p.life <= 0) {

                particles.splice(index, 1);

            }

        });


        requestAnimationFrame(animate);

    }


    animate();

}


/* =========================================================
   LETTER TYPEWRITER
   ========================================================= */

let letterStarted = false;


function startLetter() {

    if (letterStarted) {
        return;
    }

    letterStarted = true;

    const target =
        document.getElementById("typedLetter");

    let index = 0;

    function type() {

        if (index < CONFIG.letter.length) {

            target.textContent +=
                CONFIG.letter[index];

            index++;

            setTimeout(type, 25);

        } else {

            document
                .getElementById("letterNext")
                .classList.remove("hidden");

        }

    }

    type();

}


document.getElementById("letterNext").addEventListener("click", () => {

    showScreen("secret");

});


/* =========================================================
   SECRET STARS
   ========================================================= */

const secretStars =
    document.querySelectorAll(".secret-star");

let foundStars = 0;


secretStars.forEach(star => {

    star.addEventListener("click", () => {

        if (star.classList.contains("found")) {
            return;
        }

        star.classList.add("found");

        foundStars++;

        document.getElementById("secretCounter")
            .textContent =
            `${foundStars} / 5 found`;


        if (foundStars === 5) {

            /* CONSTELLATION */

            document
                .getElementById("constellation")
                .classList.add("show");


            setTimeout(() => {

                showPopup(`
                    <p style="font-family:Caveat;font-size:30px;">
                        You found the constellation. 🌌
                    </p>

                    <br>

                    <p>
                        Okay... you've unlocked
                        the final surprise.
                    </p>
                `);

            }, 1200);


            setTimeout(() => {

                document
                    .getElementById("secretNext")
                    .classList.remove("hidden");

            }, 2200);

        }

    });

});


/* =========================================================
   FINAL
   ========================================================= */

document.getElementById("secretNext").addEventListener("click", () => {

    showScreen("final");

});


document.getElementById("replayBtn").addEventListener("click", () => {

    location.reload();

});


/* =========================================================
   POPUP
   ========================================================= */

function showPopup(message) {

    document.getElementById("popupContent")
        .innerHTML = `<p>${message}</p>`;

    document.getElementById("popup")
        .classList.add("show");

}


document.getElementById("popupClose")
    .addEventListener("click", () => {

        document
            .getElementById("popup")
            .classList.remove("show");

    });


document.getElementById("popup")
    .addEventListener("click", event => {

        if (event.target.id === "popup") {

            document
                .getElementById("popup")
                .classList.remove("show");

        }

    });


/* =========================================================
   CLICK SPARKLES
   ========================================================= */

document.addEventListener("click", event => {

    if (
        event.target.closest("button") ||
        event.target.closest(".balloon") ||
        event.target.closest(".gift-box") ||
        event.target.closest(".flame") ||
        event.target.closest(".secret-star")
    ) {
        createSparkle(
            event.clientX,
            event.clientY
        );
    }

});


function createSparkle(x, y) {

    const sparkle =
        document.createElement("span");

    sparkle.textContent = "✦";

    sparkle.style.position = "fixed";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "3000";
    sparkle.style.color = "#ffe99a";
    sparkle.style.fontSize = "18px";

    document.body.appendChild(sparkle);


    sparkle.animate(

        [
            {
                transform: "scale(.5)",
                opacity: 1
            },

            {
                transform:
                    "translateY(-35px) scale(1.5)",
                opacity: 0
            }

        ],

        {
            duration: 700,
            easing: "ease-out"
        }

    ).onfinish = () => {

        sparkle.remove();

    };

}