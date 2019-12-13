const navtools = require("./../../utils/navtools.js");


module.exports = {
	arguments: [{
		description: "The ID of the FAQ message to change.",
		key: "id",
		type: "string",
	}, {
		description: "The message to set the FAQ to.",
		key: "value",
		type: "string",
	}],
	description: "Sets or creates a FAQ message.",
	handler: args => {
		console.log(args.value)
		console.log("[+] args.value => " + args.value)


		//console.log(navtools.check_if_string_contains_url(args.value));


		if (navtools.check_if_string_contains_url(args.value) === true) {
			//contains a URL
			console.log(args.value);

			console.log("msg contains a URL");
			args.send("URLs are not allowed in FAQ messages.");
		} else {
			console.log("msg does NOT contain a URL");
			//args.send("msg does NOT contain a URL");

			if (args.id) {
				const msgs = args.settings.get("faq_messages") || {};
				const idDoesExist = msgs[args.id] !== undefined;

				if (args.value) {
					msgs[args.id] = args.value;
					args.settings.set("faq_messages", msgs);

					args.send(idDoesExist ? args.localize("set_faq_message_success_update", args.id) : args.localize("set_faq_message_success_create", args.id));
				} else {
					args.send(args.localize("set_faq_message_unspecified", args.prefix));
				}
			} else {
				args.send(args.localize("set_faq_id_unspecified", args.prefix));
			}

		}






	},
	name: "setfaq",
};