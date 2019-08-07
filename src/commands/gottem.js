const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {

	arguments: [{
		description: "ladies and gentleman, we gottem",
		key: "query",
		type: "string",
	}],
	description: "gottem",
	handler: args => {

        


		
        args.send("https://imgur.com/r/phillies/vIKMoye");
        //args.send("https://i.imgur.com/vIKMoye.gif"); //orig
        //args.send("https://media1.giphy.com/media/xT9Igtjxw42qVPziy4/source.gif");

    },
	name: "gottem",
};