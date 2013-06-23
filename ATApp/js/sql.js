var app = {};



app.openDb = function() {
    if(window.sqlitePlugin !== undefined) {
        app.db = window.sqlitePlugin.openDatabase("Atacode");
    } else {
        // For debugin in simulator fallback to native SQL Lite
        console.log("Use built in SQL Lite");
        app.db = window.openDatabase("Atacode", "1.0", "Mymxlog", 2000000);
    }
}
app.deleteTable = function() {
	var db = app.db;
    
	db.transaction(function(tx) {
		tx.executeSql("DROP atacodes2",
					  app.onSuccess,
                      app.OnError);
	});
}
app.createTable = function() {
	var db = app.db;
    
	db.transaction(function(tx) {
		tx.executeSql("CREATE TABLE IF NOT EXISTS atacodes2 (ID INTEGER PRIMARY KEY ASC, Name TEXT, Number INTEGER, Chapter INTEGER, Details TEXT)", []);
	});
}
app.insertData = function() {
   var db = app.db;
    
      
       htmltext = "<span class='ui-icon ui-icon-loading'><p> Wait.. Mymxlog is working for you ...</p></span>";
   
    $.getJSON('data/data.sql', function(data) {
          $.mobile.loading( 'show', {
           textonly: false,
	                text: "Wait please. First time initializing app.",
	        textVisible: true,
	        theme: "d",
	        html: ""
          });
        // Here Start the transaction,
        console.log("Trans begin!");
            var numberOfTransactions = data.length;
          $.each(data, function(key, val) {
              //var sqlSentence = {};
              Number  = val.Number;
              var db = app.db;
	         db.transaction(function(tx) {
		         tx.executeSql("INSERT INTO atacodes2 (Name, Number, Chapter, Details) VALUES (?,?,?,?)",
					  [val.Name, val.Number, val.Chapter, val.Details],
					  app.onSuccess,
                      app.OnError);
                 numberOfTransactions--;
                 if(numberOfTransactions == 700) {
                     $.mobile.loading( "hide" );
                     $.mobile.loading( 'show', {
                       textonly: false,
                                text: "Checking Ata Codes.",
                        textVisible: true,
                        theme: "d",
                        html: ""
                      });
                     
                 }
                 if(numberOfTransactions == 400) {
                     $.mobile.loading( "hide" );
                     $.mobile.loading( 'show', {
                       textonly: false,
                                text: "Checking database.",
                        textVisible: true,
                        theme: "d",
                        html: ""
                      });
                     
                 }
                 if(numberOfTransactions == 200) {
                     $.mobile.loading( "hide" );
                     $.mobile.loading( 'show', {
                       textonly: false,
                                text: "Starting ATApp.",
                        textVisible: true,
                        theme: "d",
                        html: ""
                      });
                     
                 }
                 if(numberOfTransactions == 0) {
                     localStorage.setItem("firststartDB", true);
                     $.mobile.loading( "hide" );
                   
                     
                 }
	          });
        
          });
   
        
    });
}
app.generateAtaChapters = function() {
    $("#general").empty();
    $("#structures").empty();
     $("#airframesystems").empty();
     $("#propellerrotor").empty();
     $("#powerplant").empty();
     $("#other").empty();
 
    // get local json document
    $.getJSON('data/atachapters.sql', function(data) {

          $.each(data, function(key, val) {
              //Append to listview
              // This is a master detail thing
              // First the Collapse ITEM
              if (val.Section  == 'GENERAL') {
                  // Collapsible item
                   $("#general").append("<li id='" + val.Chaptercode + "' ><a href='#'>" + val.Chaptercode + " - " + val.Chaptername + "</a></li>");
              }
              if (val.Section  == 'STRUCTURES') {
                  // Collapsible item
                    $("#structures").append("<li id='" + val.Chaptercode + "' ><a href='#'>" + val.Chaptercode + " - " + val.Chaptername + "</a></li>");
              }
              if (val.Section  == 'AIRFRAME SYSTEM') {
                  // Collapsible item
                    $("#airframesystems").append("<li id='" + val.Chaptercode + "' ><a href='#'>" + val.Chaptercode + " - " + val.Chaptername + "</a></li>");
              } 
              if (val.Section  == 'PROPELLER/ROTOR') {
                  // Collapsible item
                    $("#propellerrotor").append("<li id='" + val.Chaptercode + "' ><a href='#'>" + val.Chaptercode + " - " + val.Chaptername + "</a></li>");
              }
              if (val.Section  == 'POWER PLANT') {
                  // Collapsible item
                    $("#powerplant").append("<li id='" + val.Chaptercode + "' ><a href='#'>" + val.Chaptercode + " - " + val.Chaptername + "</a></li>");
              }
              if (val.Section  == 'OTHER') {
                  // Collapsible item
                    $("#other").append("<li id='" + val.Chaptercode + "' ><a href='#'>" + val.Chaptercode + " - " + val.Chaptername + "</a></li>");
              }
              

          });
                $("#general").listview('refresh');
                $("#airframesystems").listview('refresh');
                $("#structures").listview('refresh');
                $("#other").listview('refresh');
                 $("#propellerrotor").listview('refresh');
                $("#powerplant").listview('refresh');
                 
    });
}
app.onError = function(tx, e) {
	console.log("Error: " + e.message);
    
} 
      
app.onSuccess = function(tx, r) {
	console.log("sql success");
}


app.getDataByChapter = function(chapter, headertext) {
var var1 = parseInt(chapter);
    $("#todoItems").empty();
    
   // $("#todoItems").append("<li data-role='list-divider' role='heading' data-inset='true' data-divider-theme='c' id='headerdivider'>" + headertext + "<li>");
    
	var renderTodo = function (row) {
	 //return "<li>" + row.Name  + " " + row.Number + "</li>";
        //$("#todoItems").append("<li>" + row.Name  + " " + row.Number + "</li>");
	}
   
	var render = function (tx, rs) {
        	
          // rowOutput.empty();
 
		var rowOutput = "";
		var todoItems = document.getElementById("todoItems");
        var rowws = rs.rows.length;
		for (var i = 0; i < rs.rows.length; i++) {
			//rowOutput += renderTodo(rs.rows.item(i));
             // $("todoItems").append("<li>Item</li>")
            $("#todoItems").append("<li id='"  + rs.rows.item(i).Number + "'><a>" + rs.rows.item(i).Number + " - " + rs.rows.item(i).Name + "</a></li>");
		}
      
		//todoItems.innerHTML = rowOutput;
        $("#todoItems").listview('refresh');
        
	}
    
	var db = app.db;
	db.transaction(function(tx) {     
		tx.executeSql("SELECT * FROM atacodes2 where Chapter = " + var1 + "", [], 
					  render, 
					  app.OnSuccess);
	});
}
app.getDataByName = function(value) {
var searchvalue = "%" + value + "%";
    $("#bynameitems").empty();
   
	var render2 = function (tx, rs) {
        	
         
        
 
		var rowOutput = "";
		var todoItems2 = document.getElementById("bynameitems");
        var rowws = rs.rows.length;
		for (var i = 0; i < rs.rows.length; i++) {
			//rowOutput += renderTodo(rs.rows.item(i));
             // $("todoItems").append("<li>Item</li>")
            $("#bynameitems").append("<li id='"  + rs.rows.item(i).Number + "'><a>" + rs.rows.item(i).Number + " - " + rs.rows.item(i).Name + "</a></li>");
		}
      
		//todoItems.innerHTML = rowOutput;
        $("#bynameitems").listview('refresh');
        $("#bynameitems").trigger( "updatelayout")
	}
    
	var db = app.db;
	db.transaction(function(tx) {     
		tx.executeSql("SELECT * FROM atacodes2 where Name like  ? ", [searchvalue], 
					  render2, 
					  app.OnSuccess);
	});
}


app.getChapterDetail = function(number, detailtitle) {
	
    
    $("#atadetails").empty();
    //$("#atadetails").append("<h2>" + number  + "</h2>" + detailtitle);
    var renderdetails = function (tx, rs) {
      
        
        var rowws = rs.rows.length;
        if (rowws != 0) {
            $("#atadetails").append("<h2>" + detailtitle + "</h2><p>" + rs.rows.item(0).Details + "</p>");
		}
 
	}
    var db = app.db;
    
	db.transaction(function(tx) {
		tx.executeSql("SELECT Details FROM atacodes2 where Number = ? ",[number],
					  renderdetails,
                      app.OnError);
        var a = 1;
        
	});
    
}


app.viewDataByChapter = function(chapter, headertext) {
    
    // Change Header by chapter text
     app.getDataByChapter(chapter, headertext);
    
     $.mobile.changePage("#list", { transition: "slide"});
    
     
    
    
}


// get all 
app.getAllItems = function(letter) {


    $("#bynameitems2").empty();
    
   // $("#todoItems").append("<li data-role='list-divider' role='heading' data-inset='true' data-divider-theme='c' id='headerdivider'>" + headertext + "<li>");
    
       
   
           var render3 = function (tx, rs) {
                
              // rowOutput.empty();
     
            var rowOutput = "";
            var todoItems = document.getElementById("bynameitems2");
            var rowws = rs.rows.length;
            var textToInsert = [];
            for (var i = 0; i < rs.rows.length; i++) {
                //rowOutput += renderTodo(rs.rows.item(i));
                 // $("todoItems").append("<li>Item</li>")
                textToInsert += "<li id='"  + rs.rows.item(i).Number + "'>" + rs.rows.item(i).Name + " - " + rs.rows.item(i).Number + "</li>";
            }
        
              $("#bynameitems2").append(textToInsert);
                //todoItems.innerHTML = rowOutput;
            $("#bynameitems2").listview('refresh');
           }
        
    
	var db = app.db;
	db.transaction(function(tx) {     
		tx.executeSql("SELECT * FROM atacodes2 where Name like ? order by Name", [letter], 
					  render3, 
					  app.OnSuccess);
	});
}
           

