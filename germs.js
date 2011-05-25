var Germs = (function(){

        var germs = [{
                x: 0,
                y: 0,
                type: 'eukaryote',
                life: 2,
                age: 0,
                cycle: 25,
                phase: 0,
        }/*,{
                x: 1,
                y: 0,
                type: 'prokaryote',
                life: 10,
                age: 0,
                cycle: 50,
                phase: 0,
        }*/];

        for(var i=0,len=germs.length; i<len; i++)
        {
                Petri.register(germs[i]);
        }

        function updateGerms(){
        
        
                //killing old
		for(var i=0, len=germs.length; i<len; i++)
		{
		        if(germs[i].phase === germs[i].cycle)
		        {
                                germs[i].age++; 
                                germs[i].phase = 0;                               
                                        
                                var space = Petri.getSpace(germs[i].x, germs[i].y);
                                if(space.length !== 0)
                                {
                                        var nest = Petri.getNest(germs[i].x, germs[i].y, space[Math.floor(Math.random()*space.length)]);
                                                
                                                           
                                        germs.push({
                                                x: nest.x,
                                                y: nest.y,
                                                type: 'eukaryote',
                                                life: 2,
                                                age: 0,
                                                cycle: 25,
                                                phase: 0,
                                        });
                                        len++;                                  
                                                
                                        Petri.register(germs[germs.length-1]);
                                }
                                
                                if(germs[i].age === germs[i].life)
                                {                                       
		                        Petri.unregister(germs[i]);
		                        germs.splice(i, 1);
		                        len--;  
                                }
                        }
                        else
                        {
                                if(germs[i].age === germs[i].life)
                                {                                       
		                        Petri.unregister(germs[i]);
		                        germs.splice(i, 1);
		                        len--;  
                                }
                                germs[i].phase++;
                        }
                        
		}
        }

        /* CLOCK */
        setInterval(function(){
                updateGerms();
        }, 50);
        
        
        return {
                getGerms: function(){
                        return germs;
                }
        };
})();

