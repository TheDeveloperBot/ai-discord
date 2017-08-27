global.Discord = require('discord.js');
global.settings = require('./../settings.json');
global.bot = require('./bot');
global.pandorabot = require('./pandorabot')
bot.on("ready", () => {
    settings.channels.map((c) => {
        bot.channels.get(c).send("Hi folks");
    })
    //cleverbot.setNick(bot.user.username);
});

bot.on("message", async function (message) {
    if (settings.channels.includes(message.channel.id) && message.author.id != bot.user.id) {
        console.log(message.author.tag + " : " + message.cleanContent);
        let response = await pandorabot(message.cleanContent, message.author.tag);
        console.log("me : " + response);
        message.channel.send(response);
    }
});