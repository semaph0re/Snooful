const urbanDict = require("urban-dictionary");

module.exports = {
	aliases: [
		"urbandict",
		"urbandictionary",
	],
	arguments: [{
		description: "The term to define.",
		key: "term",
		type: "string",
	}],
	describe: "Gets a term from Urban Dictionary.",
	handler: args => {
	function truncate(string){
		if (string.length > 350)
				return string.substring(0,350)+'...';
		else
				return string;
	 };
	 
	 if (args.term) {
			urbanDict.term(args.term).then(result => {
				const entry = result.entries[0];
				args.send([
					`${entry.word} ${args.localize("definition_vote_count", entry.thumbs_up)}`,
					"",
					truncate(entry.definition),
				].join("\n"));
			}).catch(() => {
				// args.send(args.localize("urban_dictionary_no_result"));
			});
		} else {
			// args.send(args.localize("urban_dictionary_unspecified_word"));
		}
	},
	name: "urban",
};
