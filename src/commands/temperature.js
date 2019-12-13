const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
var pfp_url = ""



module.exports = {
    aliases: [
        "temp",
        "t"
	],
	arguments: [{
		description: "convert temperature",
		key: "query",
		type: "string",
	}],
	description: "convert temperature",
	handler: args => {

			//args.send("test");
		function cToF(celsius) 
		{
		  var cTemp = celsius;
		  var cToFahr = cTemp * 9 / 5 + 32;
		  var message = cTemp+'\xB0C is ' + cToFahr + ' \xB0F.';
			console.log(message);
			return(message);
		}

		function fToC(fahrenheit) 
		{
		  var fTemp = fahrenheit;
		  var fToCel = (fTemp - 32) * 5 / 9;
		  var message = fTemp+'\xB0F is ' + fToCel + '\xB0C.';
			console.log(message);
			return(message);
		} 

		var temp = args.query
		var thenum = temp.match(/\d+/)[0] // "3"

		if(temp.includes("c") || temp.includes("C")) {
			console.log("[+] convert from celcius")
			console.log("[+] " + thenum)
			console.log(cToF(thenum))
			args.send(cToF(thenum));
		}

		if(temp.includes("f") || temp.includes("F")) {
			console.log("[+] convert from fehrenheit")
			console.log("[+] " + thenum)
			console.log(fToC(thenum))
			args.send(fToC(thenum));
		}
					//args.send("test2 ");

    },
	name: "temperature",
};