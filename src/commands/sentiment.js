const vader = require('vader-sentiment');

const url = require("url-escape-tag");

// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

const JSONdb = require('simple-json-db');
const navjsondb = new JSONdb('./../../chatdb/chats.json');


var pfp_url = ""

module.exports = {
	aliases: [
		"vader"
	],
	arguments: [{
		description: "VADER Sentiment Analysis (text string)",
		key: "query",
		type: "string",
	}],
	description: "Performs VADER sentiment analysis on a text string",
	handler: args => {
        message=args.query
        console.log(message);

        const input = message;
        const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(input);

        console.log("message: " + message + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")");
        args.send("message: " + message + " (" + "negative: " + intensity.neg + " neutral: " + intensity.neu + " positive: " + intensity.pos + " composite: " + intensity.compound + ")")
    },
	name: "sentiment",
};