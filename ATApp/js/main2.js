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
    
    if(flagList) {
       // it could be possible to check how to use less memmory. Maybe lazy loading?
    }  else {
        app.getAllItems(); 
        }
   
});


$(document).bind("pageinit", function(event, ui) {
   
    // crazy.. render the full list.

    

});    

    
//$(document).bind("pagecreate", function(event, ui) {
    //Listener for ATA BY Chapters - General
    $('#general li').live('tap',function () {
      
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);       
});  
//Listener for ATA BY Chapters - AirframeSystems
    $('#airframesystems li').live('click tap', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Atructures
    $('#structures li').live('click swipe', function () {
         var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Propeller Rotor
    $('#propellerrotor li').live('tap swipe', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Powerplant
    $('#powerplant').live('tap','li', function () {
        var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
        //Listener for ATA BY Chapters - Other
    $('#other li').live('taphold', function () {
       var chapter =  $(this).attr('id');  
        var headertext =  $(this).text(); 
        app.viewDataByChapter(chapter, headertext);
       
});
    
    // Listener for ATA Codes - details - search list view
    $('#todoItems li').live('click', function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
         app.getChapterDetail(number, detailtitle);
        $.mobile.changePage("#detail", { transition: "slide" });
      
        
       
}); 

 
    // Listener for ATA By Numbers
    $('#bynameitems2 li').live('click', function () {
       var number =  $(this).attr('id');  
        var detailtitle =  $(this).text(); 
         app.getChapterDetail(number, detailtitle);
        $.mobile.changePage("#detail", { transition: "slide" });
      
        
       
}); 
    



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
    
 



  



