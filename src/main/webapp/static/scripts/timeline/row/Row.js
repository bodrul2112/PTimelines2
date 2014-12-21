
define(["timeline/row/RowTab"], 
        
        function(RowTab) {

        var Row = function( _timelineKey, _timelineName )
        {
        	this.timelineName = _timelineName;
        	this.timelineKey = _timelineKey;
        	
        	this.element = TPL.getTemplate(".row");
        	this.tabBuffer = TPL.getTemplate(".rowTabBuffer");
        	this.rowTab = new RowTab(this.timelineName);
        	
        	this.element.draggable({ axis: 'y' });
        	this.element.append(this.rowTab.getElement());
        	this.element.append(this.tabBuffer);
        	
        }
        
        Row.prototype.addEventBox = function( eventBoxElement )
        {
        	this.element.append(eventBoxElement);
        }
        
        Row.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return Row;
});