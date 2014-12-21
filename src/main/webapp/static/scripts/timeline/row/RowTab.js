
define([], function() {

        var RowTab = function(_timelineName)
        {
        	this.timelineName = _timelineName;
        	
        	this.element = TPL.getTemplate(".rowTab");
        	this.name = KO.observable(this.timelineName);
        	
        	KO.applyBindings(this, this.element[0]);
        }
        
        RowTab.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return RowTab;
});