var Germs = (function(){

        var germs = [{
                x: 0,
                y: 0,
                type: 'prokaryote',
                life: 50,
                age: 0,
                cycle: 20,
                phase: 0,
        },{
                x: 0,
                y: 1,
                type: 'eukaryote',
                life: 25,
                age: 0,
                cycle: 50,
                phase: 0,
        }];

        function updateGerms(){
		for(var i=0, len=germs.length; i<len; i++)
		{
		        if(germs[i].age === germs[i].life)
		        {
		                germs.splice(i, 1);
		                return;
		        }
		        
		
		        germs[i].phase++;
                        if(germs[i].phase === germs[i].cycle)
                        {
                                germs[i].phase = 0;
                                germs[i].age++;
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
                test: function(){
                        return clock.time;
                }
        };
})();

