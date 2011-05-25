var Spr = (function(){
        var spr;
        var size = {
                width: 600,
                height: 600
        };
        
        function drawSurface(rad){
                var radgrad = spr.createRadialGradient(rad, rad, rad * 0.1, rad, rad, rad * 1);
                radgrad.addColorStop(0.5, 'rgba(80, 160, 240, 0.05)');
                radgrad.addColorStop(1, 'rgba(80, 160, 240, 0.15)');

                spr.fillStyle = radgrad;
                     
                spr.beginPath();
                spr.arc(
                        rad, 
                        rad, 
                        rad, 0, Math.PI*2, false
                );
                spr.fill();
        }
        return {
                init: function(){
                
                        var sprite = document.querySelector('#sprite');
                        
                        if(sprite.getContext)
                        {
                                spr = sprite.getContext('2d');
                                spr.font         = '20px Helvatica';
                                spr.textBaseline = 'middle';
                                
                                $(sprite).attr('width', 600).attr('height', 600);
		        }
                }, 
                drawSurface: function(rad){
                
                        //check if the size is big enough
                        if(rad*2 > size.width || rad*2 > size.width)
                                size = { width: rad*2, height: rad*2 };
                        spr.clearRect(0, 0, rad*2, rad*2);
                        drawSurface(rad);
                        
                        return true;
                }
        };
})();
