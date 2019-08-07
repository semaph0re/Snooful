const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "Reddit Profile Picture",
		key: "query",
		type: "string",
	}],
	description: "gets a users reddit profile picture",
	handler: args => {
        username=args.query

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


        if(username === undefined) {
            console.log("pfp: no username provided! try !pfp <username>");
            args.send("pfp: no username provided. try !pfp <username>")
        } else {
			username=parseUsername(args.query)
		}
		console.log("[+] username: " + username);

        
        if(username == "Phil_Phil_Connors ") {
            args.send("https://styles.redditmedia.com/t5_10pi6c/styles/profileIcon_ti6uijrptmv21.jpg")
            return true;
        }

        pfp_url=url`https://www.reddit.com/user/${username}`;
        console.log(pfp_url)


        // args.send(pfp_url);


        request(pfp_url+"", async (err, res, bdy) => {
            // console.log(bdy);
            if(err){
                console.log("error error error ")
                console.log(err)
            }
            
            var xml = bdy
            var doc = new dom().parseFromString(xml)
            // var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/header/div/div[1]/div[1]/button/img', doc)
            var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[1]/header/div/div[1]/div[1]/button/img', doc)
            
            //var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/div[2]/div/div/div/div[2]/div[4]/div[2]/div/div[1]/div/div[2]/div', doc)
            
            //console.log(nodes)
            
            //console.log(nodes[0] + ": " + nodes[0].firstChild)
            if(nodes[0].toString()) {
                pfp_reddit_username = nodes[0].toString()
                // console.log("profile pic: " + pfp_reddit_username)
                
                var myRegex = /(?:)https(.*)(.JPG|.jpg|.jpeg|.JPEG|.png|.PNG|.gif)/g;
                var test = pfp_reddit_username;
                
                pfp_src = myRegex.exec(test)
                // console.log("trying to parse via regex")
                console.log(pfp_src[0]);
                args.send(pfp_src[0])
            }
            // args.send("error, make sure username is correct")
        })
    },
	name: "pfp",
};