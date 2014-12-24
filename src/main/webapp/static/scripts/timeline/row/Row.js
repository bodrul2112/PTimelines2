
define(["timeline/row/RowTab"], 
        
        function(RowTab) {

        var Row = function( _timelineKey, _timelineName, _folderPath )
        {
        	this.timelineKey = _timelineKey;
        	this.timelineName = _timelineName;
        	this.folderPath = _folderPath;
        	
        	this.element = TPL.getTemplate(".row");
        	this.tabBuffer = TPL.getTemplate(".rowTabBuffer");
        	this.rowTab = new RowTab(this.timelineKey, this.timelineName, this.folderPath);
        	
        	this.element.draggable({ axis: 'y' });
        	this.element.append(this.rowTab.getElement());
        	this.element.append(this.tabBuffer);
        	
        	
        	this.renderedEventBoxes = [];
        }
        
        Row.prototype.getTimelineKey = function()
        {
        	return this.timelineKey;
        }
        
        Row.prototype.addEventBox = function( eventBoxElement )
        {
        	this.element.append(eventBoxElement);
        	this.renderedEventBoxes.push(eventBoxElement);
        }
        
        Row.prototype.removeAllBoxes = function()
        {
        	for(var index in this.renderedEventBoxes)
        	{
        		this.renderedEventBoxes[index].remove();
        	}
        	
        	this.renderedEventBoxes = [];
        }
        
        Row.prototype.getTab = function()
        {
        	return this.rowTab;
        }
        
        Row.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return Row;
});