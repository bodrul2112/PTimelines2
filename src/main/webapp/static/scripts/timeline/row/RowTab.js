
define([], function() {

        var RowTab = function()
        {
        	this.element = TPL.getTemplate(".rowTab");
        	this.name = KO.observable("testname");
        	
        	KO.applyBindings(this, this.element[0]);
        }
        
        RowTab.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return RowTab;
});