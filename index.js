const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chratis_cooldown_time = 10;
const chratis_talked_users = new Set();

const button_cooldown_time = 60;
const button_talked_users = new Set();

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
 });

bot.login(process.env.BOT_TOKEN);
