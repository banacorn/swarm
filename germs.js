var Petri = (function(){

        var level = 5;
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
                test: function(){
                        return petri;
                }
        };

})();

var Germs = (function(){

        var germs = [{
                x: 0,
                y: 5,
                type: 'prokaryote',
                life: 100,
                age: 0,
                cycle: 150,
                phase: 0,
        },{
                x: 1,
                y: 0,
                type: 'eukaryote',
                life: 400,
                age: 0,
                cycle: 50,
                phase: 0,
        },{
                x: 1,
                y: -1,
                type: 'eukaryote',
                life: 300,
                age: 0,
                cycle: 150,
                phase: 0,
        },{
                x: -2,
                y: 0,
                type: 'eukaryote',
                life: 200,
                age: 0,
                cycle: 100,
                phase: 0,
        },{
                x: 2,
                y: 0,
                type: 'eukaryote',
                life: 400,
                age: 0,
                cycle: 50,
                phase: 0,
        },{
                x: 2,
                y: -1,
                type: 'eukaryote',
                life: 300,
                age: 0,
                cycle: 150,
                phase: 0,
        },{
                x: -2,
                y: 0,
                type: 'eukaryote',
                life: 200,
                age: 0,
                cycle: 100,
                phase: 0,
        }];

        function getSpace(x, y){
                var dx, dy;
                var empty = [];
                var occupied = [false, false, false, false, false, false];
                for(var i=0, len=germs.length; i<len; i++)
                {
                        dx = germs[i].x - x;
                        dy = germs[i].y - y;
                        if(dx === 0)
                        {
                                if(dy === 1)
                                        occupied[0] = true;
                                if(dy === -1)
                                        occupied[3] = true;
                        }
                        if(dx === 1)
                        {
                                if(dy === 1)
                                        occupied[1] = true;
                                if(dy === 0)       
                                        occupied[2] = true;
                        }
                        if(dx === -1)
                        {
                                if(dy === 1)
                                        occupied[5] = true;
                                if(dy === 0)       
                                        occupied[4] = true;
                        }                
                }
                for(var i=0, len=occupied.length; i<len; i++)
                {
                        if(!occupied[i])
                                empty.push(i);
                }
                return empty;
        }
        
        function getNest(x, y, n){
                switch(n){
                        case 0:
                                return { x:x, y:y+1 };
                                break;
                        case 1:
                                return { x:x+1, y:y };
                                break;
                        case 2:
                                return { x:x+1, y:y-1 };
                                break;
                        case 3:
                                return { x:x, y:y-1 };
                                break;
                        case 4:
                                return { x:x-1, y:y-1 };
                                break;
                        case 5:
                                return { x:x-1, y:y };
                                break;
                }
        }

        function updateGerms(){
        
        
                //killing old
		for(var i=0, len=germs.length; i<len; i++)
		{
		        if(germs[i].age === germs[i].life)//DEAD
		        {
		                germs.splice(i, 1);
		                len--;
		        }
		        else
		        {
		                //fission
                                if(germs[i].phase === germs[i].cycle)
                                {
                                        germs[i].age++; 
                                        germs[i].phase = 0;                               
                                        
                                        var space = getSpace(germs[i].x, germs[i].y);
                                        var pick = space[Math.floor(Math.random() * space.length)];
                                        var nest = getNest(germs[i].x, germs[i].y, pick);
                                        
                                        /*germs.push({
                                                x: nest.x,
                                                y: nest.y,
                                                type: 'eukaryote',
                                                life: 1,
                                                age: 0,
                                                cycle: 200,
                                                phase: 0,
                                        });
                                        len++;*/
                                        
                                        //console.log(space);
                                        //console.log(  (nest.x-germs[i].x) + '  ' + (nest.y-germs[i].y) + ' pick: ' + pick);
                                }
                                else
                                {
                                        germs[i].phase++;
                                }
                        }
                        
		}
        }

        /* CLOCK */
        setInterval(function(){
                updateGerms();
        }, 20);
        
        return {
                getGerms: function(){
                        return germs;
                },
                test: function(x, y, n){
		        var a = getNest(x,y, n);
		        return a.x + '   ' + a.y;
                }
        };
})();

