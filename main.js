

// #region GAME LOGIC AND DATA

// DATA
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxsize = 300
let highestpopcount = 0
let currentpopcount = 0
let gameLength = 30000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}
let currentColor = "red"
let possibleColors = ["red", "green", "blue", "purple", "pink"]


function startGame(){
  document.getElementById("game-controls").classList.remove("hidden")
  document.getElementById("main-controls").classList.add("hidden")
  document.getElementById("scoreboard").classList.add("hidden")
  startClock()

  setTimeout( stopGame , gameLength)
}

function startClock(){
  timeRemaining = gameLength
  drawClock()
  clockId = setInterval(drawClock,1000)
}
function stopClock(){
  clearInterval(clockId)
}
function drawClock(){
let countdownElem = document.getElementById('countdown')
countdownElem.innerText = (timeRemaining/ 1000).toString()
timeRemaining -= 1000
}

function inflate(){
  clickCount++
  height += inflationRate
  width += inflationRate
  checkBalloonPop()
  draw()
}

function checkBalloonPop(){
  if(height >= maxsize){
    console.log("pop the balloon")
    let balloonElement = document.getElementById("balloon")
    balloonElement.classList.remove(currentColor)
    getRandomColor()
    balloonElement.classList.add(currentColor)

    // @ts-ignore
    document.getElementById("pop-sound").play()

    currentpopcount++
    height = 0
    width = 0
}
}

function getRandomColor(){
  let i = Math.floor(Math.random() * possibleColors.length);   // 0 - 1
 currentColor = possibleColors[i]
}

function draw(){
  let clickCountElem = document.getElementById("clickCount")
  let balloonElement = document.getElementById("balloon")
  let popCountElem = document.getElementById('pop-count')
  let highpopcountElem = document.getElementById('high-pop-count')
  let playerNameElem = document.getElementById("player-name")


  clickCountElem.innerText = clickCount.toString()
  popCountElem.innerText = currentpopcount.toString()
  highpopcountElem.innerText = currentPlayer.topScore.toString()

  playerNameElem.innerText = currentPlayer.name

  balloonElement.style.height = height + "px"
  balloonElement.style.width = height + "px"
}

function stopGame(){
  console.log("the game is over")

  document.getElementById("main-controls").classList.remove("hidden")
  document.getElementById("game-controls").classList.add("hidden")
  document.getElementById("scoreboard").classList.remove("hidden")

    clickCount = 0
    height = 120
    width = 100

  if(currentpopcount > currentPlayer.topScore){
    currentPlayer.topScore = currentpopcount
    savePlayers()
  }
  currentpopcount = 0



    stopClock()
    draw()
    drawScoreboard()
  }

//#endregion


// #region Player Settings

let players = []
loadPlayers()
  function setPlayer(event) {
    event.preventDefault()
    let form = event.target

    let PlayerName = form.PlayerName.value

    currentPlayer= players.find(player => player.name == PlayerName)
  
   if(!currentPlayer){
     currentPlayer = {name: PlayerName, topScore: 0}
     players.push(currentPlayer)
     savePlayers()
   }

     form.reset()
document.getElementById("game").classList.remove("hidden")
form.classList.add("hidden")
     draw()
     drawScoreboard()


  }
function changePlayer(){
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
}
  function savePlayers(){
    window.localStorage.setItem("players", JSON.stringify(players))
  }
function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if(playersData){
    players = playersData
  }
}

function drawScoreboard(){
  let template = ""

players.sort((p1, p2) => p2.topScore - p1.topScore)

  players.forEach(player => {
    template += `
    <div class="d-flex space-between">
    <span>
      <i class = "fa fa-user"></i>
      ${player.name}
    </span>
    <span>Score: ${player.topScore}</span>
    </div>`
  })
  document.getElementById("players").innerHTML = template
}
 //#endregion

 drawScoreboard()