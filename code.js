$(function(){

        DOM.init();
        Ctx.init();
        Ctx.draw();
});




var DOM = (function(){
        var viewport;
        
        var resize = function(f){
                $(window).resize(function(){
                        viewport = {
                                width: $(this).width(),
                                height: $(this).height()                        
                        };
                        f(viewport);
                        $('#viewport').width(viewport.width).height(viewport.height);
                        $('#canvas').attr('width', viewport.width).attr('height', viewport.height);
                }).resize();
        };
        
        var scale = function(f){
                $(window).mousewheel(function(e, delta){
                        if(delta === 1)//zoom in
                                f(true, e);
                        else if(delta === -1)//zoom out
                                f(false, e);
                });
        }
        
        var translate = function(f){
                $('#canvas').mousedown(function(e){
                        var o = { 
                                top: e.pageY,
                                left: e.pageX
                        };
                        
                        $(window).mousemove(function(e){
                                f({
                                        x: e.pageX - o.left,
                                        y: e.pageY - o.top,
                                });
                                o = {
                                        top: e.pageY,
                                        left: e.pageX                                
                                };
                        });
                }).mouseup(function(){
                        $(window).unbind('mousemove');
                });
        }
        
        return {
                init: function(){
                        resize(Ctx.resize);
                        scale(Ctx.scale);
                        translate(Ctx.translate);
                }
        };
})();

function log(s){console.log(s)};
