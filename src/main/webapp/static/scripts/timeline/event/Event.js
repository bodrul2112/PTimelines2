

define([], function() {

        var RowTab = function( _eventData )
        {
        	this.date = KO.observable(""+_eventData.date);
        	this.textContent = KO.observable(""+_eventData.textContent);

        	this.element = TPL.getTemplate(".event");
        	KO.applyBindings(this, this.element[0]);
        }
        
        RowTab.prototype.getElement = function()
        {
        	return this.element;
        }
        
        return RowTab;
});