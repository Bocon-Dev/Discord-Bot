const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'ticket-setup',
    description: "",
    usage: "",
    category: "Ticket",
    aliases: [""],
    run: async (client, message, args, config) => {
        em = await message.channel.send('Ay This is a test :D')
        await em.react('📧')
        await em.react('❌')

        em.awaitReactions(r => ['📧', '❌'].includes(r.emoji.name), {
            max: 9000000000,
            time: 900000000,
        }).then(async (collected) => {
            r = collected.first()

            if (r.emoji.name === '📧') {
               message.channel.send('Someone clicked on the 📧') 
            } else {
                message.channel.send('someone clicked on the :x:')
            }
        })
}}