// General function that will update the HTML content dynamically
let buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
  };
  

  var playerName = ""
  // First Screen => Splash Screen
  const buildSplashScreen = () => {
    buildDom(`
        <div class="introScreen">
            <h1>DAIMMER</h1>
            <div class="input-name">
                <input class="inputBox" type="text" placeholder="what's your name?" required>
                <!-- <button class="buttonPlay">PLAY</button> -->
            </div>
            <p class="pressEnterText">press Enter</p>
        </div> 
          `);
    
    const pressEnterKey = document.querySelector(".inputBox");
    pressEnterKey.addEventListener("keypress", function(event) {

      if (event.keyCode === 13) {
            myAudio.play();
            playerName = pressEnterKey.value
            event.preventDefault();
            buildTutorialScreen();
        }});
  };
  


  // TUTORIAL SCREEN 1
  let buildTutorialScreen = () => {
    buildDom(`
            <div id="tutorialScreen">
                <h3 class="tutorial-title" >Let's learn how to play, ${playerName}:</h3>
                <div class="tutorial-content">
                    <div class="tutorial-text">
                        <h4><u>DAIMMER</u> is a 4x4 grid game<br> where you'll have to:<h4>
                        <ol>
                            <li><u>Place the cursor</u> over the black tile (no need to click!)</li>
                            <li>Once you're over the tile <u>press the key displayed</u> on it and <u>move to the next one</u>.</li>
                            <li><u>Get as many as you can before the time finishes!</u></li>
                        </ol>
                    </div>
                    <div class="tutorial-tile tutorial-one bg-black bg-white">
                      <p class="letter"></p>
                    </div>
                    <div class="tutorial-tile tutorial-two bg-black bg-white">
                      <p class="letter"></p>
                    </div>
                </div>
              <button class="lets-play-button">Let's play!</button>
            </div>`);

    let scriptTutorial = document.createElement("script");
    scriptTutorial.src = "scripts/tutorial.js";
    document.head.appendChild(scriptTutorial);

    document.querySelector(".lets-play-button").addEventListener("click", () => {
      buildGameScreen();
    }) 
  }


  // Second Screen => Game Screen
  let buildGameScreen = () => {
    
    buildDom(`
    <div class="nav">
    <div class="score">POINTS: 0</div>
    <div class="highest">RECORD: ${highestScore}</div>
    <div class="timer">TIMER: 20</div>
    </div>
    <section class="grid-container">
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <div class="tile bg-black bg-white"><p class="tile-text"></p></div>
    <button class="play-button">PLAY</button>
    </section>
    `);

    if (typeof game == undefined){
              let game = new Game();
              game.start();}
    else {delete game;
          let game = new Game();
          game.start()} 

  };




  let buildGameOver = () => {

    buildDom(`
      <div class="lost-screen">
        <h1 class="you-lost">GAME OVER, ${playerName.toUpperCase()}</h1>
        <h2 class="final-score">Your score was: ${printedScore}</h2>
        <button class="try-again">Do you think you can do better?</button>
      </div>
          `);

    let restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
  };




  
  // When the window loads, then we will run the "runGameScreens" function
  // "load" waits for the html and JS
  window.addEventListener("load", buildSplashScreen);

  myAudio = new Audio("./sounds/takingtrips.mp3");
  myAudio.volume = 0.4; 
if (typeof myAudio.loop == 'boolean')
{
    myAudio.loop = true;
}
else
{
    myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

  
