let buildDom = (html) => {
    const main = document.querySelector("main");
    main.innerHTML = html;
};

let playerName = "";

const buildSplashScreen = () => {
    buildDom(`
        <div class="introScreen">
            <h1>DAIMMER</h1>
            <div class="input-name">
                <input class="inputBox" type="text" placeholder="what's your name?" required>
            </div>
            <p class="pressEnterText">press Enter</p>
        </div> 
          `);

    const playerNameInput = document.querySelector(".inputBox");
    playerNameInput.addEventListener("keypress", function(event) {

      if (event.keyCode === 13) {
          backgroundMusic.play();
          playerName = playerNameInput.value
            event.preventDefault();
            buildTutorialScreen();
        }
    });
  };
  
let buildTutorialScreen = () => {
    buildDom(`
        <div id="tutorialScreen">
            <svg style="color: white" xmlns="http://www.w3.org/2000/svg" onclick="toggleAudio()" width="35" fill="currentColor" class="speaker-icon" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" fill="white">
                </path>
                <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="white">
                </path>
            </svg>
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
        </div>`
    );

    let scriptTutorial = document.createElement("script");
    scriptTutorial.src = "scripts/tutorial.js";
    document.head.appendChild(scriptTutorial);

    document.querySelector(".lets-play-button").addEventListener("click", () => {
      buildGameScreen();
    }) 
  };

let buildGameScreen = () => {
    
    buildDom(`
    <div class="nav">
        <svg style="color: white" onclick="toggleAudio()" xmlns="http://www.w3.org/2000/svg" width="35" fill="currentColor" class="speaker-icon" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" fill="white">
            </path>
            <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="white">
            </path>
        </svg>
        <div class="score">POINTS: 0</div>
        <div class="highest">RECORD: ${daimmerHighestScore}</div>
        <div class="timer">TIMER: 20</div>
    </div>
    <section class="grid-container">
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
        <div class="tile bg-black bg-white"><p class="tile-text disable-select"></p></div>
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
         <svg style="color: white" onclick="toggleAudio()" xmlns="http://www.w3.org/2000/svg" width="35" fill="currentColor" class="speaker-icon" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" fill="white">
            </path>
            <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zM8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" fill="white">
            </path>
        </svg>

        <h1 class="you-lost">GAME OVER, ${playerName.toUpperCase()}</h1>
        <h2 class="final-score">Your score was: ${printedScore}</h2>
        <button class="try-again">Do you think you can do better?</button>
      </div>
          `);

    let restartButton = document.querySelector("button");
    restartButton.addEventListener("click", buildGameScreen);
};

const toggleAudio= () => backgroundMusic.paused ? backgroundMusic.play() : backgroundMusic.pause();


window.addEventListener("load", buildSplashScreen);
backgroundMusic = new Audio("./sounds/takingtrips.mp3");
backgroundMusic.volume = 0.4;
if (typeof backgroundMusic.loop == 'boolean') backgroundMusic.loop = true;
else backgroundMusic.addEventListener('ended', () => {
    this.currentTime = 0;
    this.play();
}, false);

  
