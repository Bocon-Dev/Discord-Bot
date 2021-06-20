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
        message.reply(`<#850026128353132594> Please check there as this command is disabled while DarkerInk remakes it`)
    }
}