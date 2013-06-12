// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
var app = {};

// Buttons Var
app.db = null;
// PhoneGap is ready
function onDeviceReady() {
    navigator.splashscreen.hide();
    // POpulate database only the first time!
     populateDatabase();    
 
    document.addEventListener("#byname", onByName);
    
}


$(document).bind('pageinit'), (function () {
  
    
      
     //Listener for ATA BY Chapters - General
    $('#general').on('tap','li', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
       
});    
    
        //Listener for ATA BY Chapters - AirframeSystems
    $('#airframesystems').on('tap','li', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Atructures
    $('#structures').on('tap','li', function () {
         var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Propeller Rotor
    $('#propellerrotor').on('tap','li', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Powerplant
    $('#powerplant').on('tap','li', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Other
    $('#other').on('tap','li', function () {
       var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
    
    // Listener for ATA Codes - details
    $('#todoItems').on('tap','li', function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
        $.mobile.changePage("#detail", { transition: "slide" });
       app.getChapterDetail(number, detailtitle);
        
       
}); 
    
    
    // Listener for ATA Codes - details - search list view
    $('#bynameitems2').on('tap','li', function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
        $.mobile.changePage("#detail", { transition: "slide" });
       app.getChapterDetail(number, detailtitle);
        
       
}); 
      
    
// Autocomplete
    $( "#bynameitems" ).on( "listviewbeforefilter", function ( e, data ) {
       
				var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
				$ul.html( "" );
        // SQL CALL
        if ( value && value.length > 2 ) {
            app.getDataByName(value);
            $ul.trigger( "updatelayout")
        }
		
			});
    
  // Enable search if more than 2 items
    // Autocomplete
    $( "#initsearch" ).on( "listviewbeforefilter", function ( e, data ) {
        var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
        if ( value && value.length > 2 ) {
            
            $( "btnsearch" ).button( "enable" );
            
        } else {
        $( "btnsearch" ).button( "disable" );
        }
    });
        

//Trigger the first search. 
    $( "#btnsearch" ).bind( "click", function (  ) {
          app.generateAtaChapters(); 
		value = $("#initsearch").val();		
        
        // SQL CALL
        if ( value && value.length > 2 ) {
              
            $.mobile.changePage("#search", { transition: "slide" });
            app.getDataByName(value);
           
        } else
        { }
		
			});
    



// Init Functions

$( '#byname' ).bind( 'tap', function() {
     app.generateAtaChapters();
});

// Leave the app with back-button only in home page

document.addEventListener("backbutton", function(e)
    {
        if($.mobile.activePage.is('#home')){
            e.preventDefault();
            navigator.app.exitApp();
        }
        else {
            navigator.app.backHistory()
        }
    }, false);
    
    });




  



