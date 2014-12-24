

define(["timeline/event/Event"], function(Event) {

        var TimelineData = function()
        {
        	
        	this.mockTimelineMap = {
        		
        			loaded: {
            			"1" : {
            				"timelineName": "My Timeline 1"
            			},
            			"2" : {
            				"timelineName": "Another Timeline"
            			}
        			},
        			
        			notLoaded: {
            			"3" : {
            				"timelineName": "3rd Timeline"
            			},
            			"4" : {
            				"timelineName": "4th Timeline"
            			}
        			}

        	}
        	
        	this.mockData= { 
        				  "1": { 
        				  "timelineName" : "My Timeline 1",
        				  "events" : [
	        	              {
	        	            	id: "1",
	        	            	date: 20150101121212,
	        	            	textContent: "first"
	        	              },
	        	              {
	        	            	id: "2",  
	          	            	date: 20150101121212,
	          	            	textContent: "secons"
	          	              },
	          	              {
	          	            	id: "3",
	        	            	date: 20150104121212,
	        	            	textContent: "fourth Lorem"
	        	              }
	          	              ]
        				  },
        				  
          	              "2": {
          	              "timelineName" : "Another Line",
          				  "events" : [
	        	              {
	        	            	id: "4",
	          	            	date: 20150103121212,
	          	            	textContent: "third"
	          	              },
	          	              {
	          	            	id: "5",
	        	            	date: 20150105121212,
	        	            	textContent: "fifth"
	        	              },
	        	              {
	        	            	id: "6",
	          	            	date: 20150106121212,
	          	            	textContent: "6th"
	          	              },
	          	              {
	        	            	id: "7",
	          	            	date: 20150107121212,
	          	            	textContent: "7th"
	          	              },
	          	              {
	          	            	id: "8",
	        	            	date: 20150108121212,
	        	            	textContent: "8th"
	        	              },
	        	              {
	        	            	id: "9",
	          	            	date: 20150109121212,
	          	            	textContent: "9th"
	          	              },
	          	              {
	        	            	id: "10",
	          	            	date: 20150110121212,
	          	            	textContent: "10th"
	          	              },
	          	              {
	          	            	id: "11",
	        	            	date: 20150111121212,
	        	            	textContent: "11th"
	        	              },
	        	              {
	        	            	id: "12",
	          	            	date: 20150112121212,
	          	            	textContent: "12th"
	          	              },
	          	              {
	        	            	id: "13",
	          	            	date: 20150113121212,
	          	            	textContent: "13th"
	          	              },
	          	              {
	          	            	id: "14",
	        	            	date: 20150114121212,
	        	            	textContent: "14th"
	        	              },
	        	              {
	        	            	id: "15",
	          	            	date: 20150115121212,
	          	            	textContent: "15th"
	          	              }
	        	              ]
          	              },
          	              
        				  "3": { 
        				  "timelineName" : "3rd Timeline",
        				  "events" : [
	        	              {
	        	            	id: "1",
	        	            	date: 20150101121212,
	        	            	textContent: "first"
	        	              },
	        	              {
	        	            	id: "2",  
	          	            	date: 20150101121212,
	          	            	textContent: "secons"
	          	              },
	          	              {
	          	            	id: "3",
	        	            	date: 20150104121212,
	        	            	textContent: "fourth Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
	        	              }
	          	              ]
        				  },
        	}
        }
        
        TimelineData.prototype.createNewTimeLine = function( sTimelineName )
        {
//        	var id = new Date().getTime();
//        	this.mockTimelineMap.loaded[id] = {
//    			"timelineName": sTimelineName
//			};
//        	this.mockData[id] = {
//        		"timelineName": sTimelineName,
//        		"events" : []	
//        	}
        	
        	var postData = {
        		"timelineName":sTimelineName	
        	}
        	
        	$.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "/timelines/createNewTimeLine",
                data: JSON.stringify(postData),
                dataType: "text"
            }).done(function(data) {
            	
            	var jsonData = JSON.parse(data);
            	
            	EVT.publish(EVT.TIMELINE_ADDED, jsonData.added);
//            	EVT.publish(EVT.TIMELINE_ADDED, {
//            		"timelineKey": id,
//            		"timelineName": sTimelineName
//            	});
            	
            	EVT.publish(EVT.RE_RENDER, jsonData.timelines.loaded);
            	
            }.bind(this))
            .fail(function(xhr, textStatus, thrownError) { alert("error " + textStatus); console.log(xhr, textStatus, thrownError);})
        }
        
        TimelineData.prototype.saveEvent = function(timelineKey, timelineName, eventData)
        {
//        	var event = new Event(timelineKey, timelineName, eventData );
//        	EVT.publish(EVT.EVENT_ADDED, event);
        }
        
        TimelineData.prototype.getTimelineNames = function()
        {
//        	EVT.publish(EVT.RE_RENDER_MENU, this.mockTimelineMap);
//        	EVT.publish(EVT.RE_RENDER, this.mockTimelineMap.loaded);
        	//return;
        	
        	$.getJSON("http://localhost:8899/timelines/timelineNames", function( mData ) {
        		
            	EVT.publish(EVT.RE_RENDER_MENU, mData);
            	EVT.publish(EVT.RE_RENDER, mData.loaded);        		
        	});
        }
        
        TimelineData.prototype.saveLoadedState = function( pTimelineKeys )
        {
        	$.getJSON("http://localhost:8899/timelines/saveLoaded/?loaded="+pTimelineKeys, function( mData ) {
        		console.log(mData);
        	});
        }
        
        TimelineData.prototype.getTimelines = function( pFolderNames )
        {
//        	var loadedTimelineData = {};
//        	
//        	for(var index in pTimelineKeys)
//        	{
//        		var timelineKey = pTimelineKeys[index];
//        		loadedTimelineData[timelineKey] = this.mockData[timelineKey];
//        	}
//        	
//        	EVT.publish(EVT.TIMELINE_DATA_RECEIVED, loadedTimelineData);
        	
        	$.getJSON("http://localhost:8899/timelines/timelineData/?folderPaths="+pFolderNames, function( mData ) {
        		EVT.publish(EVT.TIMELINE_DATA_RECEIVED, mData);     		
        	});
        	
        }
        
        return TimelineData;
});