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
const logs = new Discord.WebhookClient(config.logsID, config.logsToken)
client.on("channelCreate", function(channel){
    const embed = new Discord.MessageEmbed()
    logs.send(`channelCreate: ${channel}`);
});

client.on("channelDelete", function(channel){
    const embed = new Discord.MessageEmbed()
    logs.send(`channelDelete: ${channel}`);
});

client.on("channelUpdate", function(oldChannel, newChannel){
    if(oldChannel.id == '850524440738398300') return
    const embed = new Discord.MessageEmbed()
    .setTitle('A channel has been Updated')
    .addField("Old channel Name", oldChannel.name, true)
    .addField("New Channel Name", newChannel.name, true)
    .addField("\u200B", "\u200B", true)
    .addField("Old channel topic", oldChannel.topic, true)
    .addField("New Channel Topic", newChannel.topic, true)
    .setColor('RANDOM')
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
    logs.send(`a user joins a guild: ${member.tag}`);
});

client.on("guildMemberRemove", function(member){
    const embed = new Discord.MessageEmbed()
    logs.send(`a member leaves a guild, or is kicked: ${member.tag}`);
});
client.on("messageDelete", function(message){
    if(message.author.bot) return
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
    logs.send(`a Bulk amount of messages have been deleted\n\n${messages}`);
});

client.on("messageUpdate", function(oldMessage, newMessage){
    if(oldMessage.author.bot) return
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
    logs.send(`New role was Made ${role}`);
});


client.on("roleDelete", function(role){
    const embed = new Discord.MessageEmbed()
    logs.send(`A role has been deleted ${role}`);
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