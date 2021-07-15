const config = require('../config/config.json')
const githubhook = new Discord.WebhookClient(config.gitpullhookid, config.gitpullhooktoken);
const exec = require('child_process').exec;
module.exports = {
    type: 'ready',
    async run(client) {
        setInterval(async () => {
            const channel = client.channels.cache.get('847600308661518336')
            let node1 = nodeStatus.get('node1'.toLowerCase()).status
            if (node1 === true) node1 = `<:green:850793782965567508> Running`
            if (node1 === false) node1 = `<:yellow:854610262983049216> Wings Down`
            if (node1 === null) node1 = `<:red:849844404235927613> Node Offline`
            let messages = await channel.messages.fetch({
                limit: 10
            })
            const embed = new Discord.MessageEmbed()
                .setTitle('Basic Node Checker')
                .addField('Node 1', `${node1}`)
                .setTimestamp()
                .setFooter('This does not check the panel or proxy only node 1')
                .setColor('BLURPLE')
            messages = messages.filter(x => x.author.id === client.user.id).last();
            if (messages == null) channel.send(embed)
            else messages.edit(embed)

        }, 6000)
        let statuses = [
            `Users Talk`,
            `People get Banned`,
            `Bocon Host grow`,
            `Discord\'s API`,
            `My Prefix Is $`
        ]

        // Credit goes to DanBot hosting's discord bot
        setInterval(() => {
            exec(`git pull`, (error, stdout) => {
                let response = (error || stdout);
                if (!error) {
                    if (response.includes("Already up to date.")) {
                        //console.log('Bot already up to date. No changes since last pull')
                    } else {
                        githubhook.send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**", {
                            split: true
                        })
                        setTimeout(() => {
                            process.exit()
                        }, 1000)
                    };
                }
            })
        }, 10000)

        setInterval(() => {
            var osu = require('node-os-utils')
            const ms = require('ms')
            const os = require('os')
            const channel = client.channels.cache.get('850524440738398300')

            function formatBytes(bytes) {
                if (bytes === 0) return '0 Bytes';
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                const i = Math.floor(Math.log(bytes) / Math.log(1024));
                return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
            }
            var cpu = osu.cpu
            cpu.usage()
                .then(info => {
                    channel.setTopic(`MEM USAGE: ${formatBytes(process.memoryUsage().heapUsed)}\nCPU Usage: ${info}%\nUPTIME: ${ms(os.uptime() * 1000, { long: true })}\nPING: ${client.ws.ping}\nDan Is hot`)
                })
        }, 30000)
        setInterval(() => {
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setActivity(status, {
                type: `WATCHING`,
            });
        }, 15000)
    },
};
