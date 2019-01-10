const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
    aliases: [
		"scream",
		"AA",
		"AAA",
		"AAAA",
		"AAAAA",
		"AAAAAA",
		"AAAAAAA",
		"AAAAAAAA",
		"AAAAAAAAA",
		"AAAAAAAAAA",
		"AAAAAAAAAAA",
		"AAAAAAAAAAAA",
		"AAAAAAAAAAAAA",
		"AAAAAAAAAAAAAA",
		"AAAAAAAAAAAAAAA",
		"AAAAAAAAAAAAAAAA"
	],
	arguments: [{
		description: "AAAAA",
		key: "query",
		type: "string",
	}],
	description: "AAAAA",
	handler: args => {
        username=args.query
        console.log(username);


        args.send("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA u/Mickthebrick1");


    },
	name: "AAAAA",
};