
define(["timeline/event/Event", "timeline/data/TimelineData"], function( Event, TimelineData ) {

        var EventTicket = function(_timelineKey, _timelineName)
        {
        	this.timelineData = new TimelineData();
        	
        	this.timelineKey = _timelineKey;
        	this.element = TPL.getTemplate(".eventTicket");
        	
        	this.headerText = KO.observable(_timelineName);
        	this.ymd = KO.observable("20120101");
        	this.hms = KO.observable("121212");
        	this.content = KO.observable("");
        	KO.applyBindings(this, this.element[0]);
        	
        	this.element.draggable();
        }
        
        EventTicket.prototype._onCloseClicked = function()
        {
        	this.element.remove();
        }
        
        EventTicket.prototype._onDoneClicked = function()
        {
        	this.element.focus();// otherwise the val of content is still empty
        	
        	var _ymd = this.ymd().trim();
        	var _hms = this.hms().trim();
        	var _content = this.element.find('.content').val().trim();
        	
        	if(_ymd.length > 0 && _hms.length>0 && _content.length>0)
        	{
        		var _id = new Date().getTime();
        		var _isoDate = parseInt(this.ymd().trim()+this.hms().trim());
        		var _textContent = this.content().trim();
        		
        		var eventData =
        		{
        			id: _id,
        			date: _isoDate,
        			textContent: _textContent
        		}
        		
        		this.timelineData.saveEvent( this.timelineKey, this.headerText(), eventData );
        		this.element.remove();
        	}
        	else
        	{
        		alert("fill in all da boxes");
        	}
        }
        
        EventTicket.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return EventTicket;
});