const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const chratis_cooldown_time = 10;
const chratis_talked_users = new Set();

const button_cooldown_time = 60;
const button_talked_users = new Set();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
	bot.channels.filter(c => c.name === 'adbot-status').forEach(channel => channel.send(`AdBot has just restarted.`));
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
 });

bot.login(process.env.BOT_TOKEN);
