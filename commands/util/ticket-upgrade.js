const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'ticket-upgrade',
    description: "",
    usage: "",
    category: "Ticket",
    aliases: [""],
    run: async (client, message, args, config) => {
        //return message.channel.send('Not finished')
        if (!message.channel.name.includes("-ticket")) return message.channel.send('This is Not a Ticket Please use this command in a ticket');
        let supportrole = message.guild.roles.cache.find(role => role.id === "847600287421431828")
        message.channel.updateOverwrite(supportrole, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
            READ_MESSAGE_HISTORY: false,
            ATTACH_FILES: false,
        });
        return message.channel.send('**Ticket Upgraded**')
    }}