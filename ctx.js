
var Ctx = (function(){

        var ctx;
        var viewport;
        var scaling = {
                level: 0,
                scalar: 1
        };
        var translation = {
                top: 0,
                left: 0,
                ax: 0,
                ay: 0,
                dx: 0,
                dy: 0,
                
        };

        var mapping = function(x, y){
                var s = scaling.scalar;
                var m = x % 2;
                return {
                        x: s * x * 150,
                        y: s * -y * 172 + s * m * 86
                }
        };
        
        var germColor = {
                blau: 'rgba(80, 160, 240, ',
                gruen: 'rgba(40, 160, 40, '
        };

        var drawCircle = function(pos, rad, width, style, start, end, anticounter){             
                ctx.strokeStyle = style || 'rgba(200, 200, 200, 0.5)';
                ctx.lineWidth = scaling.scalar * width;
                
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, scaling.scalar * rad, start * Math.PI * 2 + Math.PI * -0.5 || Math.PI * -0.5, end * Math.PI * 2 + Math.PI * -0.5 || Math.PI * 1.5, anticounter || false);
                ctx.stroke();
        };

        /* Organalle functions */
        
        var cellMembrane = function(pos){
                drawCircle(pos, 80, 5);
        };

        var nuclearEnvelope = function(pos){
                drawCircle(pos, 40, 5);
        };
        
        var phaseRing = function(pos, phase){
                drawCircle(pos, 30, 5, 'rgba(200, 200, 240, 0.5)', 0, phase);
        };
        
        var ageRing = function(pos, age){
                drawCircle(pos, 20, 5, 'rgba(200, 160, 160, 0.5)', age);
        };
        
        var drawGerm = function(germ){
                
                /* level 
                0~3 
                4~6 
                7~9                
                */
                var s = scaling.scalar;
                var lvl = scaling.scalar;
                var pos = mapping(germ.x, germ.y);
                
                ctx.save();
                
                //scaling.level
                if(lvl <= 3)
                {
                        //cell membrane
                        cellMembrane(pos);
                        
                        
                        //nucleus
                        if(germ.type === 'eukaryote')
                        {
                                nuclearEnvelope(pos);
                        }
                        
                        phaseRing(pos, germ.phase/germ.cycle);
                        ageRing(pos, germ.age/germ.life);
                }
                else if(lvl <= 6)
                {
                        //cell membrane
                        cellMembrane(pos);
                }
                else
                {
                        //cell membrane
                        cellMembrane(pos);
                }
                
                ctx.restore();
                
        };

        var beehive = function(pos){
                var s = scaling.scalar;
                ctx.save();
                ctx.strokeStyle = 'rgb(200, 200, 200)';
                ctx.lineWidth = s * 4;
                ctx.beginPath();
                ctx.moveTo(pos.x + s * -50, pos.y + s * 86);
                ctx.lineTo(pos.x + s * 50, pos.y + s * 86);
                ctx.lineTo(pos.x + s * 100, pos.y + 0);
                ctx.lineTo(pos.x + s * 50, pos.y + s * -86);
                ctx.lineTo(pos.x + s * -50, pos.y + s * -86);
                ctx.lineTo(pos.x + s * -100, pos.y + 0);
                ctx.lineTo(pos.x + s * -50, pos.y + s * 86);
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
                                
		        }
		        
		},
		resize: function(v){
		        viewport = v;
		        translation.top = v.height/2;
		        translation.left = v.width/2;
		},
		scale: function(type, e){
		
		        var d = {
		                x: e.pageX - translation.ax - translation.left,
		                y: e.pageY - translation.ay - translation.top
		        };
		        
		        if(type && scaling.level > 0)//zoom in
		        {
		                scaling.scalar *= 1.25;
		                scaling.level--;
		                
		                
		                translation.ax -= d.x * 0.5625;
		                translation.ay -= d.y * 0.5625;
		        }
		        else if(!type && scaling.level < 10)
		        {
		                scaling.scalar *= 0.8;
		                scaling.level++;
			
		                translation.ax += d.x * 0.36;
		                translation.ay += d.y * 0.36;
		        }
		},
		translate: function(e){
		        translation.ax += e.x;
		        translation.ay += e.y;
		},
		draw: function(){
		
		        
		        ctx.font = '200px Helvetica';
		        
		        
                        
		        setInterval(function(){
		        
		                var germs = Germs.getGerms();
		                
		                
		                
		                
		                ctx.save();
		                
		                ctx.translate(translation.left + translation.ax, translation.top + translation.ay);
		                translation.dx = 0;
		                translation.dy = 0;
		                ctx.clearRect(-translation.left -translation.ax, -translation.top -translation.ay, viewport.width, viewport.height);
		                
		                
		                for(var i=0, len=germs.length; i<len; i++)
		                {
		                        drawGerm(germs[i]);		                        
		                }
		                
                                ctx.strokeStyle = 'rgb(200, 200, 200)';
		                Petri.iter(function(x, y){
		                        var pos = mapping(x, y);
		                        beehive(pos);
		                        /*ctx.beginPath();
		                        ctx.arc(pos.x, pos.y, scaling.scalar *10, 0, Math.PI*2, true);
		                        ctx.stroke();*/
		                });
		                
		                
		                ctx.beginPath();
		                ctx.moveTo(0, 0);
		                ctx.lineTo(0, scaling.scalar);
		                ctx.stroke();
		                
		                ctx.restore();
		                
		                /*ctx.save();
		                
		                ctx.translate(translation.left, translation.top);
		                for(var j=0; j<20; j++)
		                {
		                        for(var i=0, len=30; i<len; i++)
		                        {
		                                ctx.translate(scaling.scalar * 3, 0);
		                                beehive(scaling.scalar);		                        
		                        }
		                        ctx.translate(-91.5 * scaling.scalar, scaling.scalar * 0.86);
                                }*/
		                
		                
		                
		        }, 20);
		},
		test: function(x, y){
		        var a = mapping(x,y);
		        return a.x + '   ' + a.y;
                }
        };
})();

