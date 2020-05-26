const vader = require('vader-sentiment');

const url = require("url-escape-tag");

// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27017';


var pfp_url = ""

module.exports = {
	arguments: [{
		description: "See the most postive and negative comments for a user",
		key: "query",
		type: "string",
	}],
	description: "See the most postive and negative comments for a user",
	handler: args => {
        message=args.query
        // console.log(message);

        // const input = message;
        // const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(input);

        // console.log("message: " + message + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")");
		// args.send("message: " + message + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")")
		
		function firstAndLast(myArray) {
			var firstItem = myArray[0];
			var lastItem = myArray[myArray.length-1];
			
			 var objOutput = {
			   first : firstItem,
			   last : lastItem
			  };
			
			return objOutput;
		}
			
		function parseUsername(username) {
			if (username.startsWith("u/", 0)){
				// console.log("username starts with u/, removing")
				return username = username.replace("u/", "");          
			}
			if (username.startsWith("@", 0)){
				// console.log("username starts with u/, removing")
				return username = username.replace("@", "");          
			}
			return username;
		}
		function truncate(string){
			if (string.length > 200)
				 return string.substring(0,200)+'...';
			else
				 return string;
		};

		// check if a username was provided
		if(args.query === undefined){
			console.log("[+] no username provided")
			var username=args.author;
		} else {
			username=parseUsername(args.query)
		}
		// remove u/ and @ from in front of username
		console.log("[+] username: " + username);

		//console.log(args.channel)

		if(args.channel.name == ''){
			console.log("[+] args.channel.name is undefined")
			// args.channel.name = 'Shoot The Shit'
			//console.log(args.channel.name);
			
			console.log("[+] checking if this is a DM")
			if(args.channel.customType == 'direct'){
				console.log("[+] yes this is a DM")
				args.send("the score command cannot be used in DM")
				return;

			} else {
				console.log("[+] this is not a DM")
			}
			return;

		}
		console.log("=========")
		//console.log(args.channel);
		console.log("=========")
		var qChan = args.channel.name
		var qUser = username
		console.log("[+] qChan: " + qChan);
		console.log("[+] qUser: " + qUser);
		  MongoClient.connect(mongourl, function(err, db) {
			if (err) throw err;
			var dbo = db.db("chatdb");
		  
		  
			dbo.collection("chat_collection")
			.find({channel: qChan, sender: qUser, time: {
				$gte: new Date(new Date().getTime()-86400 * 7 *1000).toISOString() //86400 seconds in a day * 7 days * 1000 to conv from ms to seconds
			}})
			.sort({"sentiment.compound": -1})
			.toArray(function(err, items) {
				if(items.length > 0){
					console.log("items:" + items);
					var usrMsgs = firstAndLast(items);

					if(usrMsgs.first.message && usrMsgs.first.sentiment.compound && usrMsgs.last.message && usrMsgs.last.sentiment.compound) {
						sender = qUser
						mostPosMsg = truncate(usrMsgs.first.message);
						posScore = usrMsgs.first.sentiment.compound;
						console.log("[+] posScore: " + posScore);
						mostNegMsg = truncate(usrMsgs.last.message)
						negScore = usrMsgs.last.sentiment.compound;
						console.log("[+] negScore: " + negScore);
						// console.log(sender);
						// console.log(mostPosMsg);
						// console.log(mostNegMsg);
						
						console.log("user " + sender + "'s most positive comment was: \"" + mostPosMsg  + "\" (score: " + posScore + ") and most negative was: \"" + mostNegMsg + "\" (score: " + negScore + ")")
						args.send("user " + sender + "'s most positive comment was: \"" + mostPosMsg  + "\" (score: " + posScore + ") and most negative was: \"" + mostNegMsg + "\" (score: " + negScore + ")")
						db.close();
					}


					// if(usrMsgs.length > 0){
					// } else {
					// 	console.log("[+] could get score because not enough items")
					// }
				}


			});
		  
		});

	},
	name: "score",
};