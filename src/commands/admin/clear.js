const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'clear',
  description: "Clears The Mentioned Number of Messages",
  usage: "?clear 70",
  category: "Admin",
  aliases: ["c"],
  run: async (client, message, args, config) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You don\'t have the perms to do this command')
      const user = message.mentions.users.first()
      const amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[1])
      if (!amount) return message.channel.send("You need to give an amount");
      if (amount <= 1) return message.channel.send("Can only delete a min of 2 messages")
      if (amount >= 101) return message.channel.send("Can only delete a max of 100 messages")
      if (user) {
          return message.channel.messages.fetch({
              limit: `${amount}`
          }).then((messages) => {
              const botMessages = [];
              messages.filter(m => m.author.id === `${user.id}`).forEach(msg => botMessages.push(msg))
              message.channel.bulkDelete(botMessages).then(() => {
                  message.channel.send(`Cleared \`${amount}\` Messages from \`${user.username}\``).then(m => client.setTimeout(() => {
                      if (!m.deleted) m.delete()
                  }, 61000))
              });
          })
      }
      await message.channel.bulkDelete(amount, true).then(() => {
          message.channel.send(`Cleared \`${amount}\` Messages from \`${message.channel.name}\``).then(m => client.setTimeout(() => {
              if (!m.deleted) m.delete()
          }, 61000))
      });
  }
}