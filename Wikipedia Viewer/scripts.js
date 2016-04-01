$(document).ready(function()
{
	var i = 0;
	$('#search').keypress(function(e){
        if(e.which == 13)//Enter key pressed
        {
        	if(i === 0)
        	{
            	$('.box').animate({
        			'marginTop' : "-=60px" //move search bar to top 
        		});
        		i++;
        	}

	    	var query = $("#search").val();
	    	$.ajax({
	        type: "GET",
	        url: "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch="+query+"&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?",
	        contentType: "application/json; charset=utf-8",
	        async: false,
	        dataType: "json",
	        success: function (data) 
	        {
	        	console.log(data);
	        	var results = data.query.pages;
	        	var articles = Object.keys(results);
	        	articles.forEach(function(article)
	        	{
	        		$("#wrapper").append("<a href=http://en.wikipedia.org/?curid="+results[article].pageid + "><div class=article><div class=summary><h3>"+ results[article].title+"</h3><p>" + results[article].extract + "</p></div></div></a>");
	        	});		        
	 		}
	    	});	
        }
    });


});