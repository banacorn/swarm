var Ctxgerm = (function(){
        var ctx;
        var scale, level;
        
        
        
        function drawSurface(pos, rad){
                var radgrad = ctx.createRadialGradient(pos.x,pos.y,VP.scale * rad * 0.1,pos.x,pos.y,VP.scale * rad * 1);
                radgrad.addColorStop(0.5, 'rgba(80, 160, 240, 0.05)');
                radgrad.addColorStop(1, 'rgba(80, 160, 240, 0.15)');

                ctx.fillStyle = radgrad;
                     
                ctx.beginPath();
                ctx.arc(
                        pos.x, 
                        pos.y, 
                        scale * rad, 0, Math.PI*2, false
                );
                ctx.fill();
        }
        
        function drawCircle(pos, rad, para){
                ctx.save();
                para = para || {};
                ctx.strokeStyle = para.style || 'rgba(200, 200, 200, 0.5)';
                ctx.lineWidth = para.width * scale || 10 * scale;
                 
                
                ctx.beginPath();
                ctx.translate(pos.x, pos.y);
                ctx.rotate(Math.PI * -0.5);
                ctx.arc(
                        0, 
                        0, 
                        rad * scale,
                        para.start * Math.PI * 2 || 0,
                        para.end * Math.PI*2 || Math.PI * 2, 
                        para.anti || false
                );
                ctx.stroke();
                ctx.restore();
        }
        
        function mapping(x, y){
                var m = x % 2;
                return {
                        x: scale * x * 300,
                        y: scale * -y * 344 + scale * m * 172
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
                
                        if(lvl <= 2)
                        {       
                                drawSurface(pos, 160);//cytoplasm
                                
                                drawCircle(pos, 20, {
                                        style: 'rgba(40, 160, 40, 0.2)',
                                        width:5,
                                        start:0,
                                        end: germ.phase/germ.cycle
                                });//cycle
                                
                                drawCircle(pos, 15, {
                                        style: 'rgba(200, 120, 40, 0.2)',
                                        width:5,
                                        start: germ.age/germ.life
                                });//life
                                
                                //nucleus
                                if(germ.type === 'eukaryote')
                                {
                                        drawSurface(pos, 80);//nucleus
                                        //drawCircle(pos, 80, { width:5 });//nuclear envelope
                                }
                        }
                        else if(lvl <= 5)
                        {
                                drawSurface(pos, 160);
                        }
                        else
                        {
                                drawSurface(pos, 160);
                        }
                
                        ctx.restore();
                },
        };
})();