var mysql = require('mysql');

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'userapp'
});

connection.connect(function(err){

	if(!err){
		console.log("database connected");
	}

});

module.exports = connection;