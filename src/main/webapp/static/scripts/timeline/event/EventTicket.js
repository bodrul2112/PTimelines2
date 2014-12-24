
define(["timeline/data/TimelineData"], function( TimelineData ) {

        var EventTicket = function(_timelineKey, _timelineName, _folderPath, event)
        {
        	this.folderPath = _folderPath;
        	this.timelineData = new TimelineData();
        	
        	this.oldEvent = event;
        	
        	this.timelineKey = _timelineKey;
        	this.timelineName = _timelineName;
        	this.element = TPL.getTemplate(".eventTicket");
        	
        	this.headerText = KO.observable(_timelineName);
        	this.isEdit = false;
        	
        	if(event)
        	{
        		var _ymdhms = "" + event.getDate();
        		this.ymd = KO.observable( _ymdhms.substring(0,8));
        		this.hms = KO.observable( _ymdhms.substring(8,14));
        		this.content = KO.observable( event.getTextContent() );
        		this.isEdit=true;
        	}
        	else
        	{
        		this.ymd = KO.observable("yyyymmdd");
        		this.hms = KO.observable("000000");
        		this.content = KO.observable("");
        	}
        	
        	// clicking on the ticket and getting the value off the knockout
        	// property sometimes returns the old value...so just gonna use
        	// jquery to get the vals
        	this.contentElement = this.element.find('.content');
        	this.ymdElement = this.element.find('.ymd');
        	this.hmsElement = this.element.find('.hms');
        	
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
        	
        	var _ymd = this.ymdElement.val().trim();
        	var _hms = this.hmsElement.val().trim();
        	var _content = this.contentElement.val().trim();
        	
        	if(_ymd.length > 0 && _hms.length>0 && _content.length>0)
        	{
        		var _id = new Date().getTime();
        		var _isoDate = parseInt(_ymd+_hms);
        		var _textContent = _content.trim();
        		
        		var _filePath = this.folderPath +"\\"+_isoDate+"-"+_id+".properties"; 
        		var _timelineKey = this.timelineKey;
        		var _timelineName = this.timelineName;
        		var _folderPath = this.folderPath;
        		
        		
        		var eventData =
        		{
        			id: _id,
        			date: _isoDate,
        			textContent: _textContent,
        			filePath: _filePath,
        			folderPath: _folderPath,
        			timelineKey: _timelineKey,
        			timelineName: _timelineName
        		}
        		
        		if(this.isEdit)
        		{
        			eventData["isEdit"] = true;
        			
        			if(this.oldEvent.getDate() != _isoDate)
        			{
        				eventData["deleteOld"] = true;
        				eventData["oldFilePath"] =  this.oldEvent.getFilePath();
        				eventData["oldTimelineKey"] =  this.oldEvent.getTimelineKey();
        				eventData["oldId"] =  this.oldEvent.getId();
        				eventData["oldDate"] =  this.oldEvent.getDate();
        			}
        			else
        			{
        				eventData["id"] = this.oldEvent.getId();
        				eventData["filePath"] = this.oldEvent.getFilePath();
        				
        				this.oldEvent.setTextContent(_textContent);
        			}
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
        
        // cant seem to load this class in Event.js
        // so hacking it instead, need to look into what is going on here
        // but it's xmas eve and it's probably a circular dependency or something that i'm just not seeing Q_Q
        window.EventTicket = EventTicket;
        
        return EventTicket;
});