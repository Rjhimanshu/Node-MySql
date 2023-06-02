var express = require('express');

var router = express.Router();

var conn = require('../server');

router.get('/', function(request, response, next){
   
    var query = " SELECT * FROM inventory ORDER BY id ASC";

    conn.query(query, function(error, data){

        if(error){
            throw error;
        }else {
            // Here this function is used to render a view and sends the rendered HTML string to the client.
            // Here in the  parameter we have to mention the route file name and in second parameter, we have to define data, which we want to send to views file.
            response.render('home', {title:'APP MOD TEAM', action:'list', teamData: data});
        }
    });
});

// Set Route for Team Member

router.get("/add", function(request, response, next){
    response.render("addMember", {title:'APP MOD TEAM', action:'add'});
    
});

// Insert Team Member Data to Database

router.post("/add_team_data", function(request, response, next){

	var fullname = request.body.fullname;

	var groupname = request.body.groupname;

	var sapid = request.body.sapid;


	var query = `
	INSERT INTO inventory 
	(fullname, groupname, sapid) 
	VALUES ("${fullname}", "${groupname}", "${sapid}")
	`;

	conn.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/home");
		}

	});

});

// Update Data

router.get('/edit/:id', function(request, response, next){

	var id = request.params.id;

	var query = `SELECT * FROM inventory WHERE id = "${id}"`;

	conn.query(query, function(error, data){

		response.render('editMember', {title: ' APP MOD TEAM ', action:'edit', teamData:data[0]});

	});

});

router.post('/edit/:id', function(request, response, next){

	
	var id = request.params.id;

	var fullname = request.body.fullname;

	var groupname = request.body.groupname;

	var sapid = request.body.sapid;

	
	conn.query("UPDATE inventory set fullname = ?, groupname = ?, sapid = ? WHERE id = ? ", [fullname,groupname,sapid,id], function(error, data){
		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/home');
		}

	});

});

router.get('/delete/:id', function(request, response, next){

	var id = request.params.id; 

	var query = `
	DELETE FROM inventory WHERE id = "${id}"
	`;

	conn.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect("/home");
		}

	});

});

module.exports = router;