// const altCase = require("alternating-case");

module.exports = {
	aliases: [
		"yell",
	],
	arguments: [{
		description: "Scream out something.",
		key: "text",
		required: true,
		type: "string",
	}],
	description: "MAKES A MESSAGE ALL CAPS.",
	handler: args => {
		//const transformed = altCase(args.text);
		var msg = args.text
		return args.send(msg.toUpperCase());
	},
	name: "scream",
};