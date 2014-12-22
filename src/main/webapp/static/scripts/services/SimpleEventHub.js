


define(["thirdparty/jquery"], function( jQuery ){
	
	
	EVT =
	{	
		mCallbacks: {},		
		EVENT_ADDED: "eventAdded"
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



