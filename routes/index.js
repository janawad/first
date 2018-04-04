var express = require('express');
var router = express.Router();
var connection = require("./../config");

/* GET home page. */
router.get('/alluser', function(req, res, next) {
  
	connection.query("select * from users", function(err,data){
		if(err){
			res.json({
				status:404,
				message:"err : "+err
			})
		}

		else{
			
			if(data.length <= 0){
				res.json({
					status:404,
					message:"No users Found"
				})
			}
			else{
				res.json({
					status:200,
					message:data
				})
			}
		}
	})

});

router.post('/adduser',function(req, res, next){
	
	var newuser = {
		name : req.body.name,
		phone : req.body.phone,
		email : req.body.email,
		description : req.body.description
	};

	connection.query("insert into users set ?",newuser,function(err,data){
		if(err){
			res.json({
				status:404,
				message:"err : " + err
			})
		}
		else{
			res.json({
				status:200,
				message:'new user will be added'
			})
		}
	})
})


router.get('/user/:id', function(req,res,next){

	connection.query("select * from users where id = ?",+req.params.id, function(err,data){

		if(err){
			res.json({
				status:404,
				message:"err : "+err
			})
		}

		else{

			if(data.length <= 0){
				res.json({
					status:404,
					message:"No user for this id"
				})
			}
			
			else{
				res.json({
					status:200,
					message:data
				})
			}
		}
	})

})


router.post('/updateusers/:id', function(req,res,next){

	var updateuser = {
		name : req.body.name,
		phone : req.body.phone,
		email : req.body.email,
		description : req.body.description
	}

	connection.query("update users set ? where id = "+req.params.id,updateuser,function(err,data){
		if(err){
			res.json({
				status:404,
				message:'err : '+err
			})
		}
		else{
			res.json({
				status:200,
				message:"user will updated"
			})
		}
	})
})

router.get("/delete/:id", function(req,res,err){

	connection.query("delete from users where id = ?",+req.params.id,function(err,result){
		if(err){
			res.json({
				status:404,
				message:"err : "+ err
			})
		}
		else{
			res.json({
				status:200,
				message:"user will be deleted.."
			})
		}
	})
})

module.exports = router;
