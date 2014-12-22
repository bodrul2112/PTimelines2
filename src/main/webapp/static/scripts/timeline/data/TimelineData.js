

define([], function() {

        var TimelineData = function()
        {
        	this.mockData= { 
        				  "1": { 
        				  "timelineName" : "My Timeline 1",
        				  "events" : [
	        	              {
	        	            	id: "1",
	        	            	date: 20150101121212,
	        	            	textContent: "first"
	        	              },
	        	              {
	        	            	id: "2",  
	          	            	date: 20150101121212,
	          	            	textContent: "secons"
	          	              },
	          	              {
	          	            	id: "3",
	        	            	date: 20150104121212,
	        	            	textContent: "fourth Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	        	              }
	          	              ]
        				  },
        				  
          	              "2": {
          	              "timelineName" : "Another Line",
          				  "events" : [
	        	              {
	        	            	id: "4",
	          	            	date: 20150103121212,
	          	            	textContent: "third"
	          	              },
	          	              {
	          	            	id: "5",
	        	            	date: 20150105121212,
	        	            	textContent: "fifth"
	        	              },
	        	              {
	        	            	id: "6",
	          	            	date: 20150106121212,
	          	            	textContent: "6th"
	          	              }
	        	              ]
          	              }
        	}
        }
        
        TimelineData.prototype.getTimeline = function( timelineKey )
        {
        	return this.mockData[timelineKey];
        }
        
        return TimelineData;
});