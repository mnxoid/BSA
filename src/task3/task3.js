var async = require('async');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BSA');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("DB connected");


	var studentSchema = mongoose.Schema({
	    name: String,
	    scores: [{
	    	type: String,
	    	score: Number 
	    }],
	    accepted: Boolean
	});

	var Student = mongoose.model('task3', studentSchema);

	//FIND STUDENTS WITH ALL MARKS WITHIN (93,95)
	function Q1(callback)
	{
		Student.aggregate([
			{
				$match: { 
					scores: {
						$not: {
							$elemMatch: { 
								score: { $lt: 93} 
							} 
						} 
					} 
				} 
			},
			{
				$match: { 
					scores: {
						$not: {
							$elemMatch: { 
								score: { $gt: 95} 
							} 
						} 
					} 
				} 
			}
		])
		.exec(function(err, docs) {
			console.log("-----------FIND STUDENTS WITH ALL MARKS WITHIN (93,95)--------");
			if(JSON.stringify(docs) === "[]"){
				console.log("No entries");
				callback();
				return;
			}
			for(i in docs) console.log(docs[i].name);
			callback();
		});
	}

	//FIND STUDENTS WITH A MARK WITHIN (93,95)
	function Q2(callback)
	{
		Student.find({
			scores: {
				$elemMatch: { 
					score: { $gt: 93, $lt: 95} 
				} 
			} 
			},function(err, docs) {
				console.log("-----------FIND STUDENTS WITH A MARK WITHIN (93,95)-----------");
				if(JSON.stringify(docs) === "[]"){
					console.log("No entries");
					callback();
					return;
				}
				for(i in docs) console.log(docs[i].name);
				callback();
			});
	}

	//FIND STUDENTS WITH EXAM MARK OVER 90
	function Q3(callback)
	{
		Student.aggregate([
			{
				$unwind: "$scores"
			},
			{
				$match:{
					"scores.type": "exam",
					"scores.score": { $gt: 90}
				} 
			}])
		.exec(function(err, docs) {
			console.log("-----------FIND STUDENTS WITH EXAM MARK OVER 90---------------");
			if(JSON.stringify(docs) === "[]"){
				console.log("No entries");
				callback();
				return;
			}
			for(i in docs) console.log(docs[i].name);
			callback();
		});
	}

	//SET Vinnie Auerbach'S "accepted" FIELD TO true
	function Q4(callback)
	{
		Student.update(	{name: "Vinnie Auerbach"},
						{$set: {accepted: true}},
						{multi: true}).exec(
						function(err, docs) {
							console.log("-----------SET Vinnie Auerbach'S \"accepted\" FIELD TO true-----");
							console.log(docs.n + " entries updated");
						});
	}

	async.series([Q1,Q2,Q3,Q4],function(){
		console.log("--------------------------------------------------------------");
		console.log("All queries completed")});
});
