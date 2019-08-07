const vader = require('vader-sentiment');

const url = require("url-escape-tag");

// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

// var ta = require('./timeago.js')
const MongoClient = require('mongodb').MongoClient;
const mongourl = 'mongodb://localhost:27017';
var ta = require("time-ago")

var pfp_url = ""

module.exports = {
	arguments: [{
		description: "Get random chat quote",
		key: "query",
		type: "string",
	}],
	description: "Get random chat quote",
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

		function lastMsg(myArray) {
			var lastItem = myArray[0];
			
			 var objOutput = {
				 last : lastItem
				};
			
			return objOutput.last;
		}
					//args.send(usrMsgs.sender + " was last seen in [" + usrMsgs.channel + "] " + ta.ago(usrMsgs.time) + " (" + onDate + ") saying: \"" + usrMsgs.message + "\"")

		
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
			
			// console.log("[+] checking if this is a DM")
			// if(args.channel.customType == 'direct'){
			// 	console.log("[+] yes this is a DM")
			// 	args.send("this command cannot be used in DM")
			// 	return;

			// } else {
			// 	console.log("[+] this is not a DM")
			// }
			// return;

		}
		console.log("=========")
		//console.log(args.channel);
		console.log("=========")
		// var qChan = args.channel.name-seen navkthx
		var qChan = args.channel.name //"Shoot The Shit" //args.channel.name //
		var qUser = username
		console.log("[+] qChan: " + qChan);
		console.log("[+] qUser: " + qUser);
		  MongoClient.connect(mongourl, function(err, db) {
			if (err) throw err;
			var dbo = db.db("chatdb");
		  
		  
			dbo.collection("quote_collection")
			// .find({"channel":qChan, "sender":qUser})
			.find({"channel":qChan})
			.toArray(function(err, items) {
				console.log(items);
				if(items.length > 0){


					var quote = items[Math.floor(Math.random()*items.length)];

					//var usrMsgs = lastMsg(items);
					//var onDate = new Date(usrMsgs.time);
					//console.log("onDate: " + onDate);
					
					//console.log(usrMsgs.sender + " was last seen in [#" + usrMsgs.channel + "] " + ta.ago(usrMsgs.time) + " on " + onDate + " saying: \"" + usrMsgs.message + "\"")
					console.log(quote['sender'] + ": " + "\"" + quote['quote'] + "\"")
					args.send(quote['sender'] + ": " + "\"" + quote['quote'] + "\"")
					//args.send(usrMsgs.sender + " was last seen in [#" + usrMsgs.channel + "] " + ta.ago(usrMsgs.time) + " (" + onDate + ") saying: \"" + usrMsgs.message + "\"")
		
					// if(usrMsgs.length > 0){
					// } else {
					// 	console.log("[+] could get score because not enough items")
					// }
				
				}
				db.close();
			});
		  
		});

	},
	name: "quote",
};