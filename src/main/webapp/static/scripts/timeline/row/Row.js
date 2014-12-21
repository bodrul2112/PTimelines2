
define(["timeline/row/RowTab", 
        "timeline/data/TimelineData",
        "timeline/event/Event"], 
        
        function(RowTab, TimelineData, Event) {

        var Row = function( _timelineName )
        {
        	this.timelineName = _timelineName;
        	this.element = TPL.getTemplate(".row");
        	this.rowTab = new RowTab(this.timelineName);
        	this.timelineData = new TimelineData();
        	
        	this.element.draggable({ axis: 'y' });
        	this.element.append(this.rowTab.getElement());
        	
        	this.pEvents = [];
        	
        	this._addEvents();
        }
        
        Row.prototype._addEvents = function()
        {
        	var events = this.timelineData.getEvents( this.timelineName );
        	
        	for(var key in events)
        	{
        		var eventData = events[key];
        		var event = new Event(eventData);
        		
        		this.pEvents.push(event);
        		
        		this.element.append(event.getElement());
        	}
        }
        
        Row.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return Row;
});