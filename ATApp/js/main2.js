// JavaScript Document
// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
var app = {};

// Buttons Var
app.db = null;
// PhoneGap is ready
function onDeviceReady() {
    navigator.splashscreen.hide();
    // Database 
     populateDatabase();   
   
      
}

//load byname page the AtaChapter List
$("#byname").live("pageshow", function(event, ui) {
     
     app.generateAtaChapters();
    
    
});

//load byname page the AtaChapter List
$("#bynumber").live("pageshow", function(event, ui) {
   
    var flagList = $("#bynameitems2 li").size();
    var flagList2 = $("#bynameitems2").size();
    $("#bynameitems2").listview('refresh').alphascroll();
    $("#bynameitems2").trigger( "updatelayout");
    if(flagList) {
       // it could be possible to check how to use less memmory. Maybe lazy loading?
    }  else {
        app.getAllItems('a%'); 
        }
   
});


$(document).bind("pageinit", function(event, ui) {
   
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

    

});    

// Open inApp
 $( '#openFacebook' ).live('tap swiperight', function (  ) {

    window.open("https://www.facebook.com/mymxlog", "_blank"); 
 });

// Open Twitter
 $( '#openTwitter' ).live('tap swiperight', function (  ) {

    window.open("https://twitter.com/mymxlog", "_blank"); 
 });

// Open Linkedinght
 $( '#openLinkedin' ).live('tap swiperight', function (  ) {

    window.open("http://www.linkedin.com/company/mymxlog-com", "_blank"); 
 });



    
//$(document).bind("pagecreate", function(event, ui) {
    //Listener for ATA BY Chapters - General
    $('#general li').live('tap swiperight',function () {
      
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);       
});  
//Listener for ATA BY Chapters - AirframeSystems
    $('#airframesystems li').live('tap swiperight', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Atructures
    $('#structures li').live('tap swiperight', function () {
         var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Propeller Rotor
    $('#propellerrotor li').live('tap swiperight', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Powerplant
    $('#powerplant li').live('tap swiperight', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Other
    $('#other li').live('tap swiperight', function () {
       var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
    
    // Listener for ATA Codes - details - search list view
    $('#todoItems li').live('tap swiperight, function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
         app.getChapterDetail(number, detailtitle);
        $.mobile.changePage("#detail", { transition: "slide" });
        }); 
      
    // Listener for ATA Codes - details - 
    $('#bynameitems li').live('tap swiperight', function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
         app.getChapterDetail(number, detailtitle);
        $.mobile.changePage("#detail", { transition: "slide" });
       
}); 

 
    // Listener for ATA By Numbers
    $('#bynameitems2 li').live('tap swiperight', function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
         app.getChapterDetail(number, detailtitle);
        $.mobile.changePage("#detail", { transition: "slide" });
      
        
       
}); 


    
  // Enable search if more than 2 items
    // Autocomplete
    $( "#initsearch" ).live( "listviewbeforefilter", function ( e, data ) {
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
    $( "#btnsearch" ).live( "tap", function (  ) {
        
          app.generateAtaChapters(); 
		value = $("#initsearch").val();		
        
        // SQL CALL
        if ( value && value.length > 2 ) {
              
            $.mobile.changePage("#search", { transition: "slide" });
            app.getDataByName(value);
           
        } else
        { }
		
			});
    

// back button listener
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
    
 
function populateDatabase() {
    
    // i got problems with iOS so lets make it different
    
    var localstg = localStorage.getItem("firststartDB");
     app.openDb();
   if(localstg == null)  {
           
        app.deleteTable();
      app.createTable();
       app.insertData();
       
        console.log("db created!");
       $.mobile.loading( 'hide');
        
   } else {
      
      console.log("not anymore!");
        
  }
}



$(document).bind('swipeleft', function () {
    
    if($.mobile.activePage.is('#home')) {
    }
    else {
    window.history.back();
				event.preventDefault();
    }
    
})
