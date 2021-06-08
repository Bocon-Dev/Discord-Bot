const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'ticket-close',
    description: "",
    usage: "",
    category: "Ticket",
    aliases: [""],
    run: async (client, message, args, config) => {
        if (!message.channel.name.includes("-ticket")) return message.channel.send('This is Not a Ticket Please use this command in a ticket');
            const embed = new Discord.MessageEmbed()
                .setTitle('Are you sure?')
                .setDescription('Do you really want to close #' + message.channel.name + '?\n**This will delete __all__ the channel content!**')
                .setColor('#e74c3c')
                .setTimestamp()
                .setFooter('You have 60s to react')

            em = await message.channel.send('Do you really want to close #' + message.channel.name + '? If you want to close this ticket just press ✅')
            await em.react('✅')
            await em.react('❌')

            em.awaitReactions(r => ['✅', '❌'].includes(r.emoji.name), {
                max: 1,
                time: 60000
            }).then(async (collected) => {
                r = collected.first()

                if (r.emoji.name === '✅') {
                    message.channel.delete()
                } else {
                    message.channel.send('Canceled')
                }
            })
    }}