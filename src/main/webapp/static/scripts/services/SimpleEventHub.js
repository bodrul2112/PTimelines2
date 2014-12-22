


define(["thirdparty/jquery"], function( jQuery ){
	
	
	EVT =
	{	
		mCallbacks: {},		
		EVENT_ADDED: "eventAdded",
		TIMELINE_MENU_ITEM_CLICKED: "timelineMenuItemClicked"
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



