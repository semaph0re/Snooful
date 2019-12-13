const btcValue = require('btc-value');






module.exports = {
	arguments: [{
		description: "Get the current BTC Price",
		key: "query",
		type: "string",
	}],
	description: "Get the current BTC Price",
	handler: args => {



		// Print the current value as a decimal number if `isDecimal` is `true`
		btcValue({ isDecimal: true }).then(value => {
			console.log('$' + value);
			args.send('Current Bitcoin Price: $' + value)

			// => e.g. $11048.10
		});



	},
	name: "btc",
};