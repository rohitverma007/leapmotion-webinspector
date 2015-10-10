//Required Libs:
   // <script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.js"></script>
   // <script src="//js.leapmotion.com/leap-0.6.2.js"></script>
   // <script src="//js.leapmotion.com/leap-plugins-0.1.6.1.js"></script>
   // <script src="//js.leapmotion.com/leap.rigged-hand-0.1.4.min.js"></script>

var triggerEvent = function(event_name, value) {
	$(window).trigger( event_name, [ value ] );
}


//Zoom Event
Leap.loop({background: true}, {

    hand: function(hand) {
		triggerEvent("zoom", hand.pinchStrength.toPrecision(2))
	}
});

//Add Stuff Here
//Rotate Event

