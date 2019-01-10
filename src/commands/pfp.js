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
	description: "gets reddit pfp of a user",
	handler: args => {
        username=args.query
        console.log(username);
        if (username.startsWith("u/", 0)){
            // console.log("username starts with u/, removing")
            // remove u/ from in front of username
            username = username.replace("u/", "");          
        } else {
            // console.log("username does NOT start with u/")
        }
        

        pfp_url=url`https://www.reddit.com/user/${username}`;
        console.log(pfp_url)


        // args.send(pfp_url);


        request(pfp_url+"", async (err, res, bdy) => {
            // console.log(bdy);
            
            var xml = bdy
            var doc = new dom().parseFromString(xml)
            var nodes = xpath.select('//*[@id="SHORTCUT_FOCUSABLE_DIV"]/header/div/div[1]/div[1]/button/img', doc)
            
            //console.log(nodes)
            
            // console.log(nodes[0] + ": " + nodes[0].firstChild)
            if(nodes[0].toString()) {
                pfp_reddit_username = nodes[0].toString()
                // console.log("profile pic: " + pfp_reddit_username)
                
                var myRegex = /(?:)https(.*)(.jpg|.png)/g;
                var test = pfp_reddit_username;
                
                pfp_src = myRegex.exec(test)
                // console.log("trying to parse via regex")
                // console.log(pfp_src[0]);
                args.send(pfp_src[0])
            }
            // args.send("error, make sure username is correct")
        })
    },
	name: "pfp",
};