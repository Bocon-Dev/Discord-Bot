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
        message.channel.send('Not finished')
    }}