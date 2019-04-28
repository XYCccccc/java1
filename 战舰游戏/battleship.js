var view ={
  displayarea: function(msg) {
    var area  = document.getElementById("area");
    area.innerHTML = msg
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class" , "hit")
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class" , "miss")
  }
}

var model = {
  boardSize: 7,
  numShips: 3,
  shipsSunk: 0,
  shipLength: 3,
  ships: [ { locations: ["0", "0", "0"], hits: ["", "", ""] },
           { locations: ["0", "0", "0"], hits: ["", "", ""] },
           { locations: ["0", "0", "0"], hits: ["", "", ""] } ],
  fire: function(guess) { 
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if (index >= 0) { ship.hits[index] = "hit";
      view.displayHit(guess);
      view.displayarea("HIT!");
      if (this.isSunk(ship)) {
        view.displayarea("You sank my battleship!");
        this.shipsSunk++;
      }
      return true;
    }
  }
  view.displayMiss(guess);
  view.displayarea("You missed.");
  return false;
},
isSunk: function(ship) {
  for (var i = 0; i < this.shipLength; i++)  {
    if (ship.hits[i] !== "hit") {
      return false;
    }
  }
  return true;
 },
generateShipLocations: function () {
  var locations;
  for (var i = 0; i < this.numShips; i++) {
    do {
      locations = this.generateShip();
    } while (this.collision(locations));
    this.ships[i].locations = locations;
  }
 },
generateShip: function() {
  var direction = Math.floor(Math.random() * 2);
  var row, col;
  if (direction === 1) {
    row = Math.floor(Math.random() * this.boardSize);
    col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
  } else {
    row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    col = Math.floor(Math.random() * this.boardSize);
  }
  var newShipLocations = [];
  for (var i = 0; i < this.shipLength; i++) {
    if (direction === 1) {
      newShipLocations.push(row + "" + (col + i));
    } else { 
      newShipLocations.push((row + i) + "" + col);
  }
 }
  return newShipLocations;
 },
collision: function(locations) {
  for (var i = 0; i < this.numShips; i++) {
    var ship = model.ships[i];
    for (var j = 0; j < locations.length; j++) {
      if (ship.locations.indexOf(locations[j]) >= 0) {
        return true;
      }
    }
  }
  return false;
 }
}
var controller = {
  guesses: 0,
  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses ++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayarea("你击沉了我们所有战舰, 经过 " + this.guesses + "次猜测");
      }
    }
  }
}
function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
   if (guess === null || guess.length !== 2) {
     alert("请输出符合规定的输入");
    } else {
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);


   if (isNaN(row) || isNaN(column)) {
     alert("请输入范围内的数字");
    } else if (row < 0 || row >= model.boardSize ||column < 0 || column >= model.boardSize) {
        alert("输入内容不在范围内"); 
      } else {
        return row + column;
      }
  }
  return null;
}
function init () {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
  model.generateShipLocations();
}
window.onload = init;

function handleFireButton() {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);

  guessInput.value = "";
}

function handleKeyPress(e) {
  var fireButton = document.getElementById("fireButton");
  if (e.KeyCode === 13) {
    fireButton.click();
    return false;
  }
}


