const {
    MessageEmbed
} = require('discord.js');
const {
    inspect
} = require('util');
const config = require('../../config/config.json');
const fs = require('fs')

module.exports = {
    name: "eval",
    description: "",
    usage: "",
    aliases: [],
    category: "Owner",
    hidden: true,
    run: async (client, message, args) => {
        const code = args.join(" ");
        if(!code) return message.channel.send('You didn\'t use the command right')
        const command = args.shift().toLowerCase();
        if(!config.owners.includes(message.author.id)) {
const responses = ["SyntaxError: Unexpected token F in JSON at position 48", "SyntaxError: Unexpected identifier", 'UnhandledPromiseRejectionWarning: DiscordAPIError: Missing Permissions', "TypeError: Cannot read property 'messages' of undefined", "UnhandledPromiseRejectionWarning: MongoError: bad auth : Authentication failed."]
                const dresponses = responses[Math.floor(Math.random() * responses.length)];
                const fakeembed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${dresponses}\n\`\`\``)
            .setColor('RED')
            return message.channel.send(fakeembed)
}
        try {
            let evaled = eval(code)
            .replace(client.token, "*".repeat(client.token.length));
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            const embed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${evaled}\n\`\`\``)
            .setColor('GREEN')
            return message.channel.send(embed)
        } catch (err) {
            const erroembed = new MessageEmbed()
            .setTitle('Eval')
            .addField(`InPut`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`OutPut`, `\`\`\`js\n${err.stack}\n\`\`\``)
            .setColor('RED')
            return message.channel.send(erroembed)
        }
    }
};