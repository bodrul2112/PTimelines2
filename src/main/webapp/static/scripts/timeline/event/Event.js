

define([], function() {

        var Event = function( _timelineKey, _timelineName, _eventData )
        {
        	this.timelineKey = _timelineKey;
        	this.timelineName = _timelineName;
        	this.id = _eventData.id;
        	this.filePath = _eventData.filePath;
        	this.folderPath = _eventData.folderPath;
        	
        	this._numericDate = parseInt(_eventData.date)
        	
        	var momDate = moment(_eventData.date,"YYYYMMDDHHmmss");
        	_displayDate = momDate.format("YYYY-MM-DD HH:mm:ss");
        	
        	this.date = KO.observable(_displayDate);
        	this.textContent = KO.observable(_eventData.textContent);

        	this.element = TPL.getTemplate(".event");
        	KO.applyBindings(this, this.element[0]);
        }
        
        Event.prototype._onEditClicked = function()
        {
        	var ticket = new window.EventTicket(this.timelineKey, this.timelineName, this.folderPath, this);
        	$('body').append(ticket.getElement());
        }
        
        Event.prototype.getElement = function()
        {
        	this._rebind();
        	
        	return this.element;
        }
        
        Event.prototype.getDate = function()
        {
        	return this._numericDate;
        }
        
        Event.prototype.getFilePath = function()
        {
        	return this.filePath;
        }
        
        Event.prototype.getTextContent = function()
        {
        	return this.textContent();
        }
        Event.prototype.setTextContent = function( content )
        {
        	this.textContent( content );
        }
        
        Event.prototype.getTimelineKey = function()
        {
        	return this.timelineKey;
        }
        
        Event.prototype.getId = function()
        {
        	return this.id;
        }
        
        Event.prototype._rebind = function()
        {
        	KO.cleanNode(this.element[0])
        	KO.applyBindings(this, this.element[0]);
        }
        
        return Event;
});