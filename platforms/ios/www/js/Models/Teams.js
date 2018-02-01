function AllTeams(_callback) {
	/*
	var pdb = new PouchDB('teams');
	
	return pdb.allDocs({
		include_docs: true,
		attachments: true
	});
	*/
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM team;', [], function(transaction, result) {
			if (result != null && result.rows != null) {
				_callback(result);
				return;
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
				}
				
			}
		}, errorHandler);
	}, errorHandler, nullHandler);
};

function AddTeam(tm) {
	
	//var pdb = new PouchDB('teams');
	/*
	pdb.put(tm, function(err, response) {
		if (err) {
			return console.log(err);
		} else {
			return true;
		}
	});
	*/
	//return pdb.put(tm);
	
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO team (name) VALUES (?)',[tm.name], nullHandler,errorHandler);
	});
	
};

function DeleteTeam(tm, _callback) {
	var pdb = new PouchDB('teams');
	
	pdb.get(tm).then(function (doc) {
		console.log("Team deleted: " + tm);
		DeleteAllWithTeam(tm);
		_callback();
		return pdb.remove(doc);
	});
};