var highestScore = localStorage.getItem(SAVE_SCORE);
var SAVE_SCORE = "highestScore"
var scoreString = localStorage.getItem(SAVE_SCORE)
if (scoreString == null) highestScore = 0;
else {highestScore = parseInt(scoreString)}


class Game {
  constructor() {
      this.pointsCounter = 0,
      this.letters = ["Q", "W", "E", "A", "S", "D"];
      this.tiles = null;
      this.blackTiles = [];
      this.whiteTiles = [];
      this.mouse = false;
      this.countdown = 20;
      this.failSound = new Audio("/Daimmer/sounds/failed.wav")
      this.soundArray = new Array ("/Daimmer/sounds/1.wav", "/Daimmer/sounds/2.wav", "/Daimmer/sounds/3.wav", "/Daimmer/sounds/3.wav", "/Daimmer/sounds/4.wav", "/Daimmer/sounds/5.wav")
      this.correctSound = new Audio();
      this.levelUp = 0
      
    }
    
    start() {
      // GET RANDOM INDEX TO SHUFFLE CARDS TO BLACK
      console.log("start() starts");
      console.log("Before this.tiles gets the Array.from :", this.tiles);
      this.tiles = Array.from(document.getElementsByClassName("tile"));
      console.log("After this.tiles gets the Array.from :", this.tiles);

    let randomNumbers = [];
    let randNumb = null;
    while (this.tiles !== null && randomNumbers.length < 5) {
      randNumb = Math.floor(Math.random() * this.tiles.length);
     if(!randomNumbers.includes(randNumb))randomNumbers.push(randNumb);
    }
    

    let slicedNumbs = randomNumbers.slice(0,4).sort((a,b) => b - a);
    //ADD SLICED TO BLACK ARRAY
    slicedNumbs.forEach(oneNumber =>{
      this.blackTiles.push(this.tiles[oneNumber]);
    })

    // REMOVE BG-WHITE AND ADD LETTERS
    this.blackTiles.forEach(blackTile => {
    blackTile.classList.toggle("bg-white");
    blackTile.querySelector("p").innerText = this.letters[Math.floor(Math.random()*this.letters.length)];
    })

    // ADD WHITE CARDS TO WHITE ARRAY
    this.tiles.forEach(tile => {
      if (tile.classList.contains("bg-white")){
        this.whiteTiles.push(tile)
      }
    })


    // START TRACKING MOUSE
    document.querySelector(".play-button").addEventListener("click", () => {
      this.startCountdown();
    })

  }

  startCountdown(){
    console.log("startCountdown() starts");
    console.log(this.tiles);

    document.querySelector(".play-button").remove
    let countdownText = document.querySelector(".timer");
    setInterval(() => {
      this.countdown--;
      countdownText.innerText = `TIMER: ${this.countdown}`;
      if (this.countdown === 0){this.failSound.play(); buildGameOver();}
    }, 1000);
    
    document.querySelector(".grid-container").removeChild(document.querySelector(".play-button"));
    this.addKeyboardOn();
    this.addMouseOn();

  }

  addMouseOn() {
    //TRACK WHEN MOUSE IS ON
    this.tiles.forEach((tile) => {
      tile.querySelector("p").addEventListener("mouseover", (event) => {
        this.mouse = true;
        tile.setAttribute("data-mouseover", true);
      })});
      //TRACK WHEN MOUSE IS OFF
      this.tiles.forEach((tile) => {
        tile.querySelector("p").addEventListener("mouseleave", (event) => {
          this.mouse = false;
          tile.removeAttribute("data-mouseover");
        })})
  }
          
  addKeyboardOn(){
    console.log("addKeyBoardOn() starts and this.tiles equals:", this.tiles);
    window.addEventListener("keypress", this.keyboardFunction)
  }

  keyboardFunction (event){
    console.log("hello from inside keyboardFunction()");    
      let checker = false;
  
      console.log(this.tiles);
  
      this.tiles.forEach((tile) => {
        if (this.mouse === true && String.fromCharCode(event.keyCode).toUpperCase() ===
        tile.querySelector("p").innerText &&
        tile.getAttribute("data-mouseover") == "true"
        ) {
          this.correctSound.src = this.soundArray[Math.floor(Math.random()*this.soundArray.length)];
          this.correctSound.play();
          tile.classList.toggle("bg-white");
          tile.querySelector("p").innerText = "";
          this.whiteTiles.push(tile);
          let blackIndex = this.blackTiles.indexOf(tile);
          this.blackTiles.slice(blackIndex, 1);
          this.newBlackTile();
          checker = true
        }
          }
          )
  
      if (checker){
        this.pointsCounter++;
        this.extraTime();
        document.querySelector(".score").innerText = `SCORE: ${this.pointsCounter}`;
        this.updateHighest();}
      else {
              this.failSound.play();
        this.gameOver()};
    }
          
  extraTime(){
    this.levelUp++
    if (this.levelUp === 30) {this.countdown += 30; this.levelUp = 0}
  }
          
  updateHighest(){
    let record = document.querySelector(".highest");
    if (this.pointsCounter > highestScore){
      highestScore = this.pointsCounter;
      localStorage.setItem(SAVE_SCORE, highestScore)
      record.innerText = `RECORD: ${highestScore}`
      console.log(object);}
  }
            
  newBlackTile(){
    let randomWhiteTileIndex = Math.floor(Math.random()*this.whiteTiles.length);
    let randomWhiteTile = this.whiteTiles[randomWhiteTileIndex];
    randomWhiteTile.classList.toggle("bg-white");
    randomWhiteTile.querySelector("p").innerText = this.letters[Math.floor(Math.random()*this.letters.length)];
    this.blackTiles.push(randomWhiteTile);
    this.whiteTiles.splice(randomWhiteTileIndex, 1);
  }

  gameOver(){
      buildGameOver()
  }
}