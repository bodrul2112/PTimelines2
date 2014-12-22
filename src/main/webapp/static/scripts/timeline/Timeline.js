
define(["timeline/row/Row", 
        "timeline/row/RowRenderer",
        "timeline/data/TimelineData",
        "timeline/menu/TimelineMenu"], 
        
        function(Row, RowRenderer, TimelineData, TimelineMenu) {

        var Timeline = function()
        {
        	this.element = TPL.getTemplate(".main_wrapper");
        	this.rowRenderer = new RowRenderer( this.element );
        	this.timelineData = new TimelineData();
        	this.timelineMenu = new TimelineMenu();
        }
        
        Timeline.prototype.insertInto = function( eContainer )
        {
        	eContainer.append(this.element);
        }
        
        Timeline.prototype.insertInto = function( eContainer )
        {
        	eContainer.append(this.element);
        	
        	this.rowRenderer.renderTimelines(this.timelineData.getTimelineNames().loaded);
        	
//        	row.getElement().css('top', '100px');
//        	row2.getElement().css('top', '122px');
        	
        }
        
        return Timeline;
});