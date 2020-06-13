const discord = require('discord.js')
const bot = new discord.Client();
const config = require("./config.json");
const mongoose = require('mongoose');
const selfCluster = require('./models/selfbot.js');
const recent = new Map();
const dailies = new Map();
const repeat = new Map();
mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}`);
    let selfbot = await selfCluster.findOne({
        userID: bot.user.id
      });
      if(!selfbot){
        selfbot = new selfCluster({
            userID: bot.user.id,
            giveAmt: 0,
            type: ""
          });
      }
  });


var interval = setInterval (async function () {
		let daily = 8.64e+7 + 500;
	let cooldown = 40200;
	if(repeat.has("488249600264896523") && (Date.now() - repeat.get("488249600264896523")[0]) > 7.2e+6 - 1.8e+6 && repeat.get("488249600264896523")[1] == 0){
			repeat.get("488249600264896523")[1] = 1;
		bot.channels.get("693308633143967745").send("waiting x3");
	}else if(repeat.has("488249600264896523") && (Date.now() - repeat.get("488249600264896523")[0]) > 7.2e+6 && repeat.get("488249600264896523")[0] == 1){
		repeat.get("488249600264896523")[1] = 0;
		repeat.get("488249600264896523")[0] = Date.now();
		} else if (!repeat.has("488249600264896523")){
			repeat.set("488249600264896523", new Array());
			repeat.get("488249600264896523").push(Date.now());
			repeat.get("488249600264896523").push(0);
		} else {
			if(recent.has("488249600264896523") && cooldown - (Date.now() - recent.get("488249600264896523")[0]) < 0){
			recent.get("488249600264896523")[0] = Date.now();
				bot.channels.get("698128278547857439").send("pls beg");
		} else if (!recent.has("488249600264896523")){
			recent.set("488249600264896523", new Array());
			recent.get("488249600264896523").push(Date.now());
				bot.channels.get("698128278547857439").send("pls beg");
		}
		}
	
		if(dailies.has("488249600264896523") && daily - (Date.now() - dailies.get("488249600264896523")[0]) < 0){
			dailies.get("488249600264896523")[0] = Date.now();
			setTimeout(function(){
				bot.channels.get("698123867486683166").send("pls daily");
				}, 5000);
		} else if (!dailies.has("488249600264896523")){
			dailies.set("488249600264896523", new Array());
			dailies.get("488249600264896523").push(Date.now());
			setTimeout(function(){
				bot.channels.get("698123867486683166").send("pls daily");
				}, 5000);
		}
})

bot.login(process.env.BOT_TOKEN);
