var Petri = (function(){

        var level = 20;
        var petri = [];

        function iter(func){
                for(var x=-level; x<level+1; x++)
                {                        
                        for(var y = Math.abs(x-x%2)*0.5 - level; y< -Math.abs((x+x%2)/2) + level + 1; y++)
                        {
                                func(x, y);
                        }
                }
        }
        
        function iterAround(x, y, func){
                var d = Math.abs(x%2);
                func(x, y+1, 0);
                func(x+1, y+d, 1);
                func(x+1, y-1+d, 2);
                func(x, y-1, 3);
                func(x-1, y-1+d, 4);
                func(x-1, y+d, 5);
        }
        
        //coord to petri dish array
        function dish(x, y, f){
                var xx = x + level;
                var yy = y - Math.abs( (x-x%2) )/2 + level;
                f(xx, yy);
        };

        //initialize the petri dish
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
                },
                register: function(germ){
                        dish(germ.x, germ.y, function(xx, yy){
                                petri[xx][yy].germ = germ;
                        });  
                },
                unregister: function(germ){
                        dish(germ.x, germ.y, function(xx, yy){
                                petri[xx][yy].germ = undefined;
                        });  
                },
                getSpace: function(x, y){
                        var free = [];
                        
                        iterAround(x, y, function(_xx, _yy, n){
                                dish(_xx, _yy, function(xx, yy){
                                        if(petri[xx] && petri[xx][yy] && !petri[xx][yy].germ)
                                                free.push(n);
                                });
                        });
                        
                        return free;
                },
                getNest: function(x, y, n){
                        var nest;
                        iterAround(x, y, function(_x, _y, _n){
                                if(n === _n)
                                        nest = { x:_x, y:_y };
                        });
                        return nest;
                }
        };
})();
