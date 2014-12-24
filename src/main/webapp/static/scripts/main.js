

require( ["plugins/domReady", 
          "thirdparty/jquery", 
          "thirdparty/easing", 
          "thirdparty/jquery-ui", 
          "thirdparty/knockout",
          "thirdparty/moment",
          "services/TemplateService", 
          "services/SimpleEventHub", 
          "timeline/Timeline"], 
		function(domReady, jQuery, Easing, jui, knockout, mom, tpl, evt, Timeline){
	
	domReady(function(){
		
		require(["thirdparty/jquery", 
		         "thirdparty/easing", 
		         "thirdparty/jquery-ui", 
		         "thirdparty/knockout", 
		         "thirdparty/moment",
		         "services/TemplateService", 
		         "services/SimpleEventHub", 
		         "timeline/Timeline"], 
				function(jQuery, Easing, jui, knockout, mom, tpl, evt, Timeline) {
			
				var oEasing = new Easing(); 
				KO = knockout;
				moment.suppressDeprecationWarnings=true;
				
				var oTimeline = new Timeline();
				oTimeline.insertInto($('body'));
				
		});
		
	});

});

