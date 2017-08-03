var canvas = new fabric.Canvas('teller-canvas');

var canvasW = 1000;
var canvasH = 500;

var maxCircles = 50;

canvas.setHeight(canvasH);
canvas.setWidth(canvasW);

canvas.selection = false;
canvas.hoverCursor = "pointer";

var numCircles = 0;
var isClicked = false;
var canAddCircles = true;

var xPos = 50;
var yPos = 25;

var circle;

var circleR = canvasH /20;
var colorChoice = "#15BF42";

var circleOpacity = 0.85;

function addCircleBounds() {
	if(numCircles % 10 == 0) {
		xPos = 50;
		yPos = yPos + 100;
	}
}

function maxCircleNum() {
	if (numCircles >= maxCircles) {
		canAddCircles = false;
	}
}

function updateCircleCount() {
	document.getElementById("circle-count").innerHTML = "Brikker: " + numCircles;
}

function addOneCircle() {
	maxCircleNum();
	if (canAddCircles == true) {
		numCircles++;
		circle = new fabric.Circle({
		radius: circleR, fill: colorChoice, opacity: circleOpacity, stroke: 'black', strokeWidth: 3, left: xPos + 200, top: yPos
		});

		xPos = xPos + 50;

		addCircleBounds();

		circle.hasControls = false;
		circle.hasBorders = false;

		canvas.add(circle);
		updateCircleCount();
	}
}

function resetCanvas() {
	canvas.clear();
	numCircles = 0;
	xPos = 50;
	yPos = 25;
	updateCircleCount();
	canAddCircles = true;
}

function changeCircleColor(color) {
	colorChoice = color;
	document.getElementById("add-circle").style.backgroundColor = color;
}

//stack overflow code for boundaries
canvas.on('object:moving', function (e) {
        var obj = e.target;
         // if object is too big ignore
        if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
            return;
        }
        obj.setCoords();
        // top-left  corner
        if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
        }
        // bot-right corner
        if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
        }
});
