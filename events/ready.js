
const config = require('../config/config.json')
const githubhook = new Discord.WebhookClient(config.gitpullhookid, config.gitpullhooktoken);
const exec = require('child_process').exec;
module.exports = {
    type: 'ready',
    async run(client) {
        client.channels.cache.get('850026128353132594').messages.fetch('851708205482770443')
        console.log(`ready.js has been loaded`);
        let statuses = [
            `Users Talk`,
            `People get Banned`,
            `Bocon Host grow`,
            `He wasn\'t seen again`,
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
                githubhook.send('**[AUTOMATIC]** \nNew update on GitHub. Pulling. \n\nLogs: \n```' + response + "```" + "\n\n\n**Restarting bot**")
                setTimeout(() => {
                process.exit()
                }, 1000)
            };
        }
    })
}, 10000)

        setInterval(() => {
            var oss = require('os-utils');
    const ms = require('ms')
    const os = require('os')
    const channel = client.channels.cache.get('850524440738398300')
    function formatBytes(bytes) {
                    if (bytes === 0) return '0 Bytes';
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                    const i = Math.floor(Math.log(bytes) / Math.log(1024));
                    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
                }
    oss.cpuUsage(function(v){
    channel.setTopic(`MEM USAGE: ${formatBytes(process.memoryUsage().heapUsed)}\nCPU Usage: ${v.toFixed(2)}%\nUPTIME: ${ms(os.uptime() * 1000, { long: true })}\nPING: ${client.ws.ping}\nDan Is hot`)
    });
        }, 30000)
        setInterval(() => {
            let status = statuses[Math.floor(Math.random() * statuses.length)]
            client.user.setActivity(status, {
                type: `WATCHING`,
            });
        }, 15000)
    },
};