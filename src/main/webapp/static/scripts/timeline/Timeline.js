
define(["timeline/row/Row", "timeline/row/RowRenderer"], function(Row, RowRenderer) {

        var Timeline = function()
        {
        	this.element = TPL.getTemplate(".main_wrapper");
        	this.rowRenderer = new RowRenderer( this.element );
        }
        
        Timeline.prototype.insertInto = function( eContainer )
        {
        	eContainer.append(this.element);
        }
        
        Timeline.prototype.insertInto = function( eContainer )
        {
        	eContainer.append(this.element);
        	
        	this.rowRenderer.renderTimelines("");
        	
//        	
//        	this.element.append(row.getElement());
//        	this.element.append(row2.getElement());
//        	
//        	
//        	// hardcoding some default positions for demo-ing
//        	row.getElement().css('top', '100px');
//        	row2.getElement().css('top', '122px');
        	
        }
        
        return Timeline;
});