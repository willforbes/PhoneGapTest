function AllTeams() {
	var pdb = new PouchDB('teams');
	
	return pdb.allDocs({
		include_docs: true,
		attachments: true
	});
};

function AddTeam(tm) {
	
	var pdb = new PouchDB('teams');
	/*
	pdb.put(tm, function(err, response) {
		if (err) {
			return console.log(err);
		} else {
			return true;
		}
	});
	*/
	return pdb.put(tm);
	
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