/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 $(function(){
	$( "[data-role='footer']" ).toolbar({ theme: "a" }); 
 });
 
//$(document).on("pagecontainerchange", function() {
//  $("[data-role='header'] h2" ).text($(".ui-page-active").jqmData("title"));
//});
 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
		
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
		
		//
		//var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
		try {
			
			StatusBar.overlaysWebView( false );
			StatusBar.backgroundColorByName( "white" );
			
			//var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
			//var db;
			//db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
			//alert(db);
		}
		catch(err) {
			alert(err);
		}
		
		/*
		window.sqlitePlugin.selfTest(function() {
			alert('SELF test OK');
		});
		*/
		
		//$( ":mobile-pagecontainer" ).pagecontainer( "change", "home.html");
		//loadPage("pages/home.html");
		
		/*
		var $contact = $("#contactButton");
		$contact.on("click", function() {
			$('#RenderBody').load('/pages/contact.html');
		});
		*/
		
		//var parentElement = document.getElementById('RenderBody');
        /*
		var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		*/
    }
	
};

function RefreshCompetitionsHomePage() {
	var allComps = AllCompetitions().then(function(results) {
		var numRows = results.total_rows;
		var listElement = "";
		for (i = 0; i < numRows; i++) {
			listElement = listElement + "<option value=\"" + 
				results.rows[i].doc._id + "\">" +
				results.rows[i].doc.name + "</option>";
		}
		$("#competitionDropdown").html(listElement).selectmenu("refresh");
		$("#competitionDropdown").selectmenu().selectmenu("refresh");
	}).catch(function (err) {
		console.log(err);
	});
}

function RefreshTeamsHomePage() {
	var allTeams = AllTeams().then(function(results) {
		var numRows = results.total_rows;
		var listElement = "";
		var awayTeamID = "";
		for (i = 0; i < numRows; i++) {
			listElement = listElement + "<option value=\"" + 
				results.rows[i].doc._id + "\">" +
				results.rows[i].doc.name + "</option>";
			if (i === 1) {
				awayTeamID = results.rows[i].doc._id;
			}
		}
		$("#homeTeamDropDown").html(listElement);
		$("#homeTeamDropDown").selectmenu().selectmenu("refresh");
		$("#awayTeamDropDown").html(listElement);
		if (numRows > 1) {
			$("#awayTeamDropDown option[value='" + awayTeamID + "']").attr('selected', 'selected'); 
		}
		$("#awayTeamDropDown").selectmenu().selectmenu("refresh");
	}).catch(function (err) {
		console.log(err);
	});
}

$(document).on("pageshow", "#index"	, function() {
	RefreshCompetitionsHomePage();
	RefreshTeamsHomePage();
});

$(document).on("pagebeforeshow", "#index"	, function() {
	//$( ":mobile-pagecontainer" ).pagecontainer( "change", "home.html");
});

function StartNewGameButtonClick() {
	var homeTeam = $("#homeTeamDropDown option:selected").text();
	var awayTeam = $("#awayTeamDropDown option:selected").text();
	var comp = $("#competitionDropdown option:selected ").text();
	if (homeTeam != "" && awayTeam != "" && comp != "") {
		//$("#mainFooter").hide();
		$("#homeFooterButtons").toggle();
		$("#matchFooterButtons").toggle();
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "match.html?home=" + homeTeam +
			"&away=" + awayTeam + "&comp=" + comp);
	}
	//$('#mainContents').load("match.html");
}

function loadPage(url) {
    $('#RenderBody').load(url);
	/*
	var xmlhttp = new XMLHttpRequest();
	document.getElementById('RenderBody').innerHTML = 'no';
    // Callback function when XMLHttpRequest is ready
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200 || xmlhttp.status === 0) {
                document.getElementById('RenderBody').innerHTML = xmlhttp.responseText;
				//document.getElementById('RenderBody').innerHTML = 'hi';
            }
        }
    };
    xmlhttp.open("GET", url , true);
    xmlhttp.send();
	*/
}

function init() {

    // Load first page into container
    loadPage("pages/home.html");
}