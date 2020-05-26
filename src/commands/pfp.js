const url = require("url-escape-tag");
// const program = require("commander");
const request = require("request");

var pfp_url = ""

module.exports = {
	arguments: [{
		description: "Reddit Profile Picture",
		key: "query",
		type: "string",
	}],
	description: "gets a users reddit profile picture",
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


        if(username === undefined) {
            console.log("pfp: no username provided! try !pfp <username>");
            args.send("pfp: no username provided. try !pfp <username>")
        } else {
			username=parseUsername(args.query)
		}
		console.log("[+] username: " + username);


        pfp_url=url`https://www.reddit.com/user/${username}/about.json`;
        console.log(pfp_url)



        request(pfp_url+"", async (err, res, bdy) => {
            //console.log(bdy);

            var parsed = JSON.parse(bdy);

            console.log(parsed.data)



			var stringed = JSON.stringify(parsed.data.icon_img);
			var myRegex = /(?:)https(.*)(.JPG|.jpg|.jpeg|.JPEG|.png|.PNG|.gif)/g;
			//var test = stringed;
			
			pfp_src = myRegex.exec(stringed)
			// console.log("trying to parse via regex")
			console.log(pfp_src[0]);
            args.send(pfp_src[0]);


            if(err){
                console.log("[+] ERROR retreiving pfp!")
                console.log(err)
            }
            
            // console.log(parsed.text);
        })




        
    },
	name: "pfp",
};