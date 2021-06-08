const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'help',
    description: "",
    usage: "",
    category: "Util",
    aliases: [""],
    run: async (client, message, args, config) => {
        const embed = new MessageEmbed()
        .setTitle('Commands')
        .addField('Utility Commands', 'Help - Get list of commands\nping - get the ping')
        .addField('Ticket Commands', 'ticket-close - close a ticket\nticket-new - make a new ticket\nticket-setup - setup a reaction system\nticket-upgrade - upgrade a ticket to a higher up')
        .addField('Owner Commands', 'eval - eval code\nclear - clear messages')
        message.reply(embed)
    }}