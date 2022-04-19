var submitBool = 0;

$(document).ready(function(){ $('#menu-icon').click(function(){ console.log('text0'); $('body').toggleClass('menu-open')
	});
	//scroll animation
	$('a').click(function(){ $('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top - 60
	    }, 500);
	    return false;
	});
	// browser window scroll (in pixels) after which the "back to top" link is shown
	var offset = 300,
		//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 0,
		//duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//grab the "back to top" link
		$back_to_top = $('.cd-top');
	//hide or show the "back to top" link
	$(window).scroll(function(){ ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out'); if( 
		$(this).scrollTop() > offset_opacity ) {
			$back_to_top.addClass('cd-fade-out');
		}
		if ($(window).scrollTop() == $(document).height() - $(window).height()) { var x = $('footer').outerHeight(true); $back_to_top.css("margin-bottom", x+"px");
		}
		else{ $back_to_top.css("margin-bottom", "0px");
		}
	});
	//smooth scroll to top
	$back_to_top.on('click', function(event){ event.preventDefault(); $('body,html').animate({ scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	$(window).keydown(function(event){
		if(event.keyCode == 13) {
		  event.preventDefault();
		  return false;
		}
	});

	
});

function getID(){
	hideAllErrors() 
	siteIDValidation()
	if (submitBool == 0){
		siteIDError()
	}
	else{ 
		$.getJSON("/api/SensorReadings/GetSensorZoneReadingsForSiteId", function(data){
			console.log(data);
			var data = convertData(data);	
			$('#id_show').html(data);
			$('#guid_show').hide();
			$('#id_show').show();
		});
    }	
}

function getGUID(){
	hideAllErrors() 
	GUIDValidation()
	if (submitBool == 0){
		GUIDError()
	}
	else{
		$.getJSON("/guid_test", function(data){
			console.log(data);
			var data = convertData(data);
			$('#id_show').hide();
			$('#guid_show').html(data); 
			$('#guid_show').show();
    	});
	}
}

function convertData(data){
	var data = JSON.stringify(data);
	var data = data.replace(/\\\\\\/g, "\\");
	var data = data.replace(/https : /g, "https:");
	var data = data.replace(/{/g, '');
	var data = data.replace(/,/g, ',<br>');
	var data = data.replace(/:/g, " : ");
	var data = data.replace(/https : /g, "https:");
	var data = data.replace(/}/g, '');
	console.log("Data converted");
	return data;
}

function siteIDValidation(){
	console.log("Validating.");
	userString = $('#ID').val();
	var siteIDRegEx = new RegExp('^[0-9a-fA-F]{80}$');
	if (siteIDRegEx.test(userString)){
		console.log("Valid Reg");
		submitBool = 1;
		//$('#validMessage').text("Valid Site ID!");
	}
	else{
		console.log("Invalid Reg");
		submitBool = 0;
		//$('#validMessage').text("The Site ID is currently invalid. Please ensure the ID is 80 characters, only 0-9 and lowercase a-e.");
	}
}

function GUIDValidation(){
	console.log("Validating.");
	userString = $('#GUID').val();
	var GUIDRegEx = new RegExp('^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$');
	if (GUIDRegEx.test(userString)){
		console.log("Valid Reg");
		submitBool = 1;
	}
	else{
		console.log("Invalid Reg");
		submitBool = 0;
	}
}

function GUIDError() {
	$('#guid_show').hide();
	$('#id_show').hide();
	$('#guid_error').html("Error, Invalid GUID.");
	$('#guid_error').show();
}

function siteIDError() {
	$('#guid_show').hide();
	$('#id_show').hide();
	$('#id_error').html("Error, Invalid Site ID.");
	$('#id_error').show();
}

function hideAllErrors() {
	$('#id_show').hide();
	$('#guid_show').hide();
	$('#id_error').hide();
	$('#guid_error').hide();
}