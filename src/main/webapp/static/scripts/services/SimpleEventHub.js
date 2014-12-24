


define(["thirdparty/jquery"], function( jQuery ){
	
	
	EVT =
	{	
		mCallbacks: {},		
		EVENT_ADDED: "eventAdded",
		TIMELINE_MENU_ITEM_CLICKED: "timelineMenuItemClicked",
		TIMELINE_ADDED: "timelineAdded",
		RE_RENDER: "reRender",
		RE_RENDER_MENU: "reRenderMenu",
		TIMELINE_DATA_RECEIVED: "timelineDataReceived"
		
	}
	
	EVT.subscribe = function( eventName, callback )
	{
		EVT.mCallbacks[eventName] = callback;
	}
	
	EVT.publish = function( eventName, data )
	{
		EVT.mCallbacks[eventName](data);
	}

	return EVT; 
	
});



