
define([], function() {

        var EventTicket = function(_timelineKey, _timelineName)
        {
        	this.timelineKey = _timelineKey;
        	this.element = TPL.getTemplate(".eventTicket");
        	
        	this.headerText = KO.observable(_timelineName);
        	this.ymd = KO.observable("yymmdd");
        	this.hms = KO.observable("hhmmss");
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
        	console.log("yo dawg");
        }
        
        EventTicket.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return EventTicket;
});