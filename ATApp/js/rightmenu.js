( function( $ ) {

	$.fn.extend({

		alphascroll: function() {

			return this.each( function() {
// handle orientation changes
				$( window ).bind( 'orientationchange', function(e) {
                   var tmp = setTimeout(myWindow(e), 10000);
                    
				}); 
                
				var content  = $( this ),
					alphabet = ['a','b','c','d','e','f','g','h','i','j','l','m','n','o','p','r','s','t','u','v','w','y','z'],
					shortAlphabet = ['a','d','g','j','m','p','s','w','z'],
					dividers = [],
					dividerClass,
					scrollbar = '';

				// attach classes to list autodividers
				$( content ).find( '.ui-li-divider' ).each( function() {
                    dividerClass = $( this ).html().toLowerCase();
					dividers.push( dividerClass );
					$( this ).addClass( dividerClass )
					
				});

				// create and display the scrollbar
				function createScrollbar() {
					// generate scrollbar HTML
					$( alphabet ).each( function( index, value ) {
						 
							scrollbar += '<li id="' + value + '" class="alphascroll-item" unselectable="on"><a href="#">' + value.toUpperCase() + '</a></li>';
						
						
					});

					// attach scrollbar to page
					$( content ).wrap( '<div />' );
					var wrapper = $( content ).parent();
					$( wrapper ).prepend( '<ul class="alphascroll">' + scrollbar + '</ul>' );
					//var alphascroll = $( content ).closest( 'div' ).children( '.alphascroll li' );
                    var alphascroll = $(".alphascroll li");

					// bind touch event to scrollbar (for touch devices)
					$( alphascroll ).bind( 'tap', function( event ) {
                        var seleccion = $(this).attr('id').split( '-' ) + '%';
						// call my sql function and reload!!
                        app.getAllItems(seleccion);
					});

					

					
					
				}
               
				

				function truncateScrollbar() {
					$( '.alphascroll li' ).each( function( index, value ) {
						if ( $.inArray( $( this ).html().toLowerCase(), shortAlphabet ) < 0 ) {
							$( this ).html( '&#183;' ).addClass( 'truncated' );
						}
					});
				}

                 function myWindow(e) {
               
					$( '.alphascroll' ).unwrap().remove();
					scrollbar = '';
					createScrollbar();
                     if (( e.orientation == 'landscape' ) && ( device.name != 'iPad')) {
                       
						truncateScrollbar();
					}
				}
				

				// generate scrollbar on invokation
                var a = $(".alphascroll").size();
                var b = $(".alphascroll li").size();
                if (b == 0)
				createScrollbar();
			});
		}
	});

})( jQuery );

