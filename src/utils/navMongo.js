const mem = require("mem");
const got = mem(require("got"), {
	// Cache results for 15 minutes
	maxAge: 15 * 60 * 1000,
});

const moment = require("moment-timezone");

const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27017';

var navMongo = {};

MongoClient.connect(mongourl, function(err, db) {
	if (err) throw err;
	var dbo = db.db("chatdb-dev");

	
	navMongo.getBanned = function(channel) {
		
		console.log("[+] running mongotool.getBanned => " + channel)
		console.log("[+] channel => " + channel)

		var final = "";
		dbo.collection("chan_settings_collection")
		// .find({"channel":qChan, "sender":username})
		.find({"channel":channel})
		// .limit(5)
		.sort({"time": -1})
		.toArray(function(err, items) {
			//console.log(items);
			return items;
			//final = items;
			var num = 1;
			items.forEach(function(item){
				//console.log(num + ") " + item.user);
				// final = final + num + ") " + item.sender + ": \"" + item.user + "\"\n";
				final = final + item.user + "\n";
				num++;
			});
			// console.log(final);
			// return final;
			 //args.send("Banned users: " + username + " were: \n" + final)
			//args.send("Banned users: \n" + final)
	
			// db.close();
		});
		return final;
	};



	navMongo.addBan = function(channel, user, byUser) {
		var time = moment().tz("EST").format();
		if(channel == null || user == null || byUser == null){
			return false;
		}
		console.log("[+] running nav mongotools.addBan")
		console.log("[+] channel => " + channel)
		console.log("[+] user => " + user)
		console.log("[+] byUser => " + byUser)

		var final = "";
		var myobj = {
			"time": time,
			"channel": channel,
			"sender": byUser,
			"user": user
		}

		dbo.collection("chan_settings_collection")


		.insertOne(myobj, function (err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			
			// return true;
			// db.close();
		});
		//return true;
	};
	// return true;
});



module.exports = navMongo;