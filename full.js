(function(window, undefined){
    Promise.all([
        new Promise((res) => {
            if(window.jQuery)
                res();
            else{
                var s=document.createElement('script');
                s.onload = () => res();
                s.src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
                document.head.appendChild(s);
            }
        }),
        new Promise((res) => {
              var s=document.createElement('script');
              s.onload = () => res();
              s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r67/three.js';
              document.head.appendChild(s);
        }).then(() => {
            return new Promise((res) => {
                var s=document.createElement('script');
                s.onload = () => res();
                s.src='https://js.leapmotion.com/leap-0.6.2.js';
                document.head.appendChild(s);
            });
        }).then(() => {
            return new Promise((res) => {
                var s=document.createElement('script');
                s.onload = () => res();
                s.src='https://js.leapmotion.com/leap-plugins-0.1.6.1.js';
                document.head.appendChild(s);
            });
        }).then(() => {
          return new Promise((res) => {
              var s=document.createElement('script');
              s.onload = () => res();
              s.src='https://js.leapmotion.com/leap.rigged-hand-0.1.4.min.js';
              document.head.appendChild(s);
          });
        })
    ])
    .then(() => {
        /* Init */
        var transform={
            zoom:1,
            rotateX:0,
            rotateY:0,
            translateX:0,
            translateY:0,
            extrude:30
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
*:hover{background-color:rgba(77,105,122,0.04);}
._jarvis-node{transform:translateZ(20px);box-shadow:0 1px 4px 1px rgba(0,0,0,0.15);outline:1px solid rgba(172,206,247,0.5);}
._jarvis-overflow{overflow:visible !important;}
</style>
        `).appendTo('head');
        $('head').append('<style id="_jarvis-node-style">._jarvis-node{transform:translateZ('+transform.extrude+'px);}</style>');
    
        var r=(node,depth) => {
            if(node.css('display')!=='inline'){
                node.addClass('_jarvis-node');
                if(depth<5)
                    node.addClass('_jarvis-overflow');
            }
            node.children().each((i,el) => r($(el),depth+1));
        }
        
        $('#_jarvis').children().each((i,el) => r($(el),1));
        
        
        /* Events */
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
            transform.zoom*=delta/100;
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
            transform.extrude=Math.max(0,transform.extrude+delta);
        });
        
        $(window).on('j-click',(e,pos) => {
            $(document.elementFromPoint(pos.x,pos.y)).click();
        });
    })
    .then(() => {
      Leap.loop({background: true}, {
          hand: function(hand) {            
              $(window).trigger("j-zoom",parseFloat(hand.pinchStrength.toPrecision(2))-100*-1)
          }
      });
    })
})(this);
