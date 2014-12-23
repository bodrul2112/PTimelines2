
define(["timeline/data/TimelineData", 
        "timeline/event/Event", 
        "timeline/event/EventSlot",
        "timeline/row/Row"], 
        
		function(TimelineData, Event, EventSlot, Row) {

        var RowRenderer = function( _containerElement )
        {
        	this.timelineData = new TimelineData();
        	this.pRows = [];
        	this.containerElement = _containerElement;
        	
        	this.pSortedEventSlots = [];
        	
        	// hard coding timeline names and gets for now
//        	this.renderedTimelineNames = ["My Timeline 1", "Another Timeline"];
//        	this.renderedTimelineKeys = ["1","2"];
        	this.mTimelines = {};
        	
        	this._registerScrollListener();
        	
        	EVT.subscribe(EVT.EVENT_ADDED, this._onEventAdded.bind(this));
        	EVT.subscribe(EVT.RE_RENDER, this.renderTimelines.bind(this));
        }
        
        RowRenderer.prototype.renderTimelines = function( _mTimelines )
        {
        	this.mTimelines = _mTimelines;
        	
        	this._clearDownAllRows();
        	
        	var mEventSlots = this._createEventSlots();
        	this.pSortedEventSlots = this._sortEventSlots(mEventSlots);
        	
        	this._createRows();
        }
        
        RowRenderer.prototype._clearDownAllRows = function() {
        	for(var index in this.pRows){
        		this.pRows[index].getElement().remove();
        	}
        	this.pRows = [];
        	this.pSortedEventSlots = [];
		}        
        
        RowRenderer.prototype._onEventAdded = function( event )
        {
        	var added = false;
        	for(var index in this.pSortedEventSlots)
        	{
        		if(this.pSortedEventSlots[index].getDate() == event.getDate())
        		{
        			this.pSortedEventSlots[index].addEvent(event);
        			added = true;
        		}
        	}
        	
        	if(!added)
        	{
        		var eventSlot = new EventSlot(event.getDate());
        		eventSlot.addEvent(event);
        		this.pSortedEventSlots.push(eventSlot);
        	}
        	
        	this.pSortedEventSlots.sort(this._eventSortFunction);
        	
        	this._clearRows();
        	this._addEventsToRows();
        	this._configureBoxSizes();
        }
        
        RowRenderer.prototype._registerScrollListener = function()
        {
        	this.containerElement.on("scroll", function()
			{
				for(var index in this.pRows)
				{
					this.pRows[index].getTab().setLeft(event.srcElement.scrollLeft);
				}
				
			}.bind(this));
        }
        
        RowRenderer.prototype._createRows = function( )
        {
        	this._addEventsToRows();
        	this._addRowsToTimeline();
        }
        
        RowRenderer.prototype._getOrCreateRow = function( timelineKey, timelineName )
        {
        	for(var index in this.pRows)
        	{
        		if(this.pRows[index].getTimelineKey() == timelineKey)
        		{
        			return this.pRows[index];
        		}
        	}
        	
        	var row = new Row(timelineKey, timelineName);
        	this.pRows.push(row);
        	return row;
        }
        
        RowRenderer.prototype._addEventsToRows = function( )
        {
        	for(var timelineKey in this.mTimelines)
        	{
        		var timelineName = this.mTimelines[timelineKey].timelineName;
        		var row = this._getOrCreateRow(timelineKey, timelineName);
        		
            	for(var index in this.pSortedEventSlots)
            	{
            		var eventSlot = this.pSortedEventSlots[index];
            		var eventBoxElement = eventSlot.getEventBox(timelineKey);
            		row.addEventBox(eventBoxElement);
            	}
        	}
        }
        
        RowRenderer.prototype._addRowsToTimeline = function()
        {
        	for(var index in this.pRows)
        	{
        		var row = this.pRows[index];
        		this.containerElement.append(row.getElement());
        	}
        	
        	this._configureBoxSizes();
        }
        
        RowRenderer.prototype._configureBoxSizes = function()
        {
        	for(var index in this.pSortedEventSlots)
        	{
        		var eventSlot = this.pSortedEventSlots[index];
        		eventSlot.postProcessEventBoxWidths();
        	}
        }
        
        RowRenderer.prototype._clearRows = function( )
        {
        	for(var index in this.pRows)
        	{
        		this.pRows[index].removeAllBoxes();
        	}
        }
        
        RowRenderer.prototype._sortEventSlots = function( mEventSlots )
        {
        	var pSortedEventSlots = [];
        	
        	for(var key in mEventSlots)
        	{
        		pSortedEventSlots.push(mEventSlots[key]);
        	}
        	
        	pSortedEventSlots.sort(this._eventSortFunction);
        	
        	return pSortedEventSlots;
        }
        
        RowRenderer.prototype._eventSortFunction = function(event_a, event_b)
		{
			return event_a.getDate() - event_b.getDate();
		}
        
        RowRenderer.prototype._createEventSlots = function()
        {
        	var mEventSlots = {};
        	
        	for(var timelineKey in this.mTimelines)
        	{
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