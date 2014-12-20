

define(["thirdparty/jquery"], function( jQuery ){
	
	TPL =
	{	
		
	}
	
	TPL.getTemplate = function( sTemplateClassName )
	{
		var eTemplate = $( ".templates " + sTemplateClassName ); 
		return eTemplate.clone();
	}

	return TPL; 
	
});



