const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");
const cheerio = require('cheerio')
var pfp_url = ""

module.exports = {
	arguments: [{
		description: "Would you rather",
		key: "query",
		type: "string",
	}],
	description: "Would you rather",
	handler: args => {
        username=args.query

        function parseUsername(username) {
			if (username.startsWith("u/", 0)){
				// console.log("username starts with u/, removing")
				return username = username.replace("u/", "");          
			}
			if (username.startsWith("@", 0)){
				// console.log("username starts with u/, removing")
				return username = username.replace("@", "");          
			}
			return username;
		}


        pfp_url=url`http://either.io/`;
        console.log(pfp_url)


        // args.send(pfp_url);


        request(pfp_url+"", async (err, res, bdy) => {
            // console.log(bdy);
            if(err){
                console.log("error error error ")
                console.log(err)
            }
            
            var html = bdy

            // console.log(html)
        
            const $ = cheerio.load(html)
            const txt = $('#question > div > div:nth-child(2) > div.options > div.choice-block.blue-choice > table > tbody > tr > td > div.option > a').text()
            const txt2 = $('#question > div > div:nth-child(2) > div.options > div.choice-block.red-choice > table > tbody > tr > td > div.option > a').text()
        
            const choice1 = txt.replace(/^\s+|\s+$/g, '');
            const choice2 = txt2.replace(/^\s+|\s+$/g, '');
        
            var final_question = "Would you rather: \n" +
            "A) " + choice1 + "\n" +
            "B) " + choice2;
        
            console.log(final_question)
            args.send(final_question)
        })
    },
	name: "wyr",
};