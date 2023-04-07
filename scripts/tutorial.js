let tutorialTile = document.querySelectorAll(".tutorial-tile");
let tutorialLetters = document.querySelector(".letter");
let firstTutorialTile = document.querySelector(".tutorial-one")
let secondTutorialTile = document.querySelector(".tutorial-two")

const letters = ["Q", "W", "E", "A", "S", "D"];
const ui = { mouse: false, key: null };

tutorialTile.forEach((tile) => {
  tile.addEventListener("mouseover", (event) => {
    console.log("Line 9 on");
    ui.mouse = true;
    tile.querySelector("p").setAttribute("data-mouseover", true);
});
});

tutorialTile.forEach((tile) => {
    tile.addEventListener("mouseleave", (event) => {
    ui.mouse = false;
    tile.querySelector("p").removeAttribute("data-mouseover");
  });
});


const startTutorial = () => {
    firstTutorialTile.querySelector("p").innerText = letters[Math.floor(Math.random()*letters.length)];
    firstTutorialTile.classList.toggle("bg-white");
    secondTutorialTile.querySelector("p").innerText = "";
}

startTutorial();



tutorialTile.forEach((tile) => {
  document.addEventListener("keypress", (event) => {
        if (ui.mouse === true && String.fromCharCode(event.keyCode).toUpperCase() ===
            tile.querySelector("p").innerText &&
            tile.querySelector("p").getAttribute("data-mouseover") == "true"
            ) {
                tutorialTile.forEach(word =>{ word.classList.toggle("bg-white");
                word.querySelector("p").innerText = letters[Math.floor(Math.random()*letters.length)]})
                tile.querySelector("p").innerText = "";
            }}
    );
});
    








