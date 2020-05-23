const discord = require('discord.js')
const bot = new discord.Client();
const config = require("./config.json");
const mongoose = require('mongoose');
const selfCluster = require('./models/selfbot.js');
const recent = new Map();
const dailies = new Map();
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
    let cooldown = 40300;
		let daily = 8.64e+7 + 500;
		if (recent.has("488249600264896523") && (Date.now() - recent.get("488249600264896523")[0]) > 11100 && recent.get("488249600264896523")[1] == 0){
                bot.channels.get("698128278547857439").send(`pls dep all`);
			recent.get("488249600264896523")[1] = 4;
		}
		if(recent.has("488249600264896523") && 45300 - (Date.now() - recent.get("488249600264896523")[2]) < 0){
			recent.get("488249600264896523")[2] = Date.now();
			bot.channels.get("698128278547857439").send("pls fish");
			recent.get("488249600264896523")[3] = 0;
		}
		if (recent.has("488249600264896523") && (Date.now() - recent.get("488249600264896523")[2]) > 6100 && recent.get("488249600264896523")[3] == 0){
			let selfbot = await selfCluster.findOne({
                userID: bot.user.id
              });
              if(selfbot){
                  if(selfbot.type != ""){
                      bot.channels.get("698128278547857439").send(`${selfbot.type}`);
                  }
              }
			recent.get("488249600264896523")[3] = 2;
	}
	if(recent.has("488249600264896523") && cooldown - (Date.now() - recent.get("488249600264896523")[0]) < 0){
		recent.get("488249600264896523")[0] = Date.now();
		recent.get("488249600264896523")[1] = 0;
		bot.channels.get("698128278547857439").send("pls beg");
	} else if (!recent.has("488249600264896523")){
		recent.set("488249600264896523", new Array());
		recent.get("488249600264896523").push(Date.now());
		recent.get("488249600264896523").push(0);//     search
		recent.get("488249600264896523").push(Date.now());
		recent.get("488249600264896523").push(0);
		bot.channels.get("695848294441812069").send("ok starting nowwwww x3");
	}
		if(dailies.has("488249600264896523") && daily - (Date.now() - dailies.get("488249600264896523")[0]) < 0){
			dailies.get("488249600264896523")[0] = Date.now();
			bot.channels.get("698123867486683166").send("pls daily");
		} else if (!dailies.has("488249600264896523")){
			dailies.set("488249600264896523", new Array());
			dailies.get("488249600264896523").push(Date.now());
			bot.channels.get("698123867486683166").send("pls daily");
		}
})

bot.login(process.env.BOT_TOKEN);