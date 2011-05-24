var Germs = (function(){

        var germs = [{
                x: 0,
                y: 1,
                type: 'prokaryote',
                life: 10,
                age: 0,
                cycle: 300,
                phase: 0,
        },{
                x: 1,
                y: 0,
                type: 'eukaryote',
                life: 4,
                age: 0,
                cycle: 50,
                phase: 0,
        },{
                x: 1,
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
        }, 100);
        
        return {
                getGerms: function(){
                        return germs;
                }
        };
})();

