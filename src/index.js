// Used to expose version and include config from `snooful` object
// var bot_chat_access_token = "14fba4db0e6710998b1b4e91bac2d358e3833439";
const FormData = require("form-data");
const { CookieJar } = require("tough-cookie");
const got = require("got");

var getJSON=require('get-json')
const { version, snooful } = require("./../package.json");

const config = {
	credentials: {},
	prefix: "!",
	settingsManager: "@snooful/sqlite-settings",
	...snooful,
	...require("./../config.json"),
};

const Snoowrap = require("snoowrap");

const log = require("./utils/debug.js");

const path = require("path");

// Set up in a way where legacy settings managers work too
const setMan = require(config.settingsManager);
const SettingsManager = setMan.SettingsManager || setMan;
const extension = setMan.extension || "";

log.settings("passing off settings handling to the '%s' module", config.settingsManager);
const settings = new SettingsManager(path.resolve("./settings" + extension));

const locales = require("./locales.json");
const format = require("string-format");
const upsidedown = require("upsidedown");

const pify = require("./utils/promisify");
const navtools = require("./utils/navtools.js");
const chance = new require("chance").Chance();


/**
 * The prefix required by commands to be considered by the bot.
 */
const prefix = config.prefix || "!" ;


const id = config.id;
const user = config.credentials.username;
const pass = config.credentials.password;


const parser = require("@snooful/orangered-parser");
const creq = require("clear-require");
const Sendbird = require("sendbird");
const sb = new Sendbird({
	appId: "2515BDA8-9D3A-47CF-9325-330BC37ADA13",
});
const GroupChannelHandler = new sb.GroupChannel();




/**
 * Selects a string.
 * @param {(object|*[]|*)} msg If an object, selects an key based on the weight value. If an array, picks a random element. Otherwise, converts to a string.
 */
function chanceFormats(msg) {
	if (Array.isArray(msg)) {
		return chance.pickone(msg);
	} else if (msg instanceof Object) {
		return chance.weighted(Object.keys(msg), Object.values(msg));
	} else {
		return msg.toString();
	}
}


/**
 * Reloads the commands.
 */
function reload() {
	parser.clear();
	creq.all();
	parser.registerDirectory("./src/commands");
}
reload();

/**
 * Logs an error to console.
 * @param {*} error The error that occurred.
 * @returns {string} The error message.
 */
function safeFail(error) {
	const errMsg = error instanceof Error ? error.message : error;
	log.main("an error occurred: %s", errMsg);
	return errMsg;
}
process.on("unhandledRejection", safeFail);
process.on("unhandledException", safeFail);

/**
 * The client information.
 */
let client = {};

/**
 * Formats a string.
 * @param {string} lang A language code. If the key is not localized in this language or this value is not provided, uses en-US.
 * @param {string} key The key to localize.
 * @param {...any} formats The values to provide for placeholders.
 * @return {?string} A string if a localization could be provided, or null.
 */
function localize(lang = "en-US", key = "", ...formats) {
	const thisLocal = lang ? (locales[lang] || locales["en-US"]) : locales["en-US"];
	const msg = thisLocal[key] || locales["en-US"][key];

	if (msg) {
		const msgChosen = chanceFormats(msg);

		const formatted = format(msgChosen, ...formats);
		return lang === "uǝ" ? upsidedown(formatted) : formatted;
	} else {
		return null;
	}
}

// We use this to make a channel's settings wrapper
const channelSub = require("./utils/channel-sub.js");
const moment = require("moment-timezone");
const eventMessageFactory = require("./utils/event-message-handler.js");

// var NoSQL = require('nosql');
// var nosqldb = NoSQL.load('./../chatdb/chats-nosql.json');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// NOT NEEDED ANYMORE SINCE NOW USING MONGODB
// const JSONdb = require('simple-json-db');
// const navjsondb = new JSONdb('./chatdb/chats.json');

const vader = require('vader-sentiment');

function getMessage(message_inp) {
	//console.log(message_inp);
}
/**
 * Runs a command.
 * @param {string} command The command to run, including prefix.
 * @param {*} channel The channel the command was sent from.
 * @param {*} message The message representing the command.
 * @returns {undefined} Nothing is returned.
 */
function handleCommand(command = "", channel = {}, message = {}) {


		// FOR ALL CHANNEL MESSAGES
		// log.commands("[%s: %s] %s: %s", moment().tz("EST"), channel.name, message._sender.nickname, command);
		var time=moment().tz("EST").format();
		console.log("----------------------------------------------------------------------------------------------------------------------------------")
		console.log('%s [%s] : [%s]: %s', time, channel.name, message._sender.nickname, command );
		//console.log(message._sender);
		
		// console.log(GroupChannelHandler.lastMessage())
		
		// var pushprefs = function(channel){
		// 	console.log("[PUSHPREF]")
		// console.log(channel)
		//console.log(message)
		// }





		
		if(channel.name == 'Shoot The Shit'){ //== 'Shoot The Shit'
			// console.log("[+] channel.lastMessage");
			//console.log(channel.lastMessage);
			//console.log(message);
			//console.log(channel.members);
			//console.log("read user list " + channel.cachedReadReceiptStatus);
			//console.log("channel: " + channel.name);
			
			//console.log("[+] channel: " + channel.name + ": cached members = " + Object.keys(channel.cachedReadReceiptStatus).length);
			// console.log("------------------------------------------------------------------------------------------------------------")
			//console.log(message);
			// console.log("dupmping GroupChannelHandler")
			// GroupChannelHandler.getPushPreference = (channel) => pushprefs(channel)
			// GroupChannelHandler.getPushPreference(channel)
		}
		// working but opens and closes connection everytime, mad inefficient!


		if(time && channel.name && message._sender.nickname && command){
			//console.log("write to db")
			writeme = {"time" : time, "channel" : channel.name, "sender" : message._sender.nickname, "command" : command}// console.log(writeme)
			//navjsondb.set(time, writeme);

			const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(command);

			// console.log("message: " + command + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")");
			
			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var dbo = db.db("chatdb-dev");
		
				var myobj = {
					"time": time,
					"channel": channel.name,
					"sender": message._sender.nickname,
					"message": command,
					"sentiment": intensity
				};
		
				dbo.collection("chat_collection").insertOne(myobj, function(err, res) {
					if (err) throw err;
					//console.log("1 document inserted");
					//db.close();
				});
				
				var my_disabled_cmds;
				var final = "";
				dbo.collection("permissions")
				// .find({"channel":qChan, "sender":args.query})
				.find({"channel":channel.name})
				//.limit(5)
				//.sort({"time": -1})
				.toArray(function(err, items) {

					my_disabled_cmds = items;
					console.log(items);
					// var num = 1;
					items.forEach(function(item){
						//console.log(num + ") " + item);
						console.log("===================");
						console.log(item.disabled_cmd);
						
					});
					//console.log(final);
					// args.send("The last 5 added quotes were: \n" + final)
	
					db.close();
				});
			});		

		} else {
			// console.log("dont write to db")
		}

		var prefix2='—'; //second trigger for u/Mickthebrick1
		//var command = command.toLowerCase();
		if (command.startsWith(prefix) || command.startsWith(prefix2) || command.includes(prefix2) && message._sender.nickname !== client.nickname) {
			var unprefixedCmd = command.replace(prefix, "");
			


			if(command.startsWith(prefix2)){
				var unprefixedCmd = command.replace(prefix2, "");
			}

			//find if the 2nd prefix exists anywhere in the string
			if(command.includes(prefix2)){
				var unprefixedCmd = command.substring(command.indexOf(prefix2) + 1);
				console.log(unprefixedCmd);
			}


			log.commands("received command '%s' from '%s' channel", unprefixedCmd, channel.name);
			console.log("received command '%s' from '%s' channel", unprefixedCmd, channel.name);

			const mongourl = 'mongodb://localhost:27017';

			MongoClient.connect(mongourl, function(err, db) {
				if (err) throw err;
				var dbo = db.db("chatdb-dev");
			  
				var final = "";
				dbo.collection("chan_settings_collection")
				.find({"channel":channel.name})
				// .find({"channel":qChan})
				// .limit(5)
				.sort({"time": -1})
				.toArray(function(err, items) {
					//console.log(items);

					var arrFound = items.filter(function(item) {
						//console.log(item);

						// check if user is banned
						return item.user == message._sender.nickname;
					  });
					  
					  console.log("arrFound");
					  console.log(arrFound.length);
					  if(arrFound.length > 0) {
						console.log("[+] user is banned from bot in this chan");
					} 

					var num = 1;
					// items.forEach(function(item){
					// 	//console.log(num + ") " + item);
					// 	final = final + num + ") " + item.user + "\n";
					// 	num++;
					// });
					// console.log(final);
					//args.send("Users banned from bot in #" + channel.name + ": \n" + final)
	
					db.close();
				});
				//safeFail("error");
			});

			let chData = {
				parsable: null,
			};
			if (channel.data) {
				try {
					chData = {
						parsable: true,
						...JSON.parse(channel.data),
					};
				} catch (error) {
					chData = {
						parsable: false,
					};
				}
			}

			const settingsWrapper = settings.subredditWrapper(channelSub(channel));

			try {
				parser.parse(unprefixedCmd, {
					author: message._sender.nickname,
					chData,
					channel,
					client,
					locales,
					/**
					 * Formats a string based on the set language of the subreddit/DM.
					 */
					localize: (...args) => {
						return localize(settingsWrapper.get("lang"), ...args);
					},
					localizeO: localize,
					log: log.commands,
					message,
					prefix,
					reddit,
					registry: parser.getCommandRegistry(),
					reload,
					sb,
					send: content => {
						return new Promise((resolve, reject) => {
							channel.sendUserMessage(content.toString(), (error, sentMessage) => {
								if (error) {
									reject(error);
								} else {
									resolve(sentMessage);
								}
							});
						});
					},
					settings: settingsWrapper,
					version,
				});
			} catch (error) {
				safeFail(error);
			}
		}

	
	
	
	
}

// Use error-first callbacks, like every other library does
sb.setErrorFirstCallback(true);

/**
 * Accepts invites to all channels with pending invitations.
 */
function acceptInvitesLate() {
	// Query for group channels
	const query = sb.GroupChannel.createMyGroupChannelListQuery();
	pify(query.next.bind(query)).then(list => {
		// Accept the invites!
		list.filter(channel => {
			return channel.myMemberState === "invited";
		}).forEach(channel => {
			pify(channel.acceptInvitation.bind(channel)).then(() => {
				log.invites("accepted late channel invitation to '%s'", channel.name);
			}).catch(() => {
				log.invites("failed to accept late channel invitation to '%s'", channel.name);
			});
		});
	}).catch(() => {
		log.invites("failed to get list of channels to accept late invites");
	});
}

const reddit = new Snoowrap(Object.assign(config.credentials, {
	userAgent: `NavSnooful v${version}`,
}));



// function launch() {
// 	// Fetch our access token.
// 	log.main("fetching new access token");
// 		const sb_access_token = bot_chat_access_token;
// 		// Get our Reddit user ID
// 		log.main("getting id");
// 			// We have both necessary values, so let's connect to Sendbird!
// 			log.main("connecting to sendbird");
// 			pify(sb.connect.bind(sb), "t2_4f7h8qpb", sb_access_token).then(userInfo => {
// 				// We did it! Let's store the user info in a higher scope.
// 				log.main("connected to sendbird");
// 				client = userInfo;
// 				console.log(client);

// 				// Let's catch up on the invites we might've missed while offline.
// 				acceptInvitesLate();
// 			}).catch((e) => {
// 				log.main("couldn't connect to sendbird");
// 				console.log(e);
// 			});
// }



/**
 * Grabs a new access token and connects to Sendbird.
 */
function launch() {
	const form = new FormData();
	form.append("user", user);
	form.append("passwd", pass);
	form.append("api_type", "json");

	// console.log("fetching session token");
	got.post({
		body: form,
		url: "https://ssl.reddit.com/api/login",
	}).then(res => {
		// console.log(res.body);
		const cookieJar = new CookieJar();
		cookieJar.setCookieSync("reddit_session=" + encodeURIComponent(JSON.parse(res.body).json.data.cookie), "https://s.reddit.com");

		// Fetch our access token.
		// console.log("fetching new access token");
		got({
			cookieJar,
			method: "get",
			url: "https://s.reddit.com/api/v1/sendbird/me",
		}).then(sbRes => {
			const sbInfo = JSON.parse(sbRes.body);
			// console.log(sbInfo);
			console.log(sbInfo.sb_access_token);
			// return sbInfo.sb_access_token;


			console.log("connecting to sendbird");
			pify(sb.connect.bind(sb), id, sbInfo.sb_access_token).then(userInfo => {
				// We did it! Let's store the user info in a higher scope.
				console.log("connected to sendbird");
				client = userInfo;
				console.log(client);

				// Let's catch up on the invites we might've missed while offline.
				acceptInvitesLate();
			}).catch((e) => {
				console.log("couldn't connect to sendbird");
				console.log(e);
			});

		}).catch(() => {
			console.log("could not get access token");
		});
	}).catch(() => {
		console.log("could not get session token");
	});
}



launch();

const channelHandler = new sb.ChannelHandler();


channelHandler.onMessageReceived = (channel, message) => handleCommand(message.message, channel, message);



channelHandler.onUserReceivedInvitation = (channel, inviter, invitees) => {
	if (invitees.map(invitee => invitee.nickname).includes(client.nickname)) {
		// I have been invited to a channel.
	
		log.invites("invited to channel");
		//console.log("[+] channel");
		//console.log(channel);
		
		//console.log("[+] inviter");
		//console.log(inviter);
		
		//console.log("[+] invitees");
		//console.log(invitees);

		var inviteruser = inviter.nickname;
		console.log("[+] INVITED BY: " + inviteruser)

		var obj = JSON.parse(channel.data)
		var sub = obj.subreddit.name;
		console.log("[+] TO SUBREDDIT: " + sub)

		var modListArray = [];
            
		// this one is to produce a nice list in the chan
		var modlist = "";

		mod_list_url="https://www.reddit.com/r/" + sub + "/about/moderators.json";
		getJSON(mod_list_url)
		.then(function(response) {
			//console.log(response.data.children);

			response.data.children.forEach(function(child) {
				var modName = child.name.replace(/,/g,"");
				//console.log(modName);
				modlist = modlist + modName.replace(/,/g,"") + "\n";
				modListArray.push(modName);
			});
			console.log(modListArray);
			//console.log(modlist);

            if(modListArray.includes(inviteruser)) {
                console.log("[+++] " + inviteruser + " is a mod in " + sub)
				//args.send("i am a mod in " + sub)
				

				// Let's join!
				pify(channel.acceptInvitation.bind(channel)).then(() => {
					log.invites(`automatically accepted channel invitation to ${channel.name}`);
					console.log("automatically accepted channel invitation to " + channel.name);

					// Now that we've joined, let's send our introductory message!
					pify(channel.sendUserMessage.bind(channel), channel.sendUserMessage(localize("en-US", "invite_message", {
						inviter: inviter.nickname,
						me: client.nickname,
						prefix,
					}))).then(() => {
						log.invites("sent introductory message");
						console.log("sent introductory message");

					}).catch(() => {
						//log.invites("failed to send introductory message");
						//console.log("failed to send introductory message");

					});
				}).catch(() => {
					log.invites("failed to accept channel invitation");
					console.log("failed to accept channel invitation");

				});

            } else {
                console.log("[!] I am NOT mod in " + sub)
				//args.send("Command only available to mods")
				
            }


		}).catch(function(error) {
		  console.log(error);
		});	

	}
};



channelHandler.onUserJoined = (channel, user) => {
	try {
		//console.log(settings);
		
		console.warn("User u/" + user.nickname + " has JOINED the channel: " + channel.name)
		if(channel.name == 'Shoot The Shit'){
			// args.send("*User " + user.nickname + " has JOINED the channel*")
			//pify(channel.sendUserMessage.bind(channel), channel.sendUserMessage("*User: " + user.nickname + " has been BANNED from channel*"))

		}
	} catch(error) {
		console.warn("A problem happened while reading JOIN message");
		console.warn(channel.name)
		console.warn(user)		
	}
}



channelHandler.onUserLeft = (channel, user) => {
	try {
		// console.warn("*User u/" + user.nickname + " has left the channel: " + channel.name + "*")
		console.warn("User u/" + user.nickname + " has LEFT the channel: " + channel.name)
		if(channel.name == 'Shoot The Shit'){
			// args.send("*User u/" + user.nickname + " has LEFT the channel*")
		}		
	} catch(error) {
		console.warn("A problem happened while reading LEAVE message");
		console.warn(channel.name)
		console.warn(user)
	}
}


channelHandler.onUserEntered  = (channel, user) => {
	try {
		console.warn("[+] user: " + user.nickname + " has ENTERED channel: " + channel.name)
	} catch(error) {
		console.warn("A problem happened while reading onUserEntered message");
		console.warn(channel.name)
		console.warn(user)
	}
}

channelHandler.onUserExited  = (channel, user) => {
	try {
		console.warn("[+] user: " + user.nickname + " has EXITED channel: " + channel.name)
	} catch(error) {
		console.warn("A problem happened while reading onUserExited message");
		console.warn(channel.name)
		// console.warn(user)
	}
}

channelHandler.onUserBanned  = (channel, user) => {
	try {
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)
		console.warn("[+] user: " + user.nickname + " has been BANNED from channel: " + channel.name)

		pify(channel.sendUserMessage.bind(channel), channel.sendUserMessage("*User: " + user.nickname + " has been BANNED from channel*"))
	} catch(error) {
		console.warn("A problem happened while reading onUserBanned message");
		console.warn(channel.name)
		// console.warn(user)
	}
}

// channelHandler.onTypingStatusUpdated  = (channel) => {
// 	try {
// 		console.warn("[+] user: _____"  + " is typing in channel: " + channel.name)
// 		// eventMessageFactory("typing", settings, user.nickname);
// 		console.warn(channel.getTypingMembers())
// 	} catch(error) {
// 		console.warn("A problem happened during event onTypingStatusUpdated ");
// 		console.warn(channel.name)
// 		//console.warn(user)
// 	}
// }

// channelHandler.onTypingStatusUpdated = eventMessageFactory("typing", settings, client);
channelHandler.onUserJoined = eventMessageFactory("join", settings, client.nickname);
channelHandler.onUserLeft = eventMessageFactory("leave", settings, client.nickname);
channelHandler.onUserBanned = eventMessageFactory("ban", settings, client.nickname);

sb.addChannelHandler("handler", channelHandler);
