var Germs = (function(){

        var germs = [{
                x: 0,
<<<<<<< HEAD
                y: 1,
                type: 'prokaryote',
                life: 10,
                age: 0,
                cycle: 300,
                phase: 0,
        },{
                x: 1,
=======
>>>>>>> new-branch
                y: 0,
                type: 'eukaryote',
                life: 2,
                age: 0,
                cycle: 25,
                phase: 0,
        }/*,{
                x: 1,
<<<<<<< HEAD
                y: 1,
                type: 'eukaryote',
                life: 8,
                age: 0,
                cycle: 100,
                phase: 0,
        },{
                x: 0,
                y: 0,
                type: 'eukaryote',
                life: 6,
                age: 0,
                cycle: 500,
                phase: 0,
        },{
                x: 2,
                y: 1,
                type: 'prokaryote',
                life: 10,
                age: 0,
                cycle: 60,
                phase: 0,
        },{
                x: 1,
                y: 2,
                type: 'eukaryote',
                life: 7,
                age: 0,
                cycle: 250,
                phase: 0,
        }];

        for(var i=0,len=germs.length; i<len; i++)
        {
                //Petri.register(germs[i]);
=======
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
>>>>>>> new-branch
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
<<<<<<< HEAD
        }, 100);
=======
        }, 50);
        
>>>>>>> new-branch
        
        return {
                getGerms: function(){
                        return germs;
                }
        };
})();

