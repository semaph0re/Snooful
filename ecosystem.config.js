/* eslint camelcase: off  */

module.exports = {
	apps: [{
		autorestart: true,
		env: {
			DEBUG: "navsnoobot:*",
			NODE_ENV: "development",
		},
		env_development: {
			DEBUG: "navsnoobot:*",
			NODE_ENV: "development",
		},
		instances: 1,
		name: "navsnoobot",
		script: "./src/index.js",
	}],
};