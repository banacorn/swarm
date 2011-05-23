var Ctxgerm = (function(){
        var ctx;
        var scale, level;
        
        
        
        function drawCircle(pos, rad, width, style, start, end, anticounter){             
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
        }
        
        function drawSurface(pos, rad){
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
        }
                
        function cellMembrane(pos){
                drawCircle(pos, 160, 10);
        }
        function nuclearEnvelope(pos){
                drawCircle(pos, 80, 10);
        }
        function phaseRing(pos, phase){
                drawCircle(pos, 60, 10, 'rgba(200, 200, 240, 0.5)', 0, phase);
        }
        function ageRing(pos, age){
                drawCircle(pos, 40, 10, 'rgba(200, 160, 160, 0.5)', age);
        }
        
        function mapping(x, y){
                var s = VP.scale;
                var m = x % 2;
                return {
                        x: s * x * 300,
                        y: s * -y * 344 + s * m * 172
                }
        }
        
        return {
                init: function(_ctx){
                        ctx = _ctx;
                },
                update: function(_scale, _level){
                        scale = _scale;
                        level = _level;
                },
                draw: function(germ){
                        var s = VP.scale;
                        var lvl = VP.level;
                        var pos = mapping(germ.x, germ.y);
                
                        ctx.save();
                
                        //scaling.level
                        if(lvl <= 2)
                        {
                                drawSurface(pos, 160);
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
                        else if(lvl <= 5)
                        {
                                //cell membrane
                                drawSurface(pos, 80);
                                drawSurface(pos, 160);
                        }
                        else
                        {
                                //cell membrane
                                drawSurface(pos, 160);
                        }
                
                        ctx.restore();
                },
        };
})();
