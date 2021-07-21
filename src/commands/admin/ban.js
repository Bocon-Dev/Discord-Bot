const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'ban',
  description: "Bans someone fool",
  usage: "?ban Bocon",
  category: "Admin",
  run: async (client, message, args, config) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('EW you can\'t Ban people what a fool')
    const u = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let r = `Banned By ${message.author.tag}`
    if(args[1]) {
        r = args.slice(1).join(' ')
    }
    if(!u) return message.channel.send('Hmm, Did you mention someone? If so are they a real person in the server?')
    message.channel.send('Banned ' + u.user.tag)
    message.guild.members.ban(u, {reason: r })
}}