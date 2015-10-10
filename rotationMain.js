
var state = 1;
var degreeX = 0, initX = degreeX , deltaX = 0;
var degreeY = 0, initY = degreeY , deltaY = 0;


function concatData(id, data){
  return id + ": " + data + "<br>";
};

var output = document.getElementById("output");
var output2 = document.getElementById("output2");
var frameString = "", handString = "", fingerString = "";
var hand, finger;


function transformCSS (className, degree) {
	var style = {
		"-webkit-transform": "rotateY("+degree+"deg)",
		"-moz-transform": "rotateY("+degree+"deg)",
		"transform": "rotateY("+degree+"deg)"
	}
	//$(className).css(style);

	return style;
};

// based on how much the hand rolls, CSS transform the card to flip accordingly
// hasHand (boolean): whether a hand exists in the field of view or not
// handType (string): "left" or "right"
// degree: hand.roll in radian
function flipX(hasHand, handType, rollRadian) {
	degreeX = (rollRadian * (180 / Math.PI));
	deltaX = degreeX - initX;


	if(hasHand) {
	    //transformCSS(".front", 0-degree);			// front card should roll from 0 to 180

		if(handType === "left")	{}					// hand roll is from 0 to 180deg
			//transformCSS(".back", -degree-180);		// back card should roll from -180 to 0
		else {										// hand roll is from 0 to -180deg
			//transformCSS(".back", -180-degree);		// back card should roll from -180 to 0
			degreeX = degreeX;
		}
	}
	else {
		//transformCSS(".front", 0a;
		//transformCSS(".back", -180);
	}
		

	//frameString = concatData("frame_id", frame.id);

	/*for(var i = 0; len = frame.hands.length; i < len; i++){
    hand = frame.hand[i];
    handString = concatData("hand_type", hand.type);
    handString += concatData("rotateY", degree);
    handString += "<br>";
    frameString += handString;
	}*/

	output.innerHTML = "X - Axis: " + degreeX;
	if(Math.abs(deltaX) < 0.75){
		deltaX = 0;
	}
	output2.innerHTML = "X - delta: " + deltaX;
};

function flipY(hasHand, handType, rollRadian) {
	degreeY = (rollRadian * (180 / Math.PI));
	deltaY = degreeY - initY;


	if(hasHand) {
	    //transformCSS(".front", 0-degree);			// front card should roll from 0 to 180
		if(handType === "left")	{}					// hand roll is from 0 to 180deg
			//transformCSS(".back", -degree-180);		// back card should roll from -180 to 0

		else {									// hand roll is from 0 to -180deg
			//transformCSS(".back", -180-degree);		// back card should roll from -180 to 0
			degreeY = degreeY;
		}
	}
	else {
		//transformCSS(".front", 0);
		//transformCSS(".back", -180);
	}
		

	//frameString = concatData("frame_id", frame.id);

	/*for(var i = 0; len = frame.hands.length; i < len; i++){
    hand = frame.hand[i];
    handString = concatData("hand_type", hand.type);
    handString += concatData("rotateY", degree);
    handString += "<br>";
    frameString += handString;
	}*/
	output3.innerHTML = "Y - Axis: " + degreeY;
	if(Math.abs(deltaY) < 0.75){
		deltaY = 0;
	}
	output4.innerHTML = "Y - delta: " + deltaY;
};

Leap.loop(function (frame) {



	// state machine
	switch(state) {
		case 1:

			if(frame.hands.length > 0) {
				initX = degreeX;
				initY = degreeY;
				flipX(true, frame.hands[0].type, frame.hands[0].roll());
				flipY(true, frame.hands[0].type, frame.hands[0].pitch());
			}
			else {
				//cardFlip(false, "", 0);				// if there are no hands detected, keep the degree
			}
		  break;
		case 2:
		  break;
		default:
	}

});

