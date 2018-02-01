function AllCompetitions() {
	var pdb = new PouchDB('competitions');
	
	return pdb.allDocs({
		include_docs: true,
		attachments: true
	});
};

function GetCompetition(id) {
	var pdb = new PouchDB('competitions');
	return pdb.get(id);
}

function AddCompetition(comp) {
	
	var pdb = new PouchDB('competitions');
	return pdb.put(comp);
	
};

function DeleteCompetition(comp, _callback) {
	var pdb = new PouchDB('competitions');
	
	pdb.get(comp).then(function (doc) {
		console.log("Competition deleted: " + comp);
		_callback();
		return pdb.remove(doc);
	});
}