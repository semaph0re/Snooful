const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
    aliases: [
		"farts",
	],
	arguments: [{
		description: "fart",
		key: "query",
		type: "string",
	}],
	description: "fart",
	handler: args => {
        // username=args.query
        // console.log(username);
        // if (username.startsWith("u/", 0)){
        //     // console.log("username starts with u/, removing")
        //     // remove u/ from in front of username
        //     username = username.replace("u/", "");          
        // } else {
        //     // console.log("username does NOT start with u/")
        // }
        

        // pfp_url=url`https://www.reddit.com/user/${username}`;
        // console.log(pfp_url)


        args.send("*" + args.author + " fuckin farts*");

    },
	name: "fart",
};