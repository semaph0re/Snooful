/* eslint camelcase: off  */

module.exports = {
	apps: [{
		autorestart: true,
		env: {
			DEBUG: "snooful:*",
			NODE_ENV: "development",
		},
		env_development: {
			DEBUG: "snooful:*",
			NODE_ENV: "development",
		},
		instances: 1,
		name: "Snooful",
		script: "./src/index.js",
	}],
};