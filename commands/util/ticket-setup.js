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
        return message.reply('Not finished yet, rember to import quick.db')
        message.channel.send('Bocon Hosting support!\n\nPlease react to the emoji where you need help with.\n\n:white_check_mark: = Discord Support.\n\n:earth_americas: = Pterodactyl Support.\n\n:shopping_cart: = Other Support.')
.then(m => m.react(':white_check_mark:') && m.react(':earth_americas:') && m.react( ':shopping_cart:'))
    }}