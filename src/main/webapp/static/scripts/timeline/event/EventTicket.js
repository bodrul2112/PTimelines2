
define(["timeline/event/Event", "timeline/data/TimelineData"], function( Event, TimelineData ) {

        var EventTicket = function(_timelineKey, _timelineName, _folderPath)
        {
        	this.folderPath = _folderPath;
        	this.timelineData = new TimelineData();
        	
        	this.timelineKey = _timelineKey;
        	this.timelineName = _timelineName;
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
        		var _textContent = _content.trim();
        		
        		var _filePath = this.folderPath +"\\"+_isoDate+"-"+_id+".properties"; 
        		var _timelineKey = this.timelineKey;
        		var _timelineName = this.timelineName;
        		
        		var eventData =
        		{
        			id: _id,
        			date: _isoDate,
        			textContent: _textContent,
        			filePath: _filePath,
        			timelineKey: _timelineKey,
        			timelineName: _timelineName
        		}
        		
        		this.timelineData.saveEvent( eventData );
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