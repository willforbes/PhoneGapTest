var start = new Date().getTime();
var elapsed = 0;
var overallElapsed = 0;
var currentPeriod = 0;
var timerObject;
var matchParameters;
var startNewPeriod = true;
var requireCentrePass = true;
var centrePass;
var isPaused = true;
var isExtraTime = false;

function goalEvent(tm, pl, pos) {
	var totalTime = Math.round(elapsed + overallElapsed, 0);
	var teamFor;
	var teamAgainst;
	if (tm === "home") {
		teamFor = matchParameters.home;
		teamAgainst = matchParameters.away;
	}else {
		teamFor = matchParameters.away;
		teamAgainst = matchParameters.home;
	}
	
	var newEvent = { 
		team: teamFor,
		opponent: teamAgainst,
		period: currentPeriod,
		time: totalTime,
		centrepass: centrePass,
		extratime: isExtraTime,
		event: "goal",
		player: pl,
		position: pos
	};
}

function toggleTimerStyle() {
	if (isPaused === true) {
		$("#timeLabel").css('background-color', '#3388cc');
		$("#timeLabel").css('color', '#ffffff');
	}else {
		$("#timeLabel").css('background-color', '#f6f6f6');
		$("#timeLabel").css('color', '#333333');
	};
}

function startButtonClick() {
	if (isPaused) {
		if (startNewPeriod) {
			if (requireCentrePass) {
				$("#homeTeamCentrePassButton").text(matchParameters.home);
				$("#awayTeamCentrePassButton").text(matchParameters.away);
				$( "#centrePassSelectPop" ).popup( "open" );
				return;
			}
			if (currentPeriod < matchParameters.comp.periods ) {
				currentPeriod++;
				$("#periodLabel").text("Period: " + currentPeriod);
				elapsed = 0;
				overallElapsed = 0;	
				startNewPeriod = false;
			}else if (matchParameters.comp.extratime) {
				currentPeriod = 1;
				$("#periodLabel").text("Period: Extra Time");
				elapsed = 0;
				overallElapsed = 0;	
				startNewPeriod = false;
				isExtraTime = true
			}else {
				return;
			}
		}
		$("#startTimerButton").text("Pause");
		toggleTimerStyle();
		isPaused = false;
		start = new Date().getTime();
		timerObject = setInterval(function() {
			var time = new Date().getTime() - start;
			elapsed = Math.floor(time / 100) / 10;
			var totalTime = Math.round(elapsed + overallElapsed, 0);
			var totalMins = Math.floor(totalTime / 60);
			var totalSecs = totalTime - (totalMins * 60);
			var textMins = totalMins;
			var textSecs = totalSecs;
			if (totalSecs < 10) textSecs = "0" + textSecs;
			if (totalMins < 10) textMins = "0" + textMins;
			$("#timeLabel").text("Time: " + textMins + ":" + textSecs);
			if (((elapsed + overallElapsed) >= (matchParameters.comp.duration * 60)) && isExtraTime 			== false) {
				var textMins = matchParameters.comp.duration;
				if (matchParameters.comp.duration < 10) textMins = "0" + textMins;
				$("#timeLabel").text("Time: " + textMins + ":00");
				clearInterval(timerObject);
				startNewPeriod = true;
				requireCentrePass = true;
				isPaused = true;
				$("#startTimerButton").text("Start Period");
				return;
			}
		}, 100);
	}else {
		$("#startTimerButton").text("Resume");
		toggleTimerStyle();
		isPaused = true;
		clearInterval(timerObject);
		overallElapsed = Math.round(overallElapsed + elapsed, 1);
	}
}

function selectCentrePassButton(tm) {
	if (tm === "home") {
		centrePass = matchParameters.home;
	}else {
		centrePass = matchParameters.away;
	}
	requireCentrePass = false;
	$( "#centrePassSelectPop" ).popup( "close" );
	startButtonClick();
}

function createLineupObject(pl, pos, tm, st) {
	return newLineupObj = {
		player: pl,
		position: pos,
		team: tm,
		start: st,
		end: ""
	};
}

function setLineupObjectEnd(pl, pos, tm, e) {
	matchParameters.lineup
}

$(document).on('pagebeforeshow', "#match", function (event, data) {
    var parameters = $(this).data("url").split("?")[1].split("&");
	GetCompetition(parameters[2].split("=")[1]).then(function(result) {
		matchParameters = {
			home: parameters[0].split("=")[1],
			away: parameters[1].split("=")[1],
			comp: result,
			lineup: []
		};
	});
});