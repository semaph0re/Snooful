const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "meow",
		key: "query",
		type: "string",
	}],
	description: "meow",
	handler: args => {


        args.send("*" + args.author + " meows intensely*");
        //args.send("*MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW*");
		
    },
	name: "meow",
};