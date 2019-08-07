const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var mod_list_url = ""



module.exports = {
	aliases: [
		"banmessage",
		"setbanmsg",
		"banmsg"
	],
	arguments: [{
		description: "The new ban message.",
		key: "ban-message",
		type: "string",
	}],
	description: "Sets the message announced after a user is banned.",
	handler: args => {




        username=args.author

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

        //var username = "navkthx";
        // if(username === undefined) {
        //     console.log("pfp: no username provided! try !pfp <username>");
        //     args.send("pfp: no username provided. try !pfp <username>")
        // } else {
		// 	username=parseUsername(args.query)
		// }
		console.log("[+] username: " + username);

        var sub = args.chData.subreddit.name;
        console.log(sub)

        mod_list_url=url`https://www.reddit.com/r/${sub}/about/moderators.json`;
        // mod_list_url=url`https://www.reddit.com/user/${username}`;
        console.log(mod_list_url)


        //args.send(mod_list_url);


        request(mod_list_url+"", async (err, res, bdy) => {
            //console.log(bdy);

            var parsed = JSON.parse(bdy);

            console.log(parsed)
            //this is the actual array we'll be working with
            var modListArray = [];
            
            // this one is to produce a nice list in the chan
            var modlist = "";

            parsed.data.children.forEach(function(child) {
                var modName = child.name.replace(/,/g,"");
                //console.log(modName);
                modlist = modlist + modName.replace(/,/g,"") + "\n";
                modListArray.push(modName);
            });
            //console.log(modListArray);
            //console.log(modlist);

            //args.send(modlist);
            if(err){
                console.log("[+] ERROR retreiving mod list!")
                console.log(err)
            }
            
            //console.log(username);
            //console.log(modListArray);
            //console.log(modListArray.includes(username));

            if(modListArray.includes(username)) {
                console.log("i am a mod in " + sub)
				// args.send("i am a mod in " + sub)

				console.log("[+] new ban message set by: " + username);
				// console.log(args);
				const oldMsg = args.settings.get("ban_message");
				if (args.banMessage) {
					if (oldMsg === args.banMessage) {
						args.send(args.localize("update_ban_message_no_change"));
					} else {
						args.settings.set("ban_message", args.banMessage);
						args.send(args.localize("update_ban_message"));
					}
				} else if (oldMsg === undefined) {
					args.send(args.localize("clear_ban_message_no_change"));
				} else {
					args.settings.clear("ban_message");
					args.send(args.localize("clear_ban_message"));
				}				

            } else {
                console.log("i am NOT mod in " + sub)
                args.send("Command only available to mods")
            }

            console.log(sub)
        })








		if(args.author == "navkthx") {

		}
	},
	longDescription: "Sets the message that is sent when a user is banned from the channel. {USER} is replaced with the user's name.",
	name: "setbanmessage",
};