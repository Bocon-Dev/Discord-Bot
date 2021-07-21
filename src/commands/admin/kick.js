const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'kick',
  description: "Kicks someone",
  usage: "?kick Xcyth",
  category: "Admin",
  run: async (client, message, args, config) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('EW you can\'t Kick people what a fool')
    const u = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let r = `kicked By ${message.author.tag}`
    if(args[1]) {
        r = args.slice(1).join(' ')
    }
    if(!u) return message.channel.send('Hmm, Did you mention someone? If so are they a real person in the server?')
    message.channel.send('[FAKE MESSAGE] Kicked ' + u)
    u.kick([r])
}}