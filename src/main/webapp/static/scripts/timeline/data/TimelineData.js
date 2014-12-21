

define([], function() {

        var TimelineData = function()
        {
        	this.mockEventData = [
        	              {
        	            	date: 20150101121212,
        	            	textContent: "something happened here"
        	              },
        	              {
          	            	date: 20150102121212,
          	            	textContent: "something happened here 2"
          	              },
          	              {
        	            	date: 20150103121212,
        	            	textContent: "something happened here 3"
        	              },
        	              {
          	            	date: 20150101121212,
          	            	textContent: "something happened here"
          	              },
          	              {
        	            	date: 20150102121212,
        	            	textContent: "something happened here 2"
        	              },
        	              {
          	            	date: 20150103121212,
          	            	textContent: "something happened here 3"
          	              }
        	              ];
        }
        
        TimelineData.prototype.getEvents = function( timelineName )
        {
        	return this.mockEventData;
        }
        
        return TimelineData;
});