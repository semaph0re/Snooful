const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var mod_list_url = ""

module.exports = {
	aliases: [
		"dogfacts",
        "dfact",
		"df",
        
	],
	arguments: [{
		description: "Get a random dog fact",
		key: "query",
		type: "string",
	}],
	description: "Get a random dog fact",
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

        mod_list_url=url`https://dog-api.kinduff.com/api/facts?number=1`;

        console.log(mod_list_url)


        //args.send(mod_list_url);


        request(mod_list_url+"", async (err, res, bdy) => {
            //console.log(bdy);

            var parsed = JSON.parse(bdy);
            var final_output = parsed.facts[0];
            console.log(final_output)
            //this is the actual array we'll be working with
            // var modListArray = [];
            
            // // this one is to produce a nice list in the chan
            // var modlist = "";

            // parsed.data.children.forEach(function(child) {
            //     var modName = child.name.replace(/,/g,"");
            //     //console.log(modName);
            //     modlist = modlist + modName.replace(/,/g,"") + "\n";
            //     modListArray.push(modName);
            // });
            // console.log(modListArray);
            // console.log(modlist);

            args.send(final_output);
            if(err){
                console.log("[+] ERROR retreiving cat fact!")
                console.log(err)
            }
            
            console.log(final_output);
            // console.log(modListArray);
            // console.log(modListArray.includes(username));

            // if(modListArray.includes(username)) {
            //     console.log("i am a mod in " + sub)
            //     args.send("i am a mod in " + sub)
            // } else {
            //     console.log("i am NOT mod in " + sub)
            //     args.send("i am NOT mod in " + sub)
            // }

            // console.log(sub)
            //console.log(args);
            // var xml = bdy
            // var doc = new dom().parseFromString(xml)
            // // var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/header/div/div[1]/div[1]/button/img', doc)
            // var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[1]/header/div/div[1]/div[1]/button/img', doc)
            
            // //var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[2]/div/div/div/div[2]/div[4]/div[2]/div/div[1]/div/div[2]/div', doc)
            
            // console.log(nodes)
            
            //console.log(nodes[0] + ": " + nodes[0].firstChild)
            // if(nodes[0].toString()) {
            //     pfp_reddit_username = nodes[0].toString()
            //     // console.log("profile pic: " + pfp_reddit_username)
                
            //     var myRegex = /(?:)https(.*)(.JPG|.jpg|.jpeg|.JPEG|.png|.PNG|.gif)/g;
            //     var test = pfp_reddit_username;
                
            //     pfp_src = myRegex.exec(test)
            //     // console.log("trying to parse via regex")
            //     console.log(pfp_src[0]);
            //     args.send(pfp_src[0])
            // }
            // args.send("error, make sure username is correct")
        })
    },
	name: "dogfact",
};