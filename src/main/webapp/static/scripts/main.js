

require( ["plugins/domReady", "thirdparty/jquery", "thirdparty/easing", "thirdparty/jquery-ui", "thirdparty/knockout", "services/TemplateService", "timeline/Timeline"], 
		function(domReady, jQuery, Easing, jui, knockout, tpl, Timeline){
	
	domReady(function(){
		
		require(["thirdparty/jquery", "thirdparty/easing", "thirdparty/jquery-ui", "thirdparty/knockout", "services/TemplateService", "timeline/Timeline"], 
				function(jQuery, Easing, jui, knockout, tpl, Timeline) {
			
				var oEasing = new Easing(); 
				
				KO = knockout;
				
				var oTimeline = new Timeline();
				
				oTimeline.insertInto($('body'));
				
		});
		
	});

});

