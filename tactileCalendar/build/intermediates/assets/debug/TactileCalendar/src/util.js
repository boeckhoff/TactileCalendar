function daysSinceEpoch(timeString) {
  var date = new Date(timeString)
  date.setHours(0,0,0,0)
  return Math.floor(date/8.64e7)
}

function minutesSinceMidnight(timeString) {
  date = new Date(timeString);
  midnight = new Date(timeString);
  midnight.setHours(0,0,0,0)

  diff = date.getTime() - midnight.getTime();
  return diff/60000
}

var cursorX;
var cursorY;
document.onmousemove = function(e) {
  cursorX = e.pageX;
  cursorY = e.pageY;
}
