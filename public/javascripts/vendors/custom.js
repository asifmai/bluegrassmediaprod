/*-----------------------------------------------------------------------------------*/
/*	FULL SCREEN FIRST SECTION
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';
	
	$(window).resize(function(){
		$('section.full').css({ 'height' : $(window).height() });
	});
	
	$(window).trigger('resize');

});
/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function($){
'use strict';

	jQuery('.portfolio').isotope({
		itemSelector : 'li'
		// getSortData: {
		// 	prioritize: function ($elm) {
		// 		return $elm.attr('prioritize');
		// 	}
		// },
		// sortBy: 'prioritize',
		// sortAscending : false
	});
	
	jQuery('#filters a').click(function(){
			var filter = jQuery(this).attr('href');
			var text = jQuery(this).html();
				jQuery('#filters a').removeClass('active');
				jQuery(this).addClass('active');
				jQuery('.portfolio').isotope({ filter: filter });
				jQuery(window).trigger('resize');
				jQuery('small.portfolio-filter').html(text);
		return false;
	});
	
	jQuery(window).smartresize(function(){
		jQuery('.portfolio').isotope('reLayout');
		setTimeout(function(){
			jQuery('.portfolio').isotope('reLayout');
		}, 501);
	});
	
	jQuery('#load-more').click(function(e){
		e.preventDefault();
		// var url = jQuery(this).attr('href');
		var pageNumber = Number(jQuery(this).attr('pagenumber'));
		jQuery(this).html('<img src="/images/loader.gif" />');
		
		jQuery.ajax({
			type: "get",
			url: "/getprojects/" + pageNumber,
			success: function (projectsReturn) {
				// console.log(projectsReturn);
				var newProjects = projectsReturn.projects;
				// console.log(newProjects);
				// console.log(projects);
				projects = projects.concat(newProjects);
					for (var i = 0; i < newProjects.length; i++) {
						var tags = '';
						var tagsNames = '';
						for (var a = 0; a < newProjects[i].tags.length; a++) {
							tags = tags + ' ' + newProjects[i].tags[a]._id;
							tagsNames = a > 0 ? tagsNames + ', ' + newProjects[i].tags[a].name : newProjects[i].tags[a].name;
						};
						var newItem = jQuery('<li class="'+ tags +'" prioritize="'+ newProjects[i].prioritize + '"><a href="' + newProjects[i]._id +'" class="isotope-alt-image"><img src="/images/uploads/' + newProjects[i]._id +'/' + newProjects[i].coverimage +'" alt="image" /><div><h4>' + newProjects[i].name + '<small>' + tagsNames + '</small></h4></div></a><div class="isotope-alt-details"><div><h4 class="remove-bottom">' + newProjects[i].name + '</h4><p class="meta">' + tagsNames + '</p></div></div></li>');
						newItem.find('.isotope-alt-image').hoverdir();
						jQuery('.portfolio').isotope('insert', newItem).isotope('reLayout');
					}
					var newPageNumber = pageNumber + 1;
					if (newPageNumber > projectsReturn.pages) {
						jQuery('#load-more').fadeOut();
					} else {
						jQuery('#load-more').attr('pagenumber', newPageNumber);
						jQuery('#load-more').html('Load More');
					}
					setTimeout(() => {
						jQuery(window).trigger('resize');
					}, 2000);
			}
		});
		return false;
	});
	
	
	jQuery(window).trigger('resize');
	
});
/*-----------------------------------------------------------------------------------*/
/*	HOVER DIR
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	$(function(){
		$('.isotope-alt-image').each( function() { $(this).hoverdir(); } );
	});
	
	$('.member a').click(function(){
		return false;
	});

});
/*-----------------------------------------------------------------------------------*/
/*	SCROLL TO TOP OF PAGE
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	$('.scroller').click(function(){
		var url = $(this).attr('href');
		$("html, body").animate({ scrollTop: $(url).offset().top - 64 }, 500);
		return false;
	});
	
	$('#selectnav .scroller').click(function(){
		$('#selectnav .scroller').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	$(window).scroll(function(){
		
		var scrollTop = $(window).scrollTop() / 12;
		
		if( scrollTop < 20 ){
			$('header').css({
				'padding-top' : 25 - scrollTop, 
				'padding-bottom' : 25 - scrollTop
			});
		} else {
			$('header').css({
				'padding-top' : 5, 
				'padding-bottom' : 5
			});
		}
		
		$('#selectnav .scroller').each(function(){
			var scrollHref = $(this).attr('href');
			if( $(window).scrollTop() > $(scrollHref).offset().top - 240 ) {
				$('#selectnav .scroller').removeClass('active');
				$(this).addClass('active');
			}
		});
		
	});

});
/*-----------------------------------------------------------------------------------*/
/*	MOBILE NAV
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	selectnav('selectnav');
	
});
/*-----------------------------------------------------------------------------------*/
/*	PORTFOLIO
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	$('body').on('click', '.portfolio a', function(){
	
		var projectID = $(this).attr('href');
		
		$("html, body").animate({ scrollTop: $('#portfolio').offset().top + 60 }, 500);

		$('.portfolio, #load-more').animate({ 'left' : '-1215px', 'opacity' : '0' }, function(){
			const data = generateHTML(projectID);
			var filtered = jQuery(data);
			$(".rslides", filtered).responsiveSlides({
				speed: 500,
				timeout: 4000,
				pager: true
			});
			filtered.imagesLoaded(function(){
				$('.portfolio').css('max-height', '0');
				$('#loader').html(filtered).animate({ 'opacity' : '1', 'bottom' : '0' });
			});
		});
		return false;
	});
	
	$('body').on('click', '.portfolio-close', function(){
	
		$('#loader').animate({ 'opacity' : '0', 'bottom' : '-50px' }, function(){
			$(this).html(' ');
			$('.portfolio, #load-more').css('max-height', '').animate({ 'left' : '0', 'opacity' : '1' });
		});
		
		return false;
	});
	
});
/*-----------------------------------------------------------------------------------*/
/*	FANCY SCROLL EFFECTS
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function($){
'use strict';
	
	jQuery('.scroll-animate').espy(function (entered, state) {
	    if (entered && jQuery(this).hasClass('left') ) {
	        jQuery(this).delay(200).animate({ 'opacity' : '1', 'left' : '0' });
	    }
	    if (entered && jQuery(this).hasClass('right') ) {
	        jQuery(this).delay(200).animate({ 'opacity' : '1', 'right' : '0' });
	    }
	    if (entered && jQuery(this).hasClass('bottom') ) {
	        jQuery(this).delay(200).animate({ 'opacity' : '1', 'bottom' : '0' });
	    }
	    if (entered && jQuery(this).hasClass('top') ) {
	        jQuery(this).delay(200).animate({ 'opacity' : '1', 'top' : '0' });
	    }
	});

});
/*-----------------------------------------------------------------------------------*/
/*	SLIDER
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	$(".rslides").responsiveSlides({
	  speed: 500,
	  timeout: 6000,
	  pager: true
	});
	
});
/*-----------------------------------------------------------------------------------*/
/*	ALERTS
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

		$('.alert i').click(function(){
			$(this).parent().slideUp();
		});

});
/*-----------------------------------------------------------------------------------*/
/*	ACCORDION
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

		$('.accordion > dd.active').show();
		  
		$('.accordion > dt > a').click(function() {
			if( $(this).parent().hasClass('active') ){
				$(this).parents('.accordion').find('dt').removeClass('active');
				$(this).parents('.accordion').find('dd').removeClass('active').slideUp();
				return false;
			} else {
				$(this).parents('.accordion').find('dt').removeClass('active');
				$(this).parents('.accordion').find('dd').removeClass('active').slideUp();
				$(this).parent().addClass('active').next().addClass('active').slideDown();
				return false;
			}
		});

});
/*-----------------------------------------------------------------------------------*/
/*	CONTACT FORM
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	//CONTACT FORM
	$('#contactform').submit(function(){

		var action = $(this).attr('action');

		$("#message").slideUp(750,function() {
		$('#message').hide();

 		$('#submit').attr('disabled','disabled');

		$.post(action, {
			name: $('#name').val(),
			email: $('#email').val(),
			website: $('#website').val(),
			comments: $('#comments').val()
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown('slow');
				$('#submit').removeAttr('disabled');
				if(data.match('success') != null) $('#contactform').slideUp('slow');
				$(window).trigger('resize');
			}
		);

		});

		return false;

	});
	
});

function generateHTML(projectid) {
	for (var i = 0; i < projects.length; i++) {
		if (projects[i]._id == projectid) {
			var htmlContent = '<article><a href="#" class="portfolio-close"><i class="fa fa-times"></i></a><ul class="rslides"><li><img src="/images/uploads/'+ projectid + '/' + projects[i].coverimage +'" alt="image"></li>';
			for (let a = 0; a < projects[i].images.length; a++) {
				if (projects[i].images[a] != '') {
					htmlContent+= '<li><img src="/images/uploads/'+ projectid + '/' + projects[i].images[a] +'" alt="image"></li>'
				}
			}
			htmlContent+= '</ul><div class="content"><div class="break15"></div><div class="two_thirds">'
			htmlContent+= '<h4>' + projects[i].name + '</h4>'
			htmlContent+= '<p>' + projects[i].description + '</p>'
			htmlContent+= '</div><div class="one_third last">'
			htmlContent+= '<h5>Project Details</h5><p>'
			htmlContent+= '<strong>Skills</strong>: '
			for (let a = 0; a < projects[i].tags.length; a++) {
				if (a != projects[i].tags.length - 1) {
					htmlContent+= projects[i].tags[a].name + ', '
				} else {
					htmlContent+= projects[i].tags[a].name
				}
			}
			htmlContent+= '<br />'
			htmlContent+= '<strong>Address</strong>: <a href="' + projects[i].address + '" class="light">' + projects[i].address + '</a>'
			htmlContent+= '</p></div><div class="clear"></div></div></article>'
			return htmlContent;
		}
	}
}