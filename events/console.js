const process = require('child_process');
const config = require('../config/config.json')
const console = new Discord.WebhookClient(config.consoleID, config.consoleTOKEN);
module.exports = {
    type: 'message',
    run: async (client, message) => {
        if(message.author.bot) return
        if(!config.owners.includes(message.author.id)) {
            return
        }
        if(message.content.startsWith('>')) return
        if(message.content.includes('du')) return console.send('```\nError: Command failed: du\n/bin/sh: 1: and: blacklisted by owner\n```')
        if(message.content.includes('npm list')) return console.send('```\nError: Command failed: npm list\n/bin/sh: 1: and: blacklisted by owner\n```')
        if(message.content.startsWith('npx pm2 restart 0')) console.send('```\nRESTARTING <@!745906240886013982>\n```')
        if(message.content.startsWith('git pull && npx pm2 restart 0')) console.send('```\nPulling From Github and Restarting <@!745906240886013982>\n```')
        if(message.content.startsWith('console.clear()')) return message.channel.bulkDelete('100', true).then(() => {
            message.channel.send(`Cleared \`${amount}\` Messages from \`${message.channel.name}\``).then(m => client.setTimeout(() => { if(!m.deleted) m.delete() }, 61000))
             });
        if(config.console.includes(message.channel.id)){
            process.exec(`${message.content}`, (error, stdout) => {
                let result = (stdout || error);
                console.send(`\`\`\`\n${result}\n\`\`\``, { split: true })
            })
        }
    }}
