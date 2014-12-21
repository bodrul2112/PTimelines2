

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
	        	            	textContent: "fourth"
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