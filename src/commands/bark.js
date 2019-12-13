const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "bark - woof woof",
		key: "query",
		type: "string",
	}],
	description: "bark - woof woof",
	handler: args => {


        args.send("*" + args.author + " runs around like a puppy and barks, WOOF WOOF!*");

    },
	name: "bark",
};