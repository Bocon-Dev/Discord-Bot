const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'ticket-new',
    description: "",
    usage: "",
    category: "Ticket",
    aliases: ["ticket new"],
    run: async (client, message, args, config) => {
        let category = message.guild.channels.cache.find(c => c.id === "850558312952889374" && c.type === "category");
    if (!category) return message.reply('Please contact a Admin, The category **DarkerInk** Set doesn\'t exist and This is a problem')
    message.guild.channels.create(`${message.author.tag}-ticket`, {
        parent: category,
    }).then(c => {
        c.send(`<@!${message.author.id}> Ayo Come check your ticket fool`)
        message.reply(`Please check <#${c.id}> for your ticket`)
    })

    }}