

define([], function() {

        var EventSlot = function( _date )
        {
        	this.date = _date;
        	this.mTimelineToEvents = [];
        	
        	this.pEventBoxes = [];
        }
        
        EventSlot.prototype.getDate = function()
        {
        	return this.date;
        }
        
        EventSlot.prototype.getElement = function()
        {
        	return this.element;
        }
        
        EventSlot.prototype.getEventBox = function( timelineKey )
        {
        	var eventBox = TPL.getTemplate(".eventBox");
        	
    		var pEvents = this.mTimelineToEvents[timelineKey];
    		for(var index in pEvents)
    		{
    			var event = pEvents[index];
    			eventBox.append(event.getElement());
    		}
        	
        	this.pEventBoxes.push(eventBox);
        	return eventBox;
        }
        
        EventSlot.prototype.postProcessEventBoxWidths = function()
        {
        	var maxWidth=0;
        	var maxHeight=0;
        	
        	for(var index in this.pEventBoxes)
        	{
        		var eventBoxElement = this.pEventBoxes[index];
        		if(eventBoxElement.width() > maxWidth)
        		{
        			maxWidth = eventBoxElement.width();
        		}
        		
        		if(eventBoxElement.height() > maxHeight)
        		{
        			maxHeight = eventBoxElement.height();
        		}
        	}
        	
        	for(var index in this.pEventBoxes)
        	{
        		var eventBoxElement = this.pEventBoxes[index];
        		eventBoxElement.width(maxWidth)
        		eventBoxElement.height(maxHeight);
        	}
        }
        
        EventSlot.prototype.addEvent = function( event )
        {
        	if(!this.mTimelineToEvents[event.getTimelineKey()])
        	{
        		this.mTimelineToEvents[event.getTimelineKey()] = [];
        	}
        	
        	this.mTimelineToEvents[event.getTimelineKey()].push(event);
        }
        
        EventSlot.prototype.deleteEntry = function( timelineKey, eventId )
        {
        	var pEvents = this.mTimelineToEvents[timelineKey];
        	
        	var newEvents = [];
        	for(var index in pEvents)
        	{
        		var event = pEvents[index];
        		if(event.getId()!=eventId)
        		{
        			newEvents.push(event);
        		}
        	}
        	
        	this.mTimelineToEvents[timelineKey] = newEvents;
        }
        
        EventSlot.prototype.numberOfEntries = function()
        {
        	var num = 0;
        	
        	for(var timelineKey in this.mTimelineToEvents)
        	{
        		var pEvents = this.mTimelineToEvents[timelineKey];
        		for(var index in pEvents)
        		{
        			num++;
        		}
        	}
        	
        	return num;
        }
        
        EventSlot.prototype.getMaxEntries = function()
        {
        	var maxNum = 0;
        	
        	for(var timelineKey in this.mTimelineToEvents)
        	{
        		var pEvents = this.mTimelineToEvents[timelineKey];
        		if(pEvents && pEvents.length>maxNum)
        		{
        			maxNum=pEvents.length;
        		}
        	}
        	
        	return maxNum;
        }
        
        return EventSlot;
});