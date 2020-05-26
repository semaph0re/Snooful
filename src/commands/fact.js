const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var mod_list_url = ""

module.exports = {
	aliases: [
		"randfact",
        "facts",
		"rf",
        
	],
	arguments: [{
		description: "Get a random fact",
		key: "query",
		type: "string",
	}],
	description: "Get a random fact",
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

        // mod_list_url=url`https://www.reddit.com/r/${sub}/about/moderators.json`;
        // mod_list_url=url`https://www.reddit.com/user/${username}`;

        mod_list_url=url`https://uselessfacts.jsph.pl/random.json?language=en`;

        console.log(mod_list_url)


        request(mod_list_url+"", async (err, res, bdy) => {
            //console.log(bdy);

            var parsed = JSON.parse(bdy);

            console.log(parsed.text)

            args.send(parsed.text);
            if(err){
                console.log("[+] ERROR retreiving fact!")
                console.log(err)
            }
            
            console.log(parsed.text);
        })
    },
	name: "fact",
};