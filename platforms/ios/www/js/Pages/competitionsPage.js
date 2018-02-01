function RefreshCompetitionList() {
	var allComps = AllCompetitions().then(function(results) {
		var numRows = results.total_rows;
		var listElement = "";
		for (i = 0; i < numRows; i++) {
			listElement = listElement + "<li><a onclick='EditCompetitionDialogOpen(\"" + 
				results.rows[i].doc._id + "\")'>" +
				results.rows[i].doc.name + "</a></li>";
		}
		$("#competitionListView").html(listElement);
		$("#competitionListView").listview().listview("refresh");
	}).catch(function (err) {
		console.log(err);
	});
};

function AddCompetitionDialogAdd() {
	var $newName = $("#compNameInput").val();
	var $newPeriods = $("#compPeriodSlider").val();
	var $newPeriodsDuration = $("#compPeriodDurationSlider").val();
	var $newExtraTime = $("#compExtraTimeSwitch").val();
	
	var tempComp = { 
		_id:$newName, 
		name:$newName,
		periods:$newPeriods,
		duration:$newPeriodsDuration,
		extratime:$newExtraTime
	};
	
	AddCompetition(tempComp).then(function (res) {
		console.log("Competition Added");
	}).catch(function (err) {
		console.log(err);
	});
	
	
	$( "#addCompetitionPop" ).popup( "close" );
	$("#addCompetitionForm")[0].reset();
	RefreshCompetitionList();
}

function EditCompetitionDialogOpen(comp) {
	GetCompetition(comp).then(function (result) {
		$("#compEditPeriodSlider").val(parseInt(result.periods));
		$('#compEditPeriodSlider').slider('refresh');
		$("#compEditPeriodDurationSlider").val(parseInt(result.duration));
		$('#compEditPeriodDurationSlider').slider('refresh');
		$("#compEditExtraTimeSwitch").val(result.extratime).slider("refresh");
		$( "#editCompetitionPop" ).attr("data-comp", comp);
		$( "#editCompetitionPop" ).popup( "open" );
	});
}

function EditCompetitionDialogSave() {
	var compID = $( "#editCompetitionPop" ).attr("data-comp");
	var $newPeriods = $("#compEditPeriodSlider").val();
	var $newPeriodsDuration = $("#compEditPeriodDurationSlider").val();
	var $newExtraTime = $("#compEditExtraTimeSwitch").val();
	
	GetCompetition(compID).then(function (result) {
		result.periods = $newPeriods;
		result.extratime = $newExtraTime;
		result.duration = $newPeriodsDuration;
		AddCompetition(result);
	}).catch(function (err) {
		console.log(err);
	});
}

$(document).on("pageshow", "#competitions", function() {
	RefreshCompetitionList();
});