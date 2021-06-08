global.Discord = require("discord.js");
global.discord = require('discord.js');
const Util = require("discord.js")
const config = require('./config/config.json')
//
const client = new Discord.Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
   intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"]
})
const event_handler = require('./event');
const fs = require("fs");
require("dotenv").config();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Command Handler
function getDirectories() {
    return fs.readdirSync("./commands").filter(function subFolders(file) {
        return fs.statSync("./commands/" + file).isDirectory();
    });
}
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const folder of getDirectories()) {
    const folderFiles = fs
        .readdirSync("./commands/" + folder)
        .filter((file) => file.endsWith(".js"));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}
for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(`./commands/${file[0]}/${file[1]}`);
    } else {
        command = require(`./commands/${file}`);
    }
    client.commands.set(command.name, command);
    console.log(`Command Loaded: ${command.name}`)
}

event_handler.performEvents(client);

client.login(process.env.token)
global.logs = new Discord.WebhookClient(config.logsID, config.logsToken)
client.on("channelCreate", function(channel){
    const embed = new Discord.MessageEmbed()
    logs.send(`channelCreate: ${channel.name}`);
});

client.on("channelDelete", function(channel){
    const embed = new Discord.MessageEmbed()
    logs.send(`channelDelete: ${channel.name}`);
});

client.on("channelUpdate", function(oldChannel, newChannel){
    if(oldChannel.id == '850524440738398300') return
    if(oldChannel.topic != newChannel.topic){
        const oldtopic = oldChannel.topic;
        const newtopic = newChannel.topic;
        const topicchange = new Discord.MessageEmbed()
        .setTitle('A Channels topic has been changed')
        .addField('Old Channels topic', `${oldtopic || 'null'}`, true)
        .addField('New channels topic', `${newtopic || 'null'}`, true)
        .setColor('RANDOM') 
        return logs.send(topicchange);
    }  
    if(oldChannel.name != newChannel.name){
        const newname = new Discord.MessageEmbed()
        .setTitle('A Channels Name has been changed')
    .addField("Old channel Name", oldChannel.name, true)
    .addField("New Channel Name", newChannel.name, true)
    .setColor('RANDOM')
    return logs.send(newname);
    }
    const embed = new Discord.MessageEmbed()
    .setTitle('A channel has been Updated')
    .setDescription('I don\'t know what changed....')
    logs.send(embed);
});

client.on("emojiCreate", function(emoji){
    const embed = new Discord.MessageEmbed()
    logs.send(`a custom emoji is created in a guild ${emoji}`);
});

client.on("emojiDelete", function(emoji){
    const embed = new Discord.MessageEmbed()
    logs.send(`a custom guild emoji is deleted ${emoji}`);
});

client.on("emojiUpdate", function(oldEmoji, newEmoji){
    const embed = new Discord.MessageEmbed()
    logs.send(`a custom guild emoji is updated ${oldEmoji.name} ${newEmoji.name}`);
});

client.on("guildBanAdd", function(guild, user){
    const embed = new Discord.MessageEmbed()
    logs.send(`a member is banned from a guild`);
});

client.on("guildBanRemove", function(guild, user){
    const embed = new Discord.MessageEmbed()
    logs.send(`a member is unbanned from a guild`);
});

client.on("guildMemberAdd", function(member){
    const embed = new Discord.MessageEmbed()
    logs.send(`a user joins a guild: ${member}`);
});

client.on("guildMemberRemove", function(member){
    const embed = new Discord.MessageEmbed()
    logs.send(`a member leaves a guild, or is kicked: ${member}`);
});

client.on("messageDelete", function(message){
    if(message.author.bot) return
    if(message.author.id == '379781622704111626') return //Doing this only for now as it is pissing me off that It logs when I'm using the damn eval command
    const logd = new Discord.MessageEmbed()
		.setTitle(`Message deleted By, ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .addField("Channel", `<#${message.channel.id}>`)
		.setDescription(`> ${message.content}`) 
		.setFooter(`ID: ${message.author.id}`)
		.setTimestamp()
		.setColor("RED")
    logs.send(logd);
});

client.on("messageDeleteBulk", function(messages){
    const output = messages.reduce((out, msg) => {
        const attachment = msg.attachments.first();
			out += `${msg.author.tag}: ${msg.cleanContent ? msg.cleanContent.replace(/\n/g, '\r\n') : ''}${attachment ? `\r\n${attachment.url}` : ''}\r\n`;
			return out;
		}, '');
    const embed = new Discord.MessageEmbed()
      .setDescription(`${messages.size} messages bulk deleted in ${messages.first().channel}.`)
      .setColor('RANDOM')
      .setTimestamp();
      logs.send({
        embeds: [embed],
        files: [{ attachment: Buffer.from(output, 'utf8'), name: 'logs.txt' }],
      });
  });

client.on("messageUpdate", function(oldMessage, newMessage){
    if(oldMessage.author.bot) return
    if (oldMessage.content === newMessage.content && newMessage.embeds.length<oldMessage.embeds.length) return
            if (oldMessage.content === newMessage.content && newMessage.embeds.length>oldMessage.embeds.length) return
    const log = new Discord.MessageEmbed()
        .setAuthor(`${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`Message Edited in #${oldMessage.channel.name}`)
        .setDescription(`**Before:** ${oldMessage.content}\n**After:** ${newMessage.content}`)
        .addField(`Message Link`, `[click here](${oldMessage.url})`)
        .setFooter(`ID: ${oldMessage.author.id}`)
        .setTimestamp()
        .setColor("YELLOW")
    logs.send(log);
});

client.on("roleCreate", function(role){
    logs.send(`New role was Made ${role.name}`);
});


client.on("roleDelete", function(role){
    const embed = new Discord.MessageEmbed()
    logs.send(`A role has been deleted ${role.name}`);
});

client.on("roleUpdate", function(oldRole, newRole){
    const embed = new Discord.MessageEmbed()
    logs.send(`A role has been updated`);
});




client.on("guildMemberUpdate", (oldMember, newMember) => {
    const addedRoles = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id));
    const removedRoles = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id));
    const added = addedRoles.map(r => r).join(", "); 
    const removed = removedRoles.map(r => r).join(", "); 
    const embed = new Discord.MessageEmbed()
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        embed.setDescription(`${oldMember} Has goten a Role('s) Added`)
            .addField('Added', `${added}`)
            .setColor('RANDOM')
            return logs.send(embed)
    }
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        embed.setDescription(`${oldMember} Has goten a Role('s) Removed`)
            .addField('Removed', `${removed}`)
            .setColor('RANDOM')
            return logs.send(embed)
    }
    if(oldMember.displayName != newMember.displayName) {
        if(newMember.displayName.includes('darkisdumb'))
        return newMember.setNickname('why are you so mean :C')
        const newNick = new Discord.MessageEmbed()
        .setTitle('A user has a new Nickname.')
        .setDescription(`${oldMember} Has changed their NickName`)
        .addField("Old Nickname", oldMember.displayName, true)
        .addField("New Nickname", newMember.displayName, true)
        .setColor('RANDOM')
        return logs.send(newNick)
    }
})

client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return
    let category = reaction.message.guild.channels.cache.find(c => c.id === "850558312952889374" && c.type === "category");
    if (!category) return reaction.message.reply('Please contact a Admin, The category **DarkerInk** Set doesn\'t exist and This is a problem')
    if(reaction.emoji.name == "🍑" && reaction.message.id == '851708205482770443')
        return reaction.message.guild.channels.create(`${user.tag}-dcsup-ticket`, {
            parent: category,
        }).then(c => {
            c.send(`You Chose Discord Support\nMESSAGE NOT FOUND\n<@!${user.id}>`)
            reaction.message.channel.send(`<@${user.id}>, You chose Discord Support Please check <#${c.id}> for your ticket`).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 10000))
        })
    if(reaction.emoji.name == "🍆" && reaction.message.id == '851708205482770443')
        return reaction.message.guild.channels.create(`${user.tag}-ptsup-ticket`, {
            parent: category,
        }).then(c => {
            c.send(`You Chose Pterodactyl support\nMESSAGE NOT FOUND\n<@!${user.id}>`)
            reaction.message.channel.send(`<@${user.id}>, You chose Discord Support Please check <#${c.id}> for your ticket`).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 10000))
        })
    if(reaction.emoji.name == "🤔" && reaction.message.id == '851708205482770443')
        return reaction.message.guild.channels.create(`${user.tag}-otsup-ticket`, {
            parent: category,
        }).then(c => {
            c.send(`You Chose Other Support\nMESSAGE NOT FOUND\n<@!${user.id}>`)
            reaction.message.channel.send(`<@${user.id}>, You chose Other Support Please check <#${c.id}> for your ticket`).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 10000))
        })
});