function AllPlayerTeams() {
	var pdb = new PouchDB('playerteams');
	
	return pdb.allDocs({
		include_docs: true,
		attachments: true
	});
};

function AddPlayerToTeam(tm, pl, pos) {
	if (pos === undefined) {
		pos = "";
	};
	
	var pdb = new PouchDB('playerteams');
	var tempPlayerTeam = { _id : tm + "\t" + pl, team : tm, player : pl, position : pos };
	return pdb.put(tempPlayerTeam);
}

function SetPlayerPosition(tm, pl, pos) {
	var pdb = new PouchDB('playerteams');
	
	//Remove existing player in this position
	pdb.query(function (doc, emit) {
		if (doc.team === tm && doc.position === pos) {
			emit(doc);
		}
	}, function (err, result) {
		if (!err) {
			for (i = 0; i < result.total_rows; i++) {
				result.rows[i].key.position = "";
				pdb.put(result.rows[i].key);
			}
		}
	}).then(function (res) {
		//Get new player
		return pdb.get(tm + "\t" + pl);
	}).then(function (newPlayer) {
		//Add their new position
		newPlayer.position = pos;
		return pdb.put(newPlayer);
	}).catch(function (err) {
		console.log(err);
	});
};

function AllPlayersInTeam(tm) {
	var pdb = new PouchDB('playerteams');
	
	return pdb.query(function (doc, emit) {
		if (doc.team === tm) {
			emit(doc);
		}
	});
}

function AllTeamsForPlayer(pl) {
	var pdb = new PouchDB('playerteams');
	
	return pdb.query(function (doc, emit) {
		if (doc.player === pl) {
			emit(doc);
		}
	});
}

function DeleteAllWithTeam(tm) {
	var pdb = new PouchDB('playerteams');
	pdb.query(function (doc, emit) {
		if (doc.team === tm) {
			emit(doc);
		}
	}, function (err, result) {
		if (!err) {
			for (i = result.total_rows - 1; i >= 0; i--) {
				DeletePlayerTeams(result.rows[i].key._id);
			}
		}
	});
}

function DeletePlayerTeams(id) {
	var pdb = new PouchDB('playerteams');
	
	pdb.get(id).then(function (doc) {
		return pdb.remove(doc);
	});
}

function DeleteAllWithPlayer(pl) {
	var pdb = new PouchDB('playerteams');
	pdb.query(function (doc, emit) {
		if (doc.player === pl) {
			emit(doc);
		}
	}, function (err, result) {
		if (!err) {
			for (i = result.total_rows - 1; i >= 0; i--) {
				DeletePlayerTeams(result.rows[i].key._id);
			}
		}
	});
}

function RemovePlayersInTeamFromArray(pls, tm, _callback) {
	var existingPlayers = AllPlayersInTeam(tm).then(function (result) {
		for (i = pls.total_rows - 1; i >= 0; i--) {
			for (j = 0; j < result.total_rows; j++) {
				if (result.rows[j].key.player === pls.rows[i].doc.name) {
					pls.rows.splice(i, 1);
					pls.total_rows--;
					break;
				}
			}
		}
		return _callback(pls);
	});
}