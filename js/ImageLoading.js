var titleScreen = document.createElement("img");
var winScreen = document.createElement("img");
var tick2 = document.createElement("img");
var cross = document.createElement("img");
var hashtagSymbol = document.createElement("img")
var trash_lid = document.createElement('img');
var trash_bin = document.createElement('img');
var homeIcon = document.createElement('img');
var logo = document.createElement('img');
var arrow = document.createElement('img');
var heart1 = document.createElement('img');
var heart2 =document.createElement('img');

//puzzle1
var p1old = document.createElement('img');
var p1new = document.createElement('img');

//puzzle2
var p2old = document.createElement('img');
var p2new = document.createElement('img');

//puzzle3
var p3old = document.createElement('img');
var p3new = document.createElement('img');

//puzzle4
var p4old = document.createElement('img');
var p4new = document.createElement('img');

//puzzle5
var p5old = document.createElement('img');
var p5new = document.createElement('img');

//puzzle6
var p6old = document.createElement('img');
var p6new = document.createElement('img');

//puzzle7
var p7old = document.createElement('img');
var p7new = document.createElement('img');

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	if(picsToLoad == 0) {
		handleComplete();
	}
}

function loadImages() {
	var imageList = [
		//{varName: titleScreen, theFile: "titleScreen.png"},
		//{varName: winScreen, theFile: "winScreen.png"},
		{varName:trash_lid, theFile: "trash_lid.png"},
		{varName:trash_bin, theFile: "trash_bin.png"},
		{varName:homeIcon, theFile: "home.png"},
		{varName:logo, theFile: "logo.png"},
		{varName:tick2, theFile: "tick.png"},
		{varName:cross, theFile: "cross.png"},
		{varName:hashtagSymbol, theFile: "hashtag.png"},
		{varName:arrow, theFile: "arrow.png"},
		{varName:heart1, theFile: "heart1.png"},
		{varName:heart2, theFile: "heart2.png"},
		
		//puzzle1
		{varName: p1old, theFile: "p1old.png"},
		{varName: p1new, theFile: "p1new.png"},
		
		//puzzle2
		{varName: p2old, theFile: "p2old.png"},
		{varName: p2new, theFile: "p2new.png"},
		
		//puzzle3
		{varName: p3old, theFile: "p3old.png"},
		{varName: p3new, theFile: "p3new.png"},
		
		//puzzle4
		{varName: p4old, theFile: "p4old.png"},
		{varName: p4new, theFile: "p4new.png"},
		
		//puzzle5
		{varName: p5old, theFile: "p5old.png"},
		{varName: p5new, theFile: "p5new.png"},
		
		//puzzle6
		{varName: p6old, theFile: "p6old.png"},
		{varName: p6new, theFile: "p6new.png"},
		
		//puzzle7
		{varName: p7old, theFile: "p7old.png"},
		{varName: p7new, theFile: "p7new.png"}

		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		var imgVar = imageList[i].varName
		var fileName = imageList[i].theFile
		imgVar.onload = countLoadedImagesAndLaunchIfReady;
		imgVar.src = "images/"+fileName;
	}
}