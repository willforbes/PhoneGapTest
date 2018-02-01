var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);

}

function successCallBack() {
   console.log("DEBUGGING: success");

}

function nullHandler(){};

function DatabaseSetup() {
	if (!window.openDatabase) {
	   alert('Databases are not supported in this browser.');
	   return;
	 }

	db = openDatabase(shortName, version, displayName, maxSize);

	db.transaction(function(tx){
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Team(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)', [], nullHandler, errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Player(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, dob TEXT)', [], nullHandler, errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS PlayerTeams(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, teamFK INTEGER NOT NULL, playerFK INTEGER NOT NULL)', [], nullHandler, errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Competition(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, periods INTEGER NOT NULL, duration INTEGER NOT NULL, extratime INTEGER NOT NULL DEFAULT 0)', [], nullHandler, errorHandler);
	}, errorHandler, successCallBack);
}