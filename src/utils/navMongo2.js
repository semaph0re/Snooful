const mem = require("mem");
const got = mem(require("got"), {
	// Cache results for 15 minutes
	maxAge: 15 * 60 * 1000,
});

const moment = require("moment-timezone");

const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27017';

var navMongo2 = {};


	navMongo2.addBan = function(channel, user, byUser) {
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
console.log(myobj)
		dbo.collection("chan_settings_collection")


		.insertOne(myobj, function (err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			console.log(res)
			// return true;
			// db.close();
		});
		return true;
	};
	// return true;




module.exports = navMongo2;