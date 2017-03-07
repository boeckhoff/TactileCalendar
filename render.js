var timeScale = d3.scaleLinear()
  .domain([540,1200])
  .range([100,height]);

var dayScale = d3.scaleLinear()
  .domain([daysSinceEpoch(timeMin),daysSinceEpoch(timeMin)+numberOfDays])
  .range([100,1000]);

var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg.append("defs").append("pattern")
  .attr("id","dotFill")
  .attr("x",0)
  .attr("y",0)
  .attr("width",1)
  .attr("height",0.1)
  .append("circle")
    .attr("cx",25)
    .attr("cy",25)
    .attr("r",10)
    .attr("stroke","black")
    .attr("fill","white")
    .attr("stroke-width","3");

function renderEvents(dataset) {
  //gets called from googleCalendar.js when events are obtained from API

  var eventsOuterBoxes = svg.selectAll(".outerBox")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","outerBox")

  eventsOuterBoxes
    .attr("x", function(e) {
      return dayScale(daysSinceEpoch(e.start.dateTime))
    })
    .attr("y", function(e) {
      return timeScale(minutesSinceMidnight(e.start.dateTime))
    })
    .attr("height", function(e) {
      return timeScale(minutesSinceMidnight(e.end.dateTime)) - timeScale(minutesSinceMidnight(e.start.dateTime))
    });

  var eventsInnerBoxes = svg.selectAll(".innerBox")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class","innerBox")

  eventsInnerBoxes
    .attr("x", function(e) {
      return dayScale(daysSinceEpoch(e.start.dateTime)) + 10
    })
    .attr("y", function(e) {
      return timeScale(minutesSinceMidnight(e.start.dateTime)) + 10
    })
    .attr("height", function(e) {
      return (timeScale(minutesSinceMidnight(e.end.dateTime)) - timeScale(minutesSinceMidnight(e.start.dateTime))) - 20
    });

  var summaries = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(e) {
      return convertToBraille(e.summary.substring(0,5))
    })

    .attr("x", function(e) {
      return dayScale(daysSinceEpoch(e.start.dateTime)) + 15
    })
    .attr("y", function(e) {
      var start = timeScale(minutesSinceMidnight(e.start.dateTime))
      var end = timeScale(minutesSinceMidnight(e.end.dateTime))
      return (start + (end-start)/2 + 8)
    });

  days = [] //Needed for placing of seperator lines

  for(i = 0; i <= numberOfDays; ++i) {
    day = new Date(timeMin)
    day.setDate(day.getDate() + i)   
    days.push(new Date(day))
  }

  var seperators = svg.selectAll(".seperator")
    .data(days)
    .enter()
    .append("rect")
    .attr("class", "seperator")
    .attr("x", function(e) {
      var xDiffPerDay = dayScale(daysSinceEpoch(days[1]))-dayScale(daysSinceEpoch(days[0]))
      return dayScale(daysSinceEpoch(e)) + (xDiffPerDay/2) + 25
    })
    .attr("y", function(e) {
      return 100
    })
    .attr("height", function(e) {
      return height-100
    });
}
