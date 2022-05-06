$(document).ready(function(){ 
	$('a').click(function(){ $('html, body').animate({ scrollTop: $( $.attr(this, 'href') ).offset().top - 60}, 500); return false;});
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
});


