(function(undefined){
	/* Init */
	var transform={
		zoom:1,
		rotateX:0,
		rotateY:0,
		translateX:0,
		translateY:0,
		extrude:20
	};
	
	if($('#_jarvis').length)
		return;
	
	$('body').wrapInner('<div id=_jarvis-wrap><div id=_jarvis-wrap2><div id=_jarvis></div></div></div>');
	
	$(`
<style>
#_jarvis-wrap{perspective:800px;height:${parseInt(window.innerHeight)}px;background:none;}
#_jarvis-wrap2{transform:translateY(-50px) translateZ(-300px);background:none;}
#_jarvis{height:${parseInt(window.innerHeight)}px;background:${document.body.background};}
html,body{padding:0 !important;background:none !important;}
*{transform-style:preserve-3d;background-color:rgba(77,105,122,0.02);}
._jarvis-node{box-shadow:0 1px 4px 1px rgba(0,0,0,0.15);outline:1px solid rgba(172,206,247,0.3);}
._jarvis-overflow{overflow:visible !important;}
</style>
	`).appendTo('head');
	$('head').prepend('<style>:hover{background-color:rgba(77,105,122,0.04);}</style>');
	$('head').append('<style id="_jarvis-node-style">._jarvis-node{transform:translateZ('+transform.extrude+'px);}</style>');

	var r=(node,depth) => {
		if(node.css('display')!=='inline'){
			node.addClass('_jarvis-node');
			if(depth<5)
				node.addClass('_jarvis-overflow');
			if(depth>2&&!node.is('a'))
				node.attr('draggable',true);
		}
		node.children().each((i,el) => r($(el),depth+1));
	};
	
	$('#_jarvis').children().each((i,el) => r($(el),1));
	
	
	/* Event handlers */
	var updated=true;
	var frame=() => {
		if(updated){
			$('#_jarvis').css('transform','rotateX('+transform.rotateX+'deg) rotateY('+transform.rotateY+'deg) scale('+transform.zoom+','+transform.zoom+') translate('+transform.translateX+'px,'+transform.translateY+'px)');
			$('#_jarvis-node-style').text('._jarvis-node{transform:translateZ('+transform.extrude+'px);}');
		}
		updated=false;
		requestAnimationFrame(frame);
	};
	requestAnimationFrame(frame);
	Object.observe(transform, function(arr){
		updated=true;
	});
	
	$(window).on('j-zoom',(e,delta) => { // percent
		transform.zoom = delta/100;
	});
	
	$(window).on('j-rotate',(e,delta) => { // percent
		transform.rotateX+=delta.x/100*360;
		transform.rotateY+=delta.y/100*360;
	});
	
	$(window).on('j-translate',(e,delta) => { // percent
		transform.translateX+=parseInt($(window).innerWidth())*delta.x/100;
		transform.translateY+=parseInt($(window).innerHeight())*delta.y/100;
	});
	
	$(window).on('j-extrude',(e,delta) => { // arbitrary linear value
		transform.extrude=Math.max(0,delta);
	});
	
	$(window).on('j-click',(e,pos) => {
		$(document.elementFromPoint(pos.x,pos.y)).click();
	});
	
	var pointer=$('<div style="position:fixed;display:none;height:20px;width:20px;border-radius:10px;background:rgba(255,0,0,0.1);border:1 px solid rgba(255,0,0,0.5);"></div>').appendTo('body'),
		pointerTimer=null;
	$(window).on('j-point',(e,pos) => {
		if(pointerTimer){
			clearTimeout(pointerTimer);
			pointerTimer=null;
		}
		pointer.css({display:'',left:pos.x,top:pos.y});
		pointerTimer=setTimeout(() => {
			pointer.css('display','none');
			pointerTimer=null;
		},400);
	});
	
	$(window).on('dragstart',e => {
		$(e.target).css({opacity:0.5});
		var pageXQ=[],pageYQ=[];
		$(window).on('drag',e2 => {
			pageXQ.push(e2.originalEvent.pageX);
			pageYQ.push(e2.originalEvent.pageY);
			if(pageXQ.length>10)
				pageXQ.shift();
			if(pageYQ.length>10)
				pageYQ.shift();
		});
		$(window).one('dragend',() => {
			pageXQ.pop();
			pageYQ.pop();
			var minX=Math.min.apply(null,pageXQ),
				minY=Math.min.apply(null,pageYQ),
				maxX=Math.max.apply(null,pageXQ),
				maxY=Math.max.apply(null,pageYQ),
				dist=Math.sqrt(Math.pow(maxX-minX,2)+Math.pow(maxY-minY,2));
			if(dist>200)
				$(e.target).remove();
			$(window).off('drag');
			$(e.target).css({opacity:''});
		});
	});
	
	
	/* Trackpad events */
	$(window).on('keydown',e => {
		var propagate=false;
		// arrows
		if(e.which===37)
			transform.translateX-=30;
		else if(e.which===38)
			transform.translateY-=30;
		else if(e.which===39)
			transform.translateX+=30;
		else if(e.which===40)
			transform.translateY+=30;
		
		// wasd
		else if(e.which===87)
			transform.rotateX+=5;
		else if(e.which===65)
			transform.rotateY-=5;
		else if(e.which===83)
			transform.rotateX-=5;
		else if(e.which===68)
			transform.rotateY+=5;
		
		else if(e.which===33||e.which===190) // increase height
			transform.extrude+=5;
		else if(e.which===34||e.which===188) // decrease height
			transform.extrude=Math.max(0,transform.extrude-5);
		else if(e.which===189) // zoom out
			transform.zoom-=0.1;
		else if(e.which===187) // zoom in
			transform.zoom+=0.1;
		else
			propagate=true;
		
		if(!propagate){
			e.preventDefault();
			e.stopPropagation();
		}
	});
	
	
	
	new Promise(res => {
		if(typeof Leap==="undefined"){
		    var jsCode=document.createElement("script");
		    jsCode.setAttribute("src","https://js.leapmotion.com/0.2.0/leap.min.js");
		    jsCode.onload=()=>res();
		    document.body.appendChild(jsCode);
		}else{
		    res()
		}
	}).then(() => {
	
	
    var two_hand = 0;
    var state = -1;
    var fist = 0;
/*************************************Scrolling*********************************************************/

    var e={};
    var t={};
    var n=document.body;
    var doScroll=function(t){
        var r={};
        var i={};
        for(var s=0, o=t.pointables.length; s!=o; s++){
            var u=t.pointables[s];
            var a=e[u.id];
            var f=n.scrollTop;
            window.handsl = t;
	    var count = 0;
            if( state === -1 && t.hands.length <= 1 && fist === 0){
		for(var i = 0; i < t.hands[0].fingers.length; i++){
			if (t.hands[0].fingers[i].extended === true){
				count++;
			}
		}
            	if(count >= 4) {
                	if(u.tipPosition[1]-325>0){n.scrollTop=f-=150}
                	if(u.tipPosition[1]-125>0){n.scrollTop=f-=5}
                	if(u.tipPosition[1]-90<0){n.scrollTop=f+=5}
            	}
            }

            if(t.hands.length <= 1){
                two_hand = 0;
            } else if (t.hands.length > 1)
            {
                two_hand = 1;
            }


        }
    };



/*************************************Rotation*******************************************/
    var degreeX = 0, initX = degreeX , deltaX = 0;
    var degreeY = 0, initY = degreeY , deltaY = 0;


    var concatData=function(id, data){
      return id + ": " + data + "<br>";
    };

    // var output = document.getElementById("output");
    // var output2 = document.getElementById("output2");
    var frameString = "", handString = "", fingerString = "";
    var hand, finger;


    var transformCSS=function(className, degree) {
        var style = {
            "-webkit-transform": "rotateY("+degree+"deg)",
            "-moz-transform": "rotateY("+degree+"deg)",
            "transform": "rotateY("+degree+"deg)"
        }

        return style;
    };

    var flipX=function(hasHand, handType, rollRadian) {
        degreeX = (rollRadian * (180 / Math.PI));
        deltaX = degreeX - initX;

        // output.innerHTML = "X - Axis: " + degreeX;
        if(Math.abs(deltaX) < 0.75){
            deltaX = 0;
        }

        return deltaX;
        // output2.innerHTML = "X - delta: " + deltaX;
    };

    var flipY=function(hasHand, handType, rollRadian) {
        degreeY = (rollRadian * (180 / Math.PI));
        deltaY = degreeY - initY;

        // output3.innerHTML = "Y - Axis: " + degreeY;
        if(Math.abs(deltaY) < 0.75){
            deltaY = 0;
        }

        return deltaY;
        // output4.innerHTML = "Y - delta: " + deltaY;
    };

    var doRotate=function (frame) {

            switch(state) {
                case 1:

                    if(frame.hands.length > 0) {
                        initX = degreeX;
                        initY = degreeY;
                        deltaX = flipX(true, frame.hands[0].type, frame.hands[0].pitch());
                        deltaY = flipY(true, frame.hands[0].type, frame.hands[0].roll());
                        initX += deltaX/4;
                        initY += deltaY/4;
                        $(window).trigger("j-rotate",{"x":deltaX/4, "y":deltaY/4})

                    }
                  break;
                case -1:
                	if(fist === 1){
                		if(frame.hands.length === 1){
                			
	                        $(window).trigger("j-extrude",frame.hands[0].stabilizedPalmPosition[2]);
                		}
                	}

                  break;
                default:
            }

        };

/******************************************Zoom*********************************************************/


      var doZoom=function(frame) { 
      	if(!frame.hands().length)
      		return;
      	var hand=frame.hands()[0];
          //console.log(hand.grabStrength * 100);   
          // console.log(hand.grabStrength * 100);
            if(hand.grabStrength * 100 < 95 && hand.grabStrength * 100 > 0){
                 
                state = 1;
            } else {
                state = -1;
            }

            if(hand.grabStrength*100 >= 100) {
            	fist = 1;
            } else {
            	fist = 0;
            }

          //  console.log(two_hand);
             // $(window).trigger("j-zoom",parseFloat(hand.pinchStrength.toPrecision(2))-100*-1)
             if(parseFloat(hand.pinchStrength.toPrecision(2))*100 > 20 && two_hand === 1 && fist == 0) {
              $(window).trigger("j-zoom",parseFloat(hand.pinchStrength.toPrecision(2))*100);
            }
      };

	Leap.loop({},frame => {
		doScroll(frame);
		doRotate(frame);
		doZoom(frame);
	});
	});
})();
