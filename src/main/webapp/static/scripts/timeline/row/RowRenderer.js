
define(["timeline/data/TimelineData", 
        "timeline/event/Event", 
        "timeline/event/EventSlot",
        "timeline/row/Row"], 
        
		function(TimelineData, Event, EventSlot, Row) {

        var RowRenderer = function()
        {
        	this.timelineData = new TimelineData();
        	this.pRows = [];
        }
        
        RowRenderer.prototype.renderTimelines = function( timelineKeys, containerElement )
        {
        	// hard coding timeline names and gets for now
        	timelineNames = ["My Timeline 1", "Another Timeline"];
        	timelineKeys = ["1","2"];
        	
        	var mEventSlots = this._createEventSlots(timelineKeys);
        	var pSortedEventSlots = this._sortEventSlots(mEventSlots);
        	
        	this._createRows(timelineKeys, containerElement, pSortedEventSlots);
        	
        	this._registerScrollListener(containerElement);
        }
        
        RowRenderer.prototype._registerScrollListener = function( containerElement )
        {
        	containerElement.on("scroll", function()
			{
				for(var index in this.pRows)
				{
					this.pRows[index].getTab().setLeft(event.srcElement.scrollLeft);
				}
				
			}.bind(this));
        }
        
        RowRenderer.prototype._createRows = function( timelineKeys, containerElement, pSortedEventSlots )
        {
        	for(var index in timelineKeys)
        	{
        		var timelineKey = timelineKeys[index];
        		var timelineName = timelineNames[index];
        		var row = new Row(timelineKey, timelineName);
        		
            	for(var index in pSortedEventSlots)
            	{
            		var eventSlot = pSortedEventSlots[index];
            		var eventBoxElement = eventSlot.getEventBox(timelineKey);
            		row.addEventBox(eventBoxElement);
            	}
            	
            	this.pRows.push(row);
        	}
        	
        	for(var index in this.pRows)
        	{
        		var row = this.pRows[index];
        		containerElement.append(row.getElement());
        	}
        	
        	for(var index in pSortedEventSlots)
        	{
        		var eventSlot = pSortedEventSlots[index];
        		eventSlot.postProcessEventBoxWidths();
        	}
        	
        }
        
        RowRenderer.prototype._sortEventSlots = function( mEventSlots )
        {
        	var pSortedEventSlots = [];
        	
        	for(var key in mEventSlots)
        	{
        		pSortedEventSlots.push(mEventSlots[key]);
        	}
        	
        	pSortedEventSlots.sort(
        			function(event_a, event_b)
        			{
        				return event_a.getDate() - event_b.getDate()
        			}
        	);
        	
        	return pSortedEventSlots;
        }
        
        RowRenderer.prototype._createEventSlots = function( timelineKeys )
        {
        	var mEventSlots = {};
        	
        	for(var index in timelineKeys)
        	{
        		var timelineKey = timelineKeys[index];
        		var timelineData = this.timelineData.getTimeline( timelineKey );
        		
        		for(var key in timelineData.events)
        		{
        			var event = new Event(timelineKey, timelineData.timelineName, timelineData.events[key]);

        			this._ensureSlot(mEventSlots, event);
        			mEventSlots[event.getDate()].addEvent(event);
        		}
        	}
        	
        	return mEventSlots;
        }
        
        RowRenderer.prototype._ensureSlot = function(mEventSlots, event)
        {
        	if(!mEventSlots[event.getDate()])
        	{
        		mEventSlots[event.getDate()] = new EventSlot(event.getDate());
        	}
        }
        
        return RowRenderer;
});