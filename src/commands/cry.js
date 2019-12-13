const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "cry",
		key: "query",
		type: "string",
	}],
	description: "cry",
	handler: args => {


        args.send("*" + args.author + " cries like a baby, WAAAHHH!*");

    },
	name: "cry",
};