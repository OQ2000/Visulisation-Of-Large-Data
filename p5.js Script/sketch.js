//Used In DEBUG == 2
let raw8x6 = "8BCGIBBGGFCBDDDDDDBFADCAHCCDIICAADADCADADDDBCMBCACAAAAKCGFADFAHDA8"
////////////Assigning Start Variables For Buttons And Sliders////////////

ShowPlayerPaths = 0
ShowArrows = 0
ShowPaths = 0
debug = 0

////////////Creating Button And Slider Variables////////////

let showPlayerPathsButton
let showPathsButton
let showArrowsButton
let showDebugBut
let showGenerationbut
let inp

////////////Assigning Start Values////////////

rarCurrent = ''
directionArray = []
let splitMasterString = []
lastRar = ""

rectSize = 30
arrayWidth = 0
arrayHeight = 0
DistanceBetweenBoxes = rectSize /2
MasterString = rarCurrent;

function setup() {
  //Creating Default Canvas And Setting Background To Grey
  createCanvas(1920, 1080);
  background(30)
  
  //Createing Master String Input
  inp = createInput('');
  inp.size(400, 15)
  inp.position(0, 0)
  inp.input(myInputEvent);
  
  //Creating Button for paths
  showPlayerPathsButton = createButton('Show Paths');
  showPlayerPathsButton.position(500, 0);
  showPlayerPathsButton.mousePressed(showPaths);

  //Creating Button for  player paths
  showPathsButton = createButton('Show Player Paths');
  showPathsButton.position(650, 0);
  showPathsButton.mousePressed(showPlayerPaths);

  //Creating Button for showing arrows
  showArrowsButton = createButton('Show Arrow Paths');
  showArrowsButton.position(800, 0);
  showArrowsButton.mousePressed(showArrow);

  //Creating Button debug
  showDebugBut = createButton('Show Dubug');
  showDebugBut.position(1000, 0);
  showDebugBut.mousePressed(showDebug);

  //Creating Generate debug
  showGenerationbut = createButton('Generate');
  showGenerationbut.position(400, 0);
  showGenerationbut.mousePressed(Generate);
  
  if(debug == 2){
   Generate() 
  }
}
////////////FUNCTIONS RELATED TO BUTTONS AND INPUTS////////////
function showPaths() {
  if (ShowPaths == 0) {
    ShowPaths = 1
    showPathsButton.label = "test"
  } else {
    ShowPaths = 0
  }
  Generate()
}
function showPlayerPaths() {
  if (ShowPlayerPaths == 0) {
    ShowPlayerPaths = 1
  } else {
    ShowPlayerPaths = 0
  }
  Generate()
}
function showArrow() {
  if (ShowArrows == 0) {
    ShowArrows = 1
  } else {
    ShowArrows = 0
  }
  Generate()
}
function myInputEvent() {
  rarCurrent = this.value()
  return (rarCurrent)
  // console.log('Your Map: ', this.value());
  Generate()
}
function showDebug() {
  if (debug == 0) {
    debug = 1
  } else {
    debug = 0
  }
  Generate()
}
////////////DECOMPRESSION////////////
function Decompression(Compressed) {
  decompressedString = ""
  arrayWidth = 0
  arrayHeight = 0
  let decompressionDict = new p5.TypedDict()
  decompressionDict.create("A", "N")
  decompressionDict.create("B", "S")
  decompressionDict.create("C", "E")
  decompressionDict.create("D", "W")
  decompressionDict.create("E", "SE")
  decompressionDict.create("F", "SW")
  decompressionDict.create("G", "NE")
  decompressionDict.create("H", "NW")
  decompressionDict.create("I", "NS")
  decompressionDict.create("J", "EW")
  decompressionDict.create("K", "SEW")
  decompressionDict.create("L", "NEW")
  decompressionDict.create("M", "NSW")
  decompressionDict.create("N", "NSE")
  decompressionDict.create("O", "NSEW")
  // console.log(str(decompressionDict.get()))
  for (let i = 0; i < Compressed.length; i++) {
    // print(this.Compressed[i])
    CurrentCharInt = int(Compressed[i])
    CurrentChar = Compressed[i]
    if (Number.isNaN(CurrentCharInt) != true) {
      if (i == 0 || i == 1) {
        arrayWidth = str(arrayWidth) + str(CurrentCharInt)
      }
      if (i > 1) {
        arrayHeight = str(arrayHeight) + str(CurrentCharInt)
      }
    } else {
      CurrentChar = str(decompressionDict.get(CurrentChar))
      decompressedString = decompressedString + CurrentChar + ","
    }
  }
  print(decompressedString + arrayWidth + "," + arrayHeight)
  CavasWidth = arrayWidth * (rectSize + DistanceBetweenBoxes) + 200
  CavasHeight = arrayHeight * (rectSize + DistanceBetweenBoxes) + 200
  resizeCanvas(CavasWidth, CavasHeight);
  print("arrayWidth:", arrayWidth)
  print("arrayHeight:", arrayHeight)
  decompressedString = decompressedString + arrayWidth + "," + arrayHeight
  return decompressedString
}
////////////CREATING THE MAP////////////
function Generate() {
  if (debug == 2) {
    MasterString = raw8x6
    rarCurrent = raw8x6
  }
  //Passing Compressed String In:
  Decompression(rarCurrent)
  print(rarCurrent)
  lastRar = rarCurrent
  print("Running")
  //30 is good
  background(30);
  noStroke()
  strokeWeight(3)
  textSize(12)
  //Uses Input String
  MasterString = decompressedString;
  
  //Shows Current String
  textAlign(LEFT)
  stroke(2)
  fill(255)
  // text("FPS: " + str(fps),10,36)
  text("Current String: " + str(MasterString), 10, 60)
  directionArray = []
  rooms = []
  splitMasterString = split(MasterString, ',');
  splitMasterStringlength = splitMasterString.length
  //Gets Array Width
  arrayWidth = splitMasterString[splitMasterStringlength - 2]
  //Gets Array Height
  arrayHeight = splitMasterString[splitMasterStringlength - 1]
  rectStartX = 40
  rectStartY = 100
  //Used For Assinging A New Id To Each Room
  r = 0
  let paths = new p5.TypedDict()
  paths.create('N', 'up')
  paths.create('E', 'right')
  paths.create('S', 'down')
  paths.create('W', 'left')
  for (j = 0; j < arrayWidth; j++) {
    for (let i = 0; i < arrayHeight; i++) {
      directionArray = []
      currentChar = splitMasterString[r]
      for (let l = 0; l < currentChar.length; l++) {
        append(directionArray, paths.get(currentChar[l]))
      }
      rooms[r] = new room(rectStartX, rectStartY, directionArray, r, rooms)
      r++
      rectStartY = rectStartY + rectSize + DistanceBetweenBoxes
    }
    rectStartY = 100
    rectStartX = rectStartX + rectSize + DistanceBetweenBoxes
  }
  let i = 0
  rooms.forEach(room => {
    room.display(i);
    i++
  });
  rooms.forEach(room => {
    room.drawPaths();
    i++
  });
}

function draw() {
  //Used For Version Control
  textSize(19)
  noStroke()
  stroke(0)
  textAlign(LEFT)
  fill(255)
  text("Version: 1.6", 1100, 20)
}
////////////DIRECTION DISPLAYS
function drawArrow(x, y, direction) {
  textAlign(CENTER);
  strokeWeight(2)
  stroke(100, 200, 0)
  fill(0, 100, 0)
  this.x = x
  this.y = y
  this.x = this.x + (rectSize / 2)
  this.y = this.y + (rectSize / 2)

  halved = (rectSize / 2)
  if (direction == "up") {
    line(this.x + rectSize/10, this.y - rectSize/2, this.x + rectSize/10, this.y - rectSize*1.2)
    line(this.x - rectSize/10, this.y - rectSize/2, this.x - rectSize/10, this.y - rectSize*1.2)
    
    line(this.x + rectSize/6, this.y - rectSize*1.1, this.x, this.y - rectSize*1.4)
    line(this.x - rectSize/6, this.y - rectSize*1.1, this.x, this.y - rectSize*1.4)
  }
  if (direction == "down") {
    line(this.x + rectSize/10, this.y + rectSize/2, this.x + rectSize/10, this.y + rectSize*1.2)
    line(this.x - rectSize/10, this.y + rectSize/2, this.x - rectSize/10, this.y + rectSize*1.2)
    
    line(this.x + rectSize/6, this.y + rectSize*1.1, this.x, this.y + rectSize*1.4)
    line(this.x - rectSize/6, this.y + rectSize*1.1, this.x, this.y + rectSize*1.4)
  }
  if (direction == "right") {
    line(this.x + rectSize/2, this.y + rectSize/10, this.x + rectSize*1.2, this.y + rectSize/10)
    line(this.x + rectSize/2, this.y - rectSize/10, this.x + rectSize*1.2, this.y - rectSize/10)
    
    line(this.x + rectSize*1.1, this.y + rectSize/6, this.x + rectSize*1.4, this.y)
    line(this.x + rectSize*1.1, this.y - rectSize/6, this.x + rectSize*1.4, this.y)
  }
  if (direction == "left") {
    line(this.x - rectSize/2, this.y + rectSize/10, this.x - rectSize*1.2, this.y + rectSize/10)
    line(this.x - rectSize/2, this.y - rectSize/10, this.x - rectSize*1.2, this.y - rectSize/10)
    
    line(this.x - rectSize*1.1, this.y + rectSize/6, this.x - rectSize*1.4, this.y)
    line(this.x - rectSize*1.1, this.y - rectSize/6, this.x - rectSize*1.4, this.y)
  }
  stroke(0)
  fill(100, 0, 0)
  redraw();

}
function drawPath(x, y, direction) {
  textAlign(CENTER);
  strokeWeight(2)
  stroke(100, 200, 0)
  fill(0, 100, 0)
  this.x = x
  this.y = y
  this.x = this.x + (rectSize / 2)
  this.y = this.y + (rectSize / 2)
  halved = (rectSize / 2)
  if (direction == "up") {
    rect(this.x - rectSize/7.5, this.y - rectSize/2, rectSize / 4, -rectSize/2)
  }
  if (direction == "down") {
    rect(this.x - rectSize/7.5, this.y + rectSize/2, rectSize / 4, rectSize/2)
  }
  if (direction == "right") {
    rect(this.x + rectSize/2, this.y -rectSize/7.5, rectSize/2, rectSize / 4)
  }
  if (direction == "left") {
    rect(this.x - rectSize/2, this.y - rectSize/7.5, -rectSize/2, rectSize / 4)
  }
  stroke(0)
  fill(100, 0, 0)

}
function drawPlayerPath(x, y, direction) {
  textAlign(CENTER);
  stroke(0, 0, 0)
  strokeWeight(0)
  fill(0, 200, 200)
  this.x = x
  this.y = y
  this.x = this.x + (rectSize / 2)
  this.y = this.y + (rectSize / 2)

  halved = (rectSize / 2)
  if (direction == "up") {
    rect(this.x - rectSize/14, this.y + rectSize/14, rectSize/7, -rectSize*1.6)
  }
  if (direction == "down") {
    rect(this.x - rectSize/14, this.y - rectSize/15, rectSize/7, rectSize*1.634)
  }
  if (direction == "right") {
    rect(this.x-rectSize/20, this.y - rectSize/14, +rectSize*1.55, rectSize/7)
  }
  if (direction == "left") {
    rect(this.x+rectSize/22, this.y - rectSize/14, -rectSize*1.6, rectSize/7)
  }
  stroke(0)
  fill(100, 0, 0)
}
////////////ROOM CLASS////////////
class room {
  constructor(x, y, directionArray, id, rooms) {
    this.x = x
    this.y = y
    this.directionArray = directionArray
    this.id = id
    this.allRooms = rooms
  }

  display() {
    stroke(0)
    strokeWeight(2)
    fill(255)
    if (debug == 1) {
      text(this.id, this.x - 5, this.y - 5)
    }
    fill(100, 0, 0)
    rect(this.x, this.y, rectSize, rectSize)
  }

  drawPaths() {
    //Write All
    // append(this.directionArray,'up')
    // append(this.directionArray,'down')
    // append(this.directionArray,'right')
    // append(this.directionArray,'left')

    for (let i = 0; i < this.directionArray.length; i++) {
      if (ShowArrows == 1) {
        drawArrow(this.x, this.y, this.directionArray[i])
      }
      if (ShowPaths == 1) {
        drawPath(this.x, this.y, this.directionArray[i])
      }
      if (ShowPlayerPaths == 1) {
        drawPlayerPath(this.x, this.y, this.directionArray[i])
      }
    }
  }
}


