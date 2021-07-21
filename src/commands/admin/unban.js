const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'unban',
  description: "Unbans someone",
  usage: "?unban <id>",
  category: "Admin",
  run: async (client, message, args, config) => {
      try {
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('EW you can\'t UnBan people what a fool')
      if(!args[0]) return message.channel.send('Please use the users ID you want to unban')
      const u = message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0])
      let r = `Unbanned By ${message.author.tag}`
      if(args[1]) {
          r = args.slice(1).join(' ')
      }
      const allBans = await message.guild.fetchBans()
      const bannedUser = allBans.get(u.id)
      if(!bannedUser) return message.channel.send('User Isn\'t Banned')
      message.guild.members.unban(u.id, [r])
      message.channel.send('User Unbanned')
    } catch(err) {
        message.reply('Does the user exist?')
    }}}