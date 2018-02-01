function AllPlayers() {
	var pdb = new PouchDB('players');
	
	return pdb.allDocs({
		include_docs: true,
		attachments: true
	});
};

function GetPlayer(id) {
	var pdb = new PouchDB('players');
	return pdb.get(id);
}

function AddPlayer(pl) {
	
	var pdb = new PouchDB('players');
	return pdb.put(pl);
	
};

function DeletePlayer(pl, _callback) {
	var pdb = new PouchDB('players');
	
	pdb.get(pl).then(function (doc) {
		console.log("Player deleted: " + pl);
		DeleteAllWithPlayer(pl);
		_callback();
		return pdb.remove(doc);
	});
}