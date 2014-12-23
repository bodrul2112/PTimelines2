
define(["timeline/data/TimelineData", "timeline/menu/TimelineButton"], function( TimelineData, TimelineButton ) {

        var TimelineMenu = function()
        {
        	this.timelineData = new TimelineData();
        	
        	this.element = TPL.getTemplate(".timelineMenu");
        	this.eLoaded = this.element.find('.timelineNames .loaded');
        	this.eNotLoaded = this.element.find('.timelineNames .notLoaded')
        	
        	KO.applyBindings(this, this.element[0]);
        	$('body').append(this.element);
        	
        	this.pButtons = [];
        	
        	this.mTimelineData = {};
        	
        	
        	this.loadMenuItems(this.timelineData.getTimelineNames());
        	EVT.subscribe(EVT.TIMELINE_MENU_ITEM_CLICKED, this._onTimelineLoadedCallback.bind(this));
        }
        
        TimelineMenu.prototype._onCreateTimelineClicked = function()
        {
        	console.log("yo");
        }
        
        TimelineMenu.prototype._onTimelineLoadedCallback = function( timelineButton )
        {
        	timelineButton.getElement().remove();
        	
        	var timelineKey = timelineButton.getTimelineKey();
        	if(this.mTimelineData.loaded[timelineKey])
        	{
        		var store = this.mTimelineData.loaded[timelineKey];
        		delete this.mTimelineData.loaded[timelineKey];
        		this.mTimelineData.notLoaded[timelineKey] = store;
        		this.eNotLoaded.append(timelineButton.getElement());
        	}
        	else
        	{
        		var store = this.mTimelineData.notLoaded[timelineKey];
        		delete this.mTimelineData.notLoaded[timelineKey];
        		this.mTimelineData.loaded[timelineKey] = store;
        		this.eLoaded.append(timelineButton.getElement());
        	}
        	
        	timelineButton._rebind();
        	
        	EVT.publish(EVT.RE_RENDER, this.mTimelineData.loaded);
        }
        
        TimelineMenu.prototype.loadMenuItems = function( _mTimelineData )
        {
        	this.mTimelineData = _mTimelineData;
        	
        	var loadedTimelines = _mTimelineData.loaded;
        	var notLoadedTimelines = _mTimelineData.notLoaded;
        	
        	for(var timelineKey in loadedTimelines)
        	{
        		var timelineName = loadedTimelines[timelineKey].timelineName;
        		var button = new TimelineButton(timelineKey, timelineName, true);
        		
        		this.eLoaded.append(button.getElement());
        	}
        	
        	for(var timelineKey in notLoadedTimelines)
        	{
        		var timelineName = notLoadedTimelines[timelineKey].timelineName;
        		var button = new TimelineButton(timelineKey, timelineName, false);
        		
        		this.eNotLoaded.append(button.getElement());
        	}
        }
        
        TimelineMenu.prototype.getElement = function()
        {
        	return this.element;
        }
        
        TimelineMenu.prototype.setLeft = function( val )
        {
        	this.leftPosition(val + "px");
        }
        
        return TimelineMenu;
});