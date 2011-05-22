
var Ctx = (function(){

        var ctx;
        var viewport;
        var scaling = {
                level: 0,
                scalar: 100
        };
        var translation = {
                x: function(){ return this.ax + this.left },
                y: function(){ return this.ay + this.top },
                ax: 0,
                ay: 0,
                top: 0,
                left: 0,
                dx: 0,
                dy: 0
        };
        var germColor = {
                blau: 'rgba(80, 160, 240, ',
                gruen: 'rgba(40, 160, 40, '
        };

        var mapping = function(x, y){
                var s = scaling.scalar;
                var ex = Math.floor(x / 2);
                var m = x % 2;
                return {
                        x: s * ex * 3 + s * m * 1.5,
                        y: s * y * 1.72 + s * m * 0.86
                }
        };

        var drawGerm = function(germ){
        
                var s = scaling.scalar;
                var pos = mapping(germ.x, germ.y);
        
                ctx.save();
                ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
                ctx.lineWidth = s / 20;
                ctx.beginPath();
                ctx.arc(pos.x+translation.left, pos.y+translation.top, s * 0.7, 0, Math.PI*2, true);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.fillStyle = germColor[germ.type] + (Math.sin(germ.phase*Math.PI/germ.cycle) * 0.5 + 0.2) + ')';
                ctx.arc(pos.x+translation.left, pos.y+translation.top, s * 0.3, 0, Math.PI*2, true);
                ctx.fill();
                
                ctx.restore();
        };

        var beehive = function(s){                        
                ctx.save();
                ctx.strokeStyle = 'rgb(240, 240, 240)';
                ctx.lineWidth = s/25;
                ctx.beginPath();
                ctx.moveTo(s * -0.5, s * 0.86);
                ctx.lineTo(s * 0.5, s * 0.86);
                ctx.lineTo(s * 1, 0);
                ctx.lineTo(s * 0.5, s * -0.86);
                ctx.lineTo(s * -0.5, s * -0.86);
                ctx.lineTo(s * -1, 0);
                ctx.lineTo(s * -0.5, s * 0.86);
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
		scale: function(type){
		        if(type && scaling.level > 0)//zoom in
		        {
		                scaling.scalar *= 1.25;
		                scaling.level--;
		        }
		        else if(!type && scaling.level < 10)
		        {
		                scaling.scalar *= 0.8;
		                scaling.level++;
		        }
		},
		translate: function(e){
		        translation.ax += e.x;
		        translation.ay += e.y;
		        translation.dx += e.x;
		        translation.dy += e.y;
		},
		draw: function(){
		
		        
		        ctx.font = '200px Helvetica';
		        
		        setInterval(function(){
		        
		                var germs = Germs.getGerms();
		                
		                ctx.clearRect(-translation.ax, -translation.ay, viewport.width, viewport.height);
		                
		                ctx.translate(translation.dx, translation.dy);
		                translation.dx = 0;
		                translation.dy = 0;
		                
		                for(var i=0, len=germs.length; i<len; i++)
		                {
		                        drawGerm(germs[i]);		                        
		                }
		                
		                ctx.save();
		                
		                ctx.translate(translation.left, translation.top);
		                for(var j=0; j<20; j++)
		                {
		                        for(var i=0, len=30; i<len; i++)
		                        {
		                                ctx.translate(scaling.scalar * 3, 0);
		                                beehive(scaling.scalar);		                        
		                        }
		                        ctx.translate(-91.5 * scaling.scalar, scaling.scalar * 0.86);
                                }
		                ctx.restore();
		                
                                ctx.strokeStyle = 'rgb(100, 100, 100)';
                                ctx.lineWidth = 5;
                                ctx.beginPath();
                                ctx.moveTo(translation.left, translation.top);
                                ctx.lineTo(translation.left, translation.top + 1 * scaling.scalar);
                                ctx.stroke();
		        }, 20);
		}
        };
})();

