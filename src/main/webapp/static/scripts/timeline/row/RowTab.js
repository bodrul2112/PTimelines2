
define(["timeline/event/EventTicket"], function( EventTicket ) {

        var RowTab = function(_timelineKey, _timelineName, _folderPath)
        {
        	this.timelineKey = _timelineKey;
        	this.timelineName = _timelineName;
        	this.folderPath =_folderPath;
        	
        	this.element = TPL.getTemplate(".rowTab");
        	this.name = KO.observable(this.timelineName);
        	
        	this.leftPosition = KO.observable("0px");
        	
        	KO.applyBindings(this, this.element[0]);
        }
        
        RowTab.prototype._onPlusClicked = function()
        {
        	var ticket = new EventTicket(this.timelineKey, this.timelineName, this.folderPath);
        	$('body').append(ticket.getElement());
        }
        
        RowTab.prototype.getElement = function()
        {
        	return this.element;
        }
        
        RowTab.prototype.setLeft = function( val )
        {
        	this.leftPosition(val + "px");
        }
        
        return RowTab;
});