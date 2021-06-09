const {
    MessageEmbed
} = require("discord.js");
const db = require('quick.db')
module.exports = {
    name: 'ticket-setup',
    description: "",
    usage: "",
    category: "Ticket",
    aliases: [""],
    run: async (client, message, args, config) => {
        const messageID = args[0]
        const channelID = args[1]
        const emoji1 = args[2]
        const emoji2 = args[3]
        const emoji3 = args[4]
        if(!messageID) return message.channel.send(`You didn't give a vaild messageID`)
        if(!channelID) return message.channel.send(`You didn't give a vaild channelID`)
        if(!emoji1) return message.channel.send(`You didn't give a vaild emoji1`)
        if(!emoji2) return message.channel.send(`You didn't give a vaild emoji2`)
        if(!emoji3) return message.channel.send(`You didn't give a vaild emoji3`)
        message.channel.send(`MSG: ${messageID}\nchannelID: ${channelID}\nEMJI1: ${emoji1}\nEMJI2: ${emoji2}\nemoji3:${emoji3}`)
    }}