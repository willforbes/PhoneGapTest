function RefreshPlayerList() {
	var allPlayers = AllPlayers().then(function(results) {
		var numRows = results.total_rows;
		var listElement = "";
		for (i = 0; i < numRows; i++) {
			listElement = listElement + "<li><a href='player.html?_id=" + 
				results.rows[i].doc._id + "'>" +
				results.rows[i].doc.name + "</a></li>";
		}
		$("#playerListView").html(listElement);
		$("#playerListView").listview().listview("refresh");
	}).catch(function (err) {
		console.log(err);
	});
};

$(document).on("pageshow", "#players", function() {
	RefreshPlayerList();
});


// ********** Player Page *******************

function RefreshPlayerTeamsList() {
	var teamsForPlayer = AllTeamsForPlayer(parameter).then(function (result) {
		var listElement = "";
		for (i = 0; i < result.total_rows; i++) {
			listElement = listElement + "<li><a>" + 
				result.rows[i].key.team + 
				"</a><a onclick='DeleteTeamFromPlayerOpenDialog(\"" + result.rows[i].key.team + 
				"\")' data-rel='popup' " +
				"data-position-to='window' data-transition='pop'>" +
				"</a></li>";
		}
		$("#playersTeamsListView").html(listElement);
		$("#playersTeamsListView").listview().listview("refresh");
	}).catch(function (err) {
		console.log(err);
	});
}

function DeletePlayerDialogDelete() {
	DeletePlayer(parameter, function() {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "players.html");
		$( "#deletePlayerPop" ).popup( "close" );
	});	
}

function DeletePlayerDialogCancel() {
	$( "#deletePlayerPop" ).popup( "close" );
}

function EditPlayerDOBDialogSave() {
	$( "#editPlayerDOBPop" ).popup( "close" );
	GetPlayer(parameter).then(function (result) {
		var newDOB = $("#playerDOBEditInput").val();
		result.dob = newDOB;
		AddPlayer(result);
		SetDOBButtonText(newDOB);
	}).catch (function(err) {
		console.log(err);
	});
}

function SetDOBButtonText(dob) {
	var dt = new Date(dob);
	var dobText = "DOB: '";
	if (isNaN(dt)) {
		dobText += " '";
	}else {
		var dateDiff = new Date(Date.now() - dt.getTime());
		var yr = dateDiff.getUTCFullYear() - 1970;
		dobText += dob + "' - Age: " + yr;
	}
	$("#dobButton").text(dobText);
}

function DeleteTeamFromPlayerOpenDialog(tm) {
	$("#removeTeamFromPlayerTitle").text("Are you sure you want to remove this player from " + tm);
	$("#deleteTeamFromPlayerPop").attr("data-team", tm);
	$( "#deleteTeamFromPlayerPop" ).popup( "open" );
}

function DeleteTeamFromPlayerDialogCancel() {
	$( "#deleteTeamFromPlayerPop" ).popup( "close" );
}

function DeleteTeamFromPlayerDialogDelete() {
	var tm = $("#deleteTeamFromPlayerPop").attr("data-team");
	DeletePlayerTeams(tm + "\t" + parameter);
	$( "#deleteTeamFromPlayerPop" ).popup( "close" );
	RefreshPlayerTeamsList();
}

$(document).on('pagebeforeshow', "#player", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
	parameter = parameters.replace("_id=","");  
	$("#playerHeader").text(parameter);
	GetPlayer(parameter).then(function (result) {
		SetDOBButtonText(result.dob);
	});
});

$(document).on("pageshow", "#player", function() {
	RefreshPlayerTeamsList();
});