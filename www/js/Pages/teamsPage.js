function RefreshTeamList() {
	var allTeams = AllTeams(function (result) {
		var numRows = result.rows.length;
		var listElement = "";
		for (i = 0; i < numRows; i++) {
			listElement = listElement + "<li><a href='team.html?_id=" + 
				result.rows.item(i).id + "'>" +
				result.rows.item(i).name + "</a></li>";
		}
		$("#teamListView").html(listElement);
		$("#teamListView").listview().listview("refresh");
	});
	/*
	.then(function(results) {
		var numRows = results.total_rows;
		var listElement = "";
		for (i = 0; i < numRows; i++) {
			listElement = listElement + "<li><a href='team.html?_id=" + 
				results.rows[i].doc._id + "'>" +
				results.rows[i].doc.name + "</a></li>";
		}
		$("#teamListView").html(listElement);
		$("#teamListView").listview().listview("refresh");
	}).catch(function (err) {
		console.log(err);
	});
	*/
};

function AddTeamDialogAdd(withPlayers) {
	var $newTeam = $("#team").val();
	var newTeamObject = { _id:$newTeam, name:$newTeam };
	
	AddTeam(newTeamObject);
	/*
	.then(function(result) {
		if (withPlayers === true) {
			positionArray = [ "GK", "GD", "WD", "C", "WA", "GA", "GS" ];
			for (i = 0; i < positionArray.length; i++) {
				var tempPlayer = { 
					_id:$newTeam + "-" + positionArray[i], 
					name:$newTeam + "-" + positionArray[i],
					dob:""
				};
				console.log(tempPlayer);
				AddPlayer(tempPlayer).then(function(result) {
					var localTeam = result.id.split("-")[0];
					var localPos = result.id.split("-")[1];
					console.log(localPos);
					AddPlayerToTeam(localTeam, result.id, localPos);
				}).catch(function (err) {
					console.log(err);
				});
			}
		}	
	}).catch(function (err) {
		console.log(err);
	});
	*/
		
	$("#team").val("");
	
	$( "#addTeamPop" ).popup( "close" );
	RefreshTeamList();
};

$(document).on("pageshow", "#teams", function() {
	RefreshTeamList();
});

// ************* Individual Team Page *****************

function RefreshTeamsPlayerList() {
	var playersInTeam = AllPlayersInTeam(parameter).then(function (result) {
		var listElement = "";
		for (i = 0; i < result.total_rows; i++) {
			listElement = listElement + "<li><a href='player.html?_id=" + 
				result.rows[i].key.player + "'>" +
				result.rows[i].key.player + 
				"<span class='ui-li-count'>" + result.rows[i].key.position + "</span></a>" +
				"<a onclick='OpenChangePositionDialog(\"" + result.rows[i].key.player + 
				"\")' data-rel='popup' " +
				"data-position-to='window' data-transition='pop'>" +
				"</a></li>";
		}
		$("#teamsPlayersListView").html(listElement);
		$("#teamsPlayersListView").listview().listview("refresh");
	}).catch(function (err) {
		console.log(err);
	});
}

function DeleteTeamDialogDelete() {
	DeleteTeam(parameter, function() {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "teams.html");
		$( "#deleteTeamPop" ).popup( "close" );
	});	
}

function DeleteTeamDialogCancel() {
	$( "#deleteTeamPop" ).popup( "close" );
}

function OpenChangePositionDialog(pl) {
	$(".editPositionListItem").attr("id", pl);
	$( "#editPlayerPositionPop" ).popup( "open" )
}

function ChangePositionDialogSelect(pos, pl) {
	$( "#editPlayerPositionPop" ).popup( "close" )
	SetPlayerPosition(parameter, pl, pos);
	RefreshTeamsPlayerList();
}

function AddNewPlayerDialogAdd() {
	var $newName = $("#playerNameInput").val();
	var $newDOB = $("#playerDOBInput").val();
	
	var tempPlayer = { 
		_id:$newName, 
		name:$newName,
		dob:$newDOB
	};
	AddPlayer(tempPlayer).then(function (res) {
		AddPlayerToTeam(parameter, res.id, "");
	}).catch(function (err) {
		console.log(err);
	});
	
	
	$( "#addNewPlayerPop" ).popup( "close" );
	RefreshTeamsPlayerList();
}

function AddExistingPlayerDialogAdd(pl) {
	$( "#addExistingPlayerPop" ).popup( "close" );
	AddPlayerToTeam(parameter, pl);
	RefreshTeamsPlayerList();
}

function addExistingPlayerButton() {
	var players = AllPlayers().then(function (res) {
		var otherPlayers = RemovePlayersInTeamFromArray(res, parameter, function (result) {
			var listElement = "";
			for (i = 0; i < result.total_rows; i++) {
				listElement = listElement + "<li><a onclick='AddExistingPlayerDialogAdd(\"" + 
					result.rows[i].doc.name + "\")'>" +
					result.rows[i].doc.name + 
					"</a></li>";
			}
			$('#addExistingPlayerPop').css('overflow-y', 'scroll');
			$("#addExistingPlayerListView").html(listElement);
			$("#addExistingPlayerListView").listview().listview("refresh");
			$( "#addExistingPlayerPop" ).popup( "open" );
			$("#addExistingPlayerButton").removeClass('ui-btn-active');
		});
		
		
		
	});
}

$(document).on('pagebeforeshow', "#team", function (event, data) {
    var parameters = $(this).data("url").split("?")[1];
	parameter = parameters.replace("_id=","");  
	$("#teamHeader").text(parameter);
});

$(document).on("pageshow", "#team", function() {
	RefreshTeamsPlayerList();
});