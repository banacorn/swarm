var Germs = (function(){

        var germs = [{
                type: 'blau',
                x: 0,
                y: 0,
                life: 10,
                cycle: 30,
                phase: 0,
        },{
                type: 'gruen',
                x: 1,
                y: 1,
                life: 5,
                cycle: 50,
                phase: 0,
        },{
                type: 'gruen',
                x: 1,
                y: 2,
                life: 15,
                cycle: 50,
                phase: 0,
        },{
                type: 'blau',
                x: 0,
                y: 1,
                life: 12,
                cycle: 50,
                phase: 0,
        }];

        function updateGerms(){
		for(var i=0, len=germs.length; i<len; i++)
		{
		        if(germs[i].life === 0)
		        {
		                germs.splice(i, 1);
		                return;
		        }
		        
		
		        germs[i].phase++;
                        if(germs[i].phase === germs[i].cycle)
                        {
                                germs[i].phase = 0;
                                germs[i].life--;
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

