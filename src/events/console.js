const process = require('child_process');
const config = require('../config/config.json')
const console = new Discord.WebhookClient(config.consoleID, config.consoleTOKEN);
module.exports = {
    type: 'message',
    run: async (client, message) => {
        if (message.author.id.includes('851299738003308554')) return

        if (config.console.includes(message.channel.id)) {
            if (!message.author.id.includes('379781622704111626')) {
                return console.send('Due to me working on the bot on my laptop this will only work for me atm sry')
            }
            if (message.content.startsWith('>')) return
            if (message.content.includes('du')) return console.send('```\nError: Command failed: du\n/bin/sh: 1: and: blacklisted by owner\n```')
            if (message.content.includes('npm list')) return console.send('```\nError: Command failed: npm list\n/bin/sh: 1: and: blacklisted by owner\n```')
            if (message.content.includes('.env')) return console.send(`\`\`\`\nError: Command failed: ${message.content} \n/bin/sh: 1: and: blacklisted by owner\n\`\`\``)
            if (message.content.startsWith('npx pm2 restart 0')) console.send('\`\`\`\nRESTARTING ${client.user.tag}\n\`\`\`')
            if (message.content.startsWith('git pull && npx pm2 restart 0')) console.send(`\`\`\`\nPulling From Github and Restarting ${client.user.tag}\n\`\`\``)
            if (message.content.startsWith('console.clear()')) return message.channel.bulkDelete('100', true)
            process.exec(`${message.content}`, (error, stdout) => {
                let result = (stdout || error);
                console.send(`\`\`\`\n${result}\n\`\`\``, {
                    split: true
                })
            })
        }
    }
}