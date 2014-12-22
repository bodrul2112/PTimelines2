
define([], function() {

        var RowTab = function(_timelineName)
        {
        	this.timelineName = _timelineName;
        	
        	this.element = TPL.getTemplate(".rowTab");
        	this.name = KO.observable(this.timelineName);
        	
        	this.leftPosition = KO.observable("0px");
        	
        	KO.applyBindings(this, this.element[0]);
        }
        
        RowTab.prototype._onPlusClicked = function()
        {
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