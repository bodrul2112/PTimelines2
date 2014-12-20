

define(["timeline/row/RowTab"], function(RowTab) {

        var Row = function()
        {
        	this.element = TPL.getTemplate(".row");
        	this.element.draggable({ axis: 'y' });
        	
        	this.rowTab = new RowTab();
        	this.element.append(this.rowTab.getElement());
        	
        	window.fuckyou = this.rowTab;
        }
        
        Row.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return Row;
});