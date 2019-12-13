const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "ask the magic 8 ball",
		key: "query",
		type: "string",
	}],
	description: "ask the magic 8 ball",
	handler: args => {

	var items = [
		"Absolutely.",
		"Damn right.",
		"For sure",
		"Hell yeah!",
		"It very well could be",
		"Ha! Wait, you're serious?",
		"Why the hell are you asking me?",
		"If Allah wills it",
		"Yes! No. . . wait. Hold on. Yes? What was the question?",
		"Are you kidding me?",
		"Signs point to no",
		"What the hell!? No!",
		"No chance.",
		"Seems unlikely.",
		"No chance in hell",
		"As I see it, yes.",
		"Ask again later.",
		"Better not tell you now.",
		"Cannot predict now.",
		"Concentrate and ask again.",
		"Don’t count on it.",
		"It is certain.",
		"It is decidedly so.",
		"Most likely.",
		"My reply is no.",
		"My sources say no.",
		"Outlook not so good.",
		"Outlook good.",
		"Reply hazy, try again.",
		"Signs point to yes.",
		"Very doubtful.",
		"Without a doubt.",
		"Yes.",
		"Yes – definitely.",
		"You may rely on it.",
		"Why the hell are you asking me?",
		"As I see it, yes.",
		"Ask again later.",
		"Better not tell you now.",
		"Cannot predict now.",
		"Concentrate and ask again.",
		"Don’t count on it.",
		"It is certain.",
		"It is decidedly so.",
		"Most likely.",
		"My reply is no.",
		"My sources say no.",
		"Outlook not so good.",
		"Outlook good.",
		"Reply hazy, try again.",
		"Signs point to yes.",
		"Very doubtful.",
		"Without a doubt.",
		"Yes.",
		"Yes – definitely.",
		"You may rely on it."

	]
	ran = function pickRandomFromArray(inputArray) {
		return items[Math.floor(Math.random()*inputArray.length)];
	}

	var quote = ran(items)

console.log (quote);
        args.send("" + quote + "");
        //args.send("*MEOW MEOW MEOW MEOW MEOW MEOW MEOW MEOW*");
		
    },
	name: "8ball",
};