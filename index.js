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
		let daily = 8.64e+7 + 500;
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
