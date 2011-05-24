var Petri = (function(){

        var level = 20;
        var petri = [];

        var iter = function(func){
                var d;
                for(var x=-level; x<level+1; x++)
                {
                        d = -(x%2)/2;
                        
                        for(var y = Math.abs(x)*0.5 - level - d; y< -Math.abs(x)*0.5 + level - d + 1; y++)
                        {
                                func(x, y);
                        }
                }
        };
        
        var dish = function(x, y, f){
                var xx = x + level;
                var yy = y - Math.abs(x)*0.5 + level - (x%2)/2;
                f(xx, yy);
        };

        iter(function(x, y){        
                dish(x, y, function(xx, yy){
                        if(petri[xx] === undefined)
                                petri[xx] = [];
                                
                        petri[xx][yy] = {
                                germ: undefined,
                                nutrition: 0,
                                waste: 0
                        };
                });
        });
        return {
                iter: iter,
                getLevel: function(){
                        return level;
                }/*,
                register: function(germ){
                        dish(germ.x, germ.y, function(x, y){
                                petri[x][y].germ = germ;
                        });
                },
                unregister: function(){
                
                },
                test: function(x, y){
                        dish(x, y, function(_x, _y){
                                console.log(petri[_x][_y].germ);
                        });
                }*/
        };

})();
