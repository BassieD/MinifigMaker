console.log("dit script werkt!!!!!");

// audio
const selectAudio = new Audio("audio/legoclick.mp3");
const muteAudio = new Audio("audio/uiclick.mp3");
const buildAudio = new Audio("audio/legobuilding.mp3");

let isMuted = false;

// checkt of geluid uitgezet is bij het afspelen van audio
function playSound(audio) {
    if (!isMuted) {
        audio.currentTime = 0;
        audio.play();
    }
}

// mute knop
const soundButton = document.getElementById("sound-button");
const soundIcon = soundButton.querySelector("img");

soundButton.addEventListener("click", function () {

    // speelt klik geluid af voor het muten
    muteAudio.currentTime = 0;
    muteAudio.play();

    isMuted = !isMuted;

    // verwwissel afbeelding gebaseerd op de staat
    if (isMuted) {
        soundIcon.src = "img/volume-mute.png";
    } else {
        soundIcon.src = "img/volume.png";
    }
});

// Opslag van geselecteerde pieces
let selectedHeadpiece = "";
let selectedHeadwearpiece = "";
let selectedTorsopiece = "";
let selectedPantspiece = "";

// Start scherm
document.getElementById("start-button").addEventListener("click", function () {
    playSound(selectAudio);

    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("head-choice").classList.add("active");
});

// Selectie hoofden
const headButtons = document.querySelectorAll("#head-choice button");
headButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        playSound(selectAudio);

        selectedHeadpiece = this.querySelector("img").src;

        document.getElementById("head-choice").classList.remove("active");
        document.getElementById("headwear-choice").classList.add("active");
    });
});

// selectie haar
const headwearButtons = document.querySelectorAll("#headwear-choice button");
headwearButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        playSound(selectAudio);

        selectedHeadwearpiece = this.querySelector("img").src;

        document.getElementById("headwear-choice").classList.remove("active");
        document.getElementById("torso-choice").classList.add("active");
    });
});

// selectie middel
const torsoButtons = document.querySelectorAll("#torso-choice button");
torsoButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        playSound(selectAudio);

        selectedTorsopiece = this.querySelector("img").src;

        document.getElementById("torso-choice").classList.remove("active");
        document.getElementById("pants-choice").classList.add("active");
    });
});

// Broek selectie en laatste scherm
const pantsButtons = document.querySelectorAll("#pants-choice button");
pantsButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        playSound(selectAudio);

        selectedPantspiece = this.querySelector("img").src;

        document.getElementById("pants-choice").classList.remove("active");
        document.getElementById("final-screen").classList.add("active");

        // gebruikt geselecteerde stukken voor het volledige karakter
        document.getElementById("final-headwearpiece").src = selectedHeadwearpiece;
        document.getElementById("final-headpiece").src = selectedHeadpiece;
        document.getElementById("final-torsopiece").src = selectedTorsopiece;
        document.getElementById("final-pantspiece").src = selectedPantspiece;

        playSound(buildAudio);
    });
});

// Randomizer knop
const headButtonsArray = Array.from(document.querySelectorAll("#head-choice button"));
const hairButtonsArray = Array.from(document.querySelectorAll("#headwear-choice button"));
const torsoButtonsArray = Array.from(document.querySelectorAll("#torso-choice button"));
const pantsButtonsArray = Array.from(document.querySelectorAll("#pants-choice button"));

function getRandomPiece(buttonArray) {
    const randomIndex = Math.floor(Math.random() * buttonArray.length);
    return buttonArray[randomIndex].querySelector("img").src;
}

document.getElementById("randomizer-button").addEventListener("click", function() {

    playSound(selectAudio);

    // Pak willekeurige pieces
    selectedHeadpiece = getRandomPiece(headButtonsArray);
    selectedHeadwearpiece = getRandomPiece(hairButtonsArray);
    selectedTorsopiece = getRandomPiece(torsoButtonsArray);
    selectedPantspiece = getRandomPiece(pantsButtonsArray);

    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("final-screen").classList.add("active");

    document.getElementById("final-headwearpiece").src = selectedHeadwearpiece;
    document.getElementById("final-headpiece").src = selectedHeadpiece;
    document.getElementById("final-torsopiece").src = selectedTorsopiece;
    document.getElementById("final-pantspiece").src = selectedPantspiece;

    playSound(buildAudio);
});

// terug naar home-scherm knop
document.getElementById("home-button").addEventListener("click", function() {
    playSound(selectAudio);

    document.getElementById("start-screen").classList.add("active");
    document.getElementById("final-screen").classList.remove("active");
});