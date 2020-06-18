const discord = require('discord.js')
const bot = new discord.Client();
const config = require("./config.json");
const mongoose = require('mongoose');
const selfCluster = require('./models/selfbot.js');
const recent = new Map();
const dailies = new Map();
const repeat = new Map();
let begID = "";
mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}`);
	bot.channels.get("695848294441812069").send(`ok starting now x3`);
    let selfbot = await selfCluster.findOne({
        userID: bot.user.id
      });
      if(!selfbot){
	      bot.guilds.get("690792474352025610").createChannel(bot.user.username, "text").then(channel => {
          channel.setParent('695839328437403688');
          begID = channel.id;
        }).catch(console.error);
        selfbot = new selfCluster({
            userID: bot.user.id,
            giveAmt: 0,
            type: ""
          }); 
	      selfbot.type = begID;
      } else {
	      if(selfbot.type != ""){ 
		      begID = selfbot.type;
	      } else {
		     bot.guilds.get("690792474352025610").createChannel(bot.user.username, "text").then(channel => {
          channel.setParent('695839328437403688');
          begID = channel.id;
			     selfbot.type = channel.id
        }).catch(console.error);
	      }
	      
      }
	await selfbot.save().catch(e => console.log(e))
  });


var interval = setInterval (async function () {
		let daily = 8.64e+7 + 500;
	let cooldown = 40200;
	if(repeat.has("488249600264896523") && (Date.now() - repeat.get("488249600264896523")[0]) > (repeat.get("488249600264896523")[2] * 3.6e+6)&& repeat.get("488249600264896523")[1] == 0){
			repeat.get("488249600264896523")[1] = 1;
		bot.channels.get("693308633143967745").send(`ON: \`${repeat.get("488249600264896523")[2]}h\`\nOFF: \`${repeat.get("488249600264896523")[2]}h\`\nTOTAL: \`${repeat.get("488249600264896523")[2] + repeat.get("488249600264896523")[3]}h\``);
	}else if(repeat.has("488249600264896523") && (Date.now() - repeat.get("488249600264896523")[0]) > (repeat.get("488249600264896523")[2] * 3.6e+6) + (repeat.get("488249600264896523")[3] * 3.6e+6)&& repeat.get("488249600264896523")[1] == 1){
		repeat.get("488249600264896523")[1] = 0;
		repeat.get("488249600264896523")[0] = Date.now();
		bot.channels.get("693308633143967745").send("ok back to work");
		repeat.get("488249600264896523")[2] = Math.round(Math.random() * 2) + 4;
		repeat.get("488249600264896523")[3] = Math.round(Math.random() * 2) + 4;
		} else if (!repeat.has("488249600264896523")){
			repeat.set("488249600264896523", new Array());
			repeat.get("488249600264896523").push(Date.now());//   0
			repeat.get("488249600264896523").push(0); //           1
			repeat.get("488249600264896523").push(Math.round(Math.random() * 2) + 4); // random time between 4 hour to 6 hour (this is the on time)
			repeat.get("488249600264896523").push(Math.round(Math.random() * 2) + 4); // random time between 4 hour to 6 hour (this is the off time)
		}
	if(repeat.get("488249600264896523")[1] == 0){
		if(recent.has("488249600264896523") && cooldown - (Date.now() - recent.get("488249600264896523")[0]) < 0){
			recent.get("488249600264896523")[0] = Date.now();
				bot.channels.get(begID).send("pls beg");
		} else if (!recent.has("488249600264896523")){
			recent.set("488249600264896523", new Array());
			recent.get("488249600264896523").push(Date.now());
				bot.channels.get(begID).send("pls beg");
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
