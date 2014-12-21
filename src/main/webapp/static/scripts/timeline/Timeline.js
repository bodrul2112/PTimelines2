
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
        	
        	var row = new Row("My Timeline");
        	var row2 = new Row("Another Line");
        	
        	this.element.append(row.getElement());
        	this.element.append(row2.getElement());
        	
        	
        	
        	// hardcoding some default positions for demo-ing
        	row.getElement().css('top', '100px');
        	row2.getElement().css('top', '122px');
        	
        	
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