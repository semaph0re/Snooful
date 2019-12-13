const vader = require('vader-sentiment');

const url = require("url-escape-tag");
var commaNumber = require('comma-number')
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27017';


var pfp_url = ""

module.exports = {
	arguments: [{
		description: "Show user stats for channel (IN DEV)",
		key: "query",
		type: "string",
	}],
	description: "Show user stats for channel (IN DEV)",
	handler: args => {
		message = args.query
		// console.log(message);

		// const input = message;
		// const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(input);

		// console.log("message: " + message + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")");
		// args.send("message: " + message + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")")

		function firstAndLast(myArray) {
			var firstItem = myArray[0];
			var lastItem = myArray[myArray.length - 1];

			var objOutput = {
				first: firstItem,
				last: lastItem
			};

			return objOutput;
		}

		function parseUsername(username) {
			if (username.startsWith("u/", 0)) {
				// console.log("username starts with u/, removing")
				return username = username.replace("u/", "");
			}
			if (username.startsWith("@", 0)) {
				// console.log("username starts with u/, removing")
				return username = username.replace("@", "");
			}
			return username;
		}

		function truncate(string) {
			if (string.length > 200)
				return string.substring(0, 200) + '...';
			else
				return string;
		};

		// check if a username was provided
		if (args.query === undefined) {
			console.log("[+] no username provided")
			console.log("[+] using args.author as username")
			var username = args.author;
		} else {
			username = parseUsername(args.query)
			console.log("[+] username provided")
			console.log("[+] username = " + username);








		}
		// remove u/ and @ from in front of username
		console.log("[+] username: " + username);

		//console.log(args.channel)
		var custom_chan = "Shoot The Shit"

		// args.channel.name == custom_chan;
		// if(args.channel.name == ''){
		// 	console.log("[+] args.channel.name is undefined")
		// 	// args.channel.name = 'Shoot The Shit'
		// 	//console.log(args.channel.name);

		// 	console.log("[+] checking if this is a DM")
		// 	if(args.channel.customType == 'direct'){
		// 		console.log("[+] yes this is a DM")
		// 		args.send("the score command cannot be used in DM")
		// 		return;

		// 	} else {
		// 		console.log("[+] this is not a DM")
		// 	}
		// 	return;

		// }
		console.log("=========")
		//console.log(args.channel);
		console.log("=========")
		// var qChan = custom_chan
		var qChan = args.channel.name
		var qUser = username


		console.log("[+] qChan: " + qChan);
		console.log("[+] qUser: " + qUser);
		// args.send("[+] Calculating Channel Stats... ")

		MongoClient.connect(mongourl, function (err, db) {
			if (err) throw err;
			var dbo = db.db("chatdb");
			dbo.collection('chat_collection').aggregate([{
					$match: {
						sender: qUser
					}
				},

				{
					"$group": {
						"_id": {
							"channel": "$channel",
							"sender": "$sender"
						},
						"count": {
							"$sum": 1
						}
					}
				},
				{
					$sort: {
						count: -1
					}
				},
				{
					$limit: 5
				}
			]).toArray(function (err, res) {
				if (err) throw err;
				// console.log(JSON.stringify(res));
				//console.log(res);
				// console.log("Top 10 active members");
				// var table = new AsciiTable('Top 10 active members')
				// table
				//   .setHeading('User', 'Count')
				console.log(res[0]._id.sender);

				var final = "Top 5 active channels for " + res[0]._id.sender;
				res.forEach(function (result) {
					final += "\n" + result._id.channel + ": " + commaNumber(result.count);
					// table.addRow(result._id. sender, result.count)
					//console.log(result._id. sender + ": " + commaNumber(result.count))
				});

				args.send(final)
				// console.log(table.toString())
				console.log(final)
				// console.log(res._id + " " + res._id. sender + " " + res.count)

				db.close();
			});
		});

	},
	name: "userstats",
};