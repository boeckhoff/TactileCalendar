numberOfDays = 5

width = 1200;
height = 600;

timeMin = new Date(1485558000000) //use Date() for today
timeMax = new Date(timeMin)
timeMax.setDate(timeMax.getDate() + numberOfDays)
