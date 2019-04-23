function init () {
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
  view.displayarea("Tap tap, is this thing on?")
  
}



window.onload = init