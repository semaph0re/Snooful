const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
    aliases: [
		"unzips",
	],
	arguments: [{
		description: "unzip",
		key: "query",
		type: "string",
	}],
	description: "unzip",
	handler: args => {

        args.send("*" + args.author + " fucking unzips his pants and starts wanking to the shitshow*");

    },
	name: "unzip",
};