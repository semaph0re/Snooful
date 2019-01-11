module.exports = {
	aliases: [
		"repeat",
	],
	arguments: [{
		description: "The message to echo.",
		key: "text",
		type: "string",
	}],
	description: "Repeats a message.",
	handler: args => {
		args.send("Sorry, you're a faggot");
	},
	name: "echo",
};