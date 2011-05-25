var Ctx = (function(){

        var ctx;
        
        //Viewport
        VP = {
                size: undefined,
                level: 0,
                scale: 1,
                translation: {
                        top: 0,
                        left: 0,
                        ax: 0,
                        ay: 0,
                        dx: 0,
                        dy: 0
                },
                refresh: function(){
                        ctx.translate(this.translation.left + this.translation.ax, this.translation.top + this.translation.ay);
                        this.translation.dx = 0;
		        this.translation.dy = 0;
		        ctx.clearRect(-this.translation.left -this.translation.ax, -this.translation.top -this.translation.ay, this.size.width, this.size.height);
                }
        };

        //Petri
        P = {
                beehive: function(pos){
		        ctx.save();
                        var s = VP.scale;
                        ctx.lineWidth = s * 8;
                        ctx.beginPath();
                        ctx.moveTo(pos.x + s * -100, pos.y + s * 172);
                        ctx.lineTo(pos.x + s * 100, pos.y + s * 172);
                        ctx.lineTo(pos.x + s * 200, pos.y + 0);
                        ctx.lineTo(pos.x + s * 100, pos.y + s * -172);
                        ctx.lineTo(pos.x + s * -100, pos.y + s * -172);
                        ctx.lineTo(pos.x + s * -200, pos.y + 0);
                        ctx.lineTo(pos.x + s * -100, pos.y + s * 172);                    
                        ctx.stroke();  
		        ctx.restore();                
                },
                drawBorder: function(){
		        ctx.save();
		        ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
		        ctx.lineWidth = VP.scale * 100;
		        ctx.lineJoin = 'round';
                
                        var level = Petri.getLevel();
                        var d = level%2;
                        var pos = mapping(1, level);
                        
                        ctx.beginPath();
		        ctx.moveTo(pos.x, pos.y);		
                        var pos = mapping(level+1, (level+d)/2);                
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(level+1, -(level-d)/2-1);
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(0, -level-1);
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(-level-1, -(level-d)/2-1);
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(-level-1, (level+d)/2);                
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(0, level+1);                
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(1, level);            
	                ctx.lineTo(pos.x, pos.y);
                        ctx.stroke();

		        ctx.restore();
                }
        };
        //Utilities
        function mapping(x, y){
                var s = VP.scale;
                var m = Math.abs(x%2);
                return {
                        x: s * x * 300,
                        y: s * -y * 344 - s * m * 172
                }
        }
        
        function visible(pos, margin){
                return (pos.x + VP.translation.ax > - margin - VP.translation.left) && (pos.x + VP.translation.ax  < VP.translation.left + margin) && (pos.y + VP.translation.ay > - margin - VP.translation.top) && (pos.y + VP.translation.ay  < VP.translation.top + margin);
        }

        
        

        
        
        
        
        return {
                init: function(){
                        var canvas = document.querySelector('#canvas');
                        
                        if(canvas.getContext)
                        {
                                ctx = canvas.getContext('2d');
                                ctx.font         = '20px Helvatica';
                                ctx.textBaseline = 'middle';
                                
                                Ctxgerm.init(ctx);
		        }
		        
		},
		draw: function(){
		
		        
		        ctx.font = '200px Helvetica';
		        
                        
		        setInterval(function(){
		        
		                var germs = Germs.getGerms();
		        
		                ctx.save();
		                VP.refresh();
		                
		                P.drawBorder();
		                
		                
		                for(var i=0,len=germs.length; i<len; i++)
		                {
		                        var pos = mapping(germs[i].x, germs[i].y);
		                        if(visible(pos, 160))
                                                Ctxgerm.draw(germs[i]);
		                }
		                
		                
		                
		                ctx.restore();
		         }, 20);
		},
		resize: function(v){
		        VP.size = v;
		        VP.translation.top = v.height/2;
		        VP.translation.left = v.width/2;
		},
		scale: function(type, e){
		
		        var d = {
		                x: e.pageX - VP.translation.ax - VP.translation.left,
		                y: e.pageY - VP.translation.ay - VP.translation.top
		        };
		        
		        if(type && VP.level > 0)//zoom in
		        {
		                VP.scale *= 1.5;
		                VP.level--;
		                
		                
		                VP.translation.ax -= d.x * 0.5;
		                VP.translation.ay -= d.y * 0.5;
		        }
		        else if(!type && VP.level < 7)
		        {
		                VP.scale *= 0.67;
		                VP.level++;
			
		                VP.translation.ax += d.x * 0.33;
		                VP.translation.ay += d.y * 0.33;
		        }
		              
		        Ctxgerm.update(VP.scale, VP.level);
		},
		translate: function(e){
		        VP.translation.ax += e.x;
		        VP.translation.ay += e.y;
		}
        };
})();

