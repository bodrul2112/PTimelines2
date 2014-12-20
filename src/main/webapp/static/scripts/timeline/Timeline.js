
define(["timeline/row/Row"], function(Row) {

        var Timeline = function()
        {
        	this.element = TPL.getTemplate(".main_wrapper");
//        	this.eventElement = TPL.getTemplate(".event");
        }
        
        Timeline.prototype.insertInto = function( eContainer )
        {
        	eContainer.append(this.element);
        }
        
        Timeline.prototype.insertInto = function( eContainer )
        {
        	eContainer.append(this.element);
        	
        	var row = new Row();
        	
        	this.element.append(row.getElement());
        	
        	
//        	var viewModel =  function() {
//        			this.textContent = KO.observable("Bob")
//        		};
//        	
//        	KO.applyBindings(viewModel, this.eventElement[0]);
////        	
//        	this.eventElement.draggable();
////        	
//        	this.element.append(this.eventElement);
        }
        
        return Timeline;
});