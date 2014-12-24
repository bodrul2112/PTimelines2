

define([], function() {

        var Event = function( _timelineKey, _timelineName, _eventData )
        {
        	this.timelineKey = _timelineKey;
        	this.timelineName = _timelineName;
        	this.id = _eventData.id;
        	this.filePath = _eventData.filePath;
        	
        	this._numericDate = parseInt(_eventData.date)
        	
        	var momDate = moment(_eventData.date,"YYYYMMDDHHmmss");
        	_displayDate = momDate.format("YYYY-MM-DD HH:mm:ss");
        	
        	this.date = KO.observable(_displayDate);
        	this.textContent = KO.observable(_eventData.textContent);

        	this.element = TPL.getTemplate(".event");
        	KO.applyBindings(this, this.element[0]);
        }
        
        Event.prototype.getElement = function()
        {
        	return this.element;
        }
        
        Event.prototype.getDate = function()
        {
        	return this._numericDate;
        }
        
        Event.prototype.getTimelineKey = function()
        {
        	return this.timelineKey;
        }
        
        return Event;
});