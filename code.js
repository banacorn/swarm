$(function(){

        DOM.init();
        Ctx.init();
        Ctx.draw();
});


var Germs = (function(){

        var germs = [{
                type: 'blau',
                x: 0,
                y: 0,
                life: 10,
                cycle: 30,
                phase: 0,
        },{
                type: 'gruen',
                x: 100,
                y: 100,
                life: 5,
                cycle: 50,
                phase: 0,
        },{
                type: 'gruen',
                x: 100,
                y: 200,
                life: 15,
                cycle: 50,
                phase: 0,
        },{
                type: 'blau',
                x: 200,
                y: 200,
                life: 12,
                cycle: 50,
                phase: 0,
        }];

        function updateGerms(){
		for(var i=0, len=germs.length; i<len; i++)
		{
		        if(germs[i].life === 0)
		        {
		                germs.splice(i, 1);
		                return;
		        }
		        
		
		        germs[i].phase++;
                        if(germs[i].phase === germs[i].cycle)
                        {
                                germs[i].phase = 0;
                                germs[i].life--;
                        }
		}                
        }

        /* CLOCK */
        setInterval(function(){
                updateGerms();
        }, 20);
        
        return {
                getGerms: function(){
                        return germs;
                },
                test: function(){
                        return clock.time;
                }
        };
})();

var Ctx = (function(){

        var ctx;
        var viewport;
        var scaling = {
                level: 0,
                scalar: 50
        };
        var scale = {
                level: 0,
                scalar: 50
        };
        var germColor = {
                blau: 'rgba(80, 160, 240, ',
                gruen: 'rgba(40, 160, 40, '
        };

        var drawGerm = function(germ){
                ctx.save();
                ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.arc(germ.x+300, germ.y+300, 30, 0, Math.PI*2, true);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.fillStyle = germColor[germ.type] + (Math.sin(germ.phase*Math.PI/germ.cycle) * 0.5 + 0.2) + ')';
                ctx.arc(germ.x+300, germ.y+300, 10, 0, Math.PI*2, true);
                ctx.fill();
                
                ctx.restore();
        };

        var beehive = function(s){                        
                ctx.save();
                ctx.strokeStyle = 'rgb(200, 200, 200)';
                ctx.lineWidth = s/25;
                ctx.beginPath();
                ctx.moveTo(s * -0.3, s * 0.519);
                ctx.lineTo(s * 0.3, s * 0.519);
                ctx.lineTo(s * 0.6, 0);
                ctx.lineTo(s * 0.3, s * -0.519);
                ctx.lineTo(s * -0.3, s * -0.519);
                ctx.lineTo(s * -0.6, 0);
                ctx.lineTo(s * -0.3, s * 0.519);
                ctx.stroke();                      
                ctx.restore();                
        };
        
        return {
                init: function(){
                        var canvas = document.querySelector('#canvas');
                        
                        if(canvas.getContext)
                        {
                                ctx = canvas.getContext('2d');
                                ctx.font         = '20px Helvatica';
                                ctx.textBaseline = 'middle';
                                
                                //vp
                                viewport = DOM.getViewportSize();
		        }
		        
		},
		scale: function(type){
		        if(type && scaling.level > 0)//zoom in
		        {
		                scaling.scalar *= 1.25;
		                scaling.level--;
		        }
		        else if(!type && scaling.level < 7)
		        {
		                scaling.scalar *= 0.8;
		                scaling.level++;
		        }
		},
		translate: function(type){
		},
		draw: function(){
		
		        
		        ctx.font = '200px Helvetica';
		        
		        setInterval(function(){
		        
		                var germs = Germs.getGerms();
		                
		                ctx.clearRect(0, 0, viewport.width, viewport.height);
		                
		                for(var i=0, len=germs.length; i<len; i++)
		                {
		                        drawGerm(germs[i]);
		                        
		                }
		                
		                ctx.save();
		                for(var j=0; j<30; j++)
		                {
		                        for(var i=0, len=20; i<len; i++)
		                        {
		                                ctx.translate(scaling.scalar * 2, 0);
		                                beehive(scaling.scalar);		                        
		                        }
		                        ctx.translate(-41 * scaling.scalar, scaling.scalar * 0.6);
                                }
		                ctx.restore();
		                
		        }, 20);  
		        
		}
        };
})();


var DOM = (function(){
        var viewport;
        
        var resize = function(){
                $(window).resize(function(){
                        viewport = {
                                width: $(this).width(),
                                height: $(this).height()                        
                        };
                        
                        $('#viewport').width(viewport.width).height(viewport.height);
                        $('#canvas').attr('width', viewport.width).attr('height', viewport.height);
                }).resize();
        };
        
        var scale = function(f){
                $(window).mousewheel(function(e, delta){
                        if(delta === 1)//zoom in
                                f(true);
                        else if(delta === -1)//zoom out
                                f(false);
                });
        }
        
        var translate = function(){
                $('#canvas').mousedown(function(e){
                        $(window).mousemove(function(){
                        });
                }).mouseup(function(){
                        $(window).unbind('mousemove');
                });
        }
        
        return {
                init: function(){
                        resize();
                        scale(Ctx.scale);
                        translate();
                },
                getViewportSize: function(){
                        return viewport;
                }
        };
})();

function log(s){console.log(s)};
