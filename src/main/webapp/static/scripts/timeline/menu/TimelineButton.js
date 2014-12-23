
define([], function() {

        var TimelineButton = function( _timelineKey, _timelineName, isLoaded )
        {
        	this.isLoaded = KO.observable(isLoaded);
        	
        	this.timelineKey = _timelineKey;
        	this.timelineName = KO.observable(_timelineName);
        	
        	this.element = TPL.getTemplate(".timelineButton");
        	
        	KO.applyBindings(this, this.element[0]);
        }
        
        TimelineButton.prototype.getElement = function()
        {
        	return this.element;
        }
        
        TimelineButton.prototype.getTimelineKey = function()
        {
        	return this.timelineKey;
        }
        
        TimelineButton.prototype._onTimelineClicked = function()
        {
        	if(this.isLoaded()) {
        		this.isLoaded(false);
        	}
        	else {
        		this.isLoaded(true);
        	}
        	
        	EVT.publish(EVT.TIMELINE_MENU_ITEM_CLICKED, this);
        }
        
        TimelineButton.prototype._rebind = function()
        {
        	KO.cleanNode(this.element[0])
        	KO.applyBindings(this, this.element[0]);
        }
        
        return TimelineButton;
});