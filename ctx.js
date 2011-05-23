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
                        var pos = mapping(1, level+1);
                        
                        ctx.beginPath();
		        ctx.moveTo(pos.x, pos.y);		
                        var pos = mapping(level+1, (level-d)/2+1);                
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(level+1, -(level-d)/2);
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(0, -level-1);
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(-level-1, -(level-d)/2-1);
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(-level-1, (level-d)/2);                
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(0, level+1);                
	                ctx.lineTo(pos.x, pos.y);	        
                        var pos = mapping(1, level+1);            
	                ctx.lineTo(pos.x, pos.y);
                        ctx.stroke();

		        ctx.restore();
                }
        };
        
        //Germs
        G = {
                draw: function(germ){
                        var s = VP.scale;
                        var lvl = VP.level;
                        var pos = mapping(germ.x, germ.y);
                
                        ctx.save();
                
                        //scaling.level
                        if(lvl <= 2)
                        {
                                this.drawSurface(pos, 160);
                                //cell membrane
                                this.cellMembrane(pos);
                                
                                
                                //nucleus
                                if(germ.type === 'eukaryote')
                                {
                                        this.nuclearEnvelope(pos);
                                }
                                
                                this.phaseRing(pos, germ.phase/germ.cycle);
                                this.ageRing(pos, germ.age/germ.life);
                        }
                        else if(lvl <= 5)
                        {
                                //cell membrane
                                this.drawSurface(pos, 80);
                                this.drawSurface(pos, 160);
                        }
                        else
                        {
                                //cell membrane
                                this.drawSurface(pos, 160);
                        }
                
                        ctx.restore();
                },
                drawCircle: function(pos, rad, width, style, start, end, anticounter){             
                        ctx.strokeStyle = style || 'rgba(200, 200, 200, 0.5)';
                        ctx.lineWidth = VP.scale * width;                
                        ctx.beginPath();
                        ctx.arc(
                                pos.x, 
                                pos.y, 
                                VP.scale * rad, 
                                start * Math.PI * 2 + Math.PI * -0.5 || Math.PI * -0.5, 
                                end * Math.PI * 2 + Math.PI * -0.5 || Math.PI * 1.5,
                                false
                        );
                        ctx.stroke();
                },
                drawSurface: function(pos, rad){
                        var radgrad = ctx.createRadialGradient(pos.x,pos.y,VP.scale * rad * 0.1,pos.x,pos.y,VP.scale * rad * 0.5);
                        radgrad.addColorStop(0, 'rgba(80, 160, 240, 0.1)');
                        radgrad.addColorStop(0.9, 'rgba(80, 160, 240, 0.2)');
 
                        ctx.fillStyle = radgrad;
                             
                        ctx.beginPath();
                        ctx.arc(
                                pos.x, 
                                pos.y, 
                                VP.scale * rad, 0, Math.PI*2, false
                        );
                        ctx.fill();
                },
                cellMembrane: function(pos){
                        this.drawCircle(pos, 160, 10);
                },
                nuclearEnvelope: function(pos){
                        this.drawCircle(pos, 80, 10);
                },
                phaseRing: function(pos, phase){
                        this.drawCircle(pos, 60, 10, 'rgba(200, 200, 240, 0.5)', 0, phase);
                },
                ageRing: function(pos, age){
                        this.drawCircle(pos, 40, 10, 'rgba(200, 160, 160, 0.5)', age);
                }
        };
        
        //Utilities
        
        function mapping(x, y){
                var s = VP.scale;
                var m = x % 2;
                return {
                        x: s * x * 300,
                        y: s * -y * 344 + s * m * 172
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
                                        G.draw(germs[i]);
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
		},
		translate: function(e){
		        VP.translation.ax += e.x;
		        VP.translation.ay += e.y;
		}
        };
})();

