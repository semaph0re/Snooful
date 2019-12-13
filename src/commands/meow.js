const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "fuckin meow",
		key: "query",
		type: "string",
	}],
	description: "fuckin meow",
	handler: args => {


        //args.send("*" + args.author + " fucking meows*");
        //args.send("*" + args.author + " fucking meows*");
        args.send("*" + args.author + " meows intensely*");
        //args.send("*MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW*");
		
    },
	name: "meow",
};