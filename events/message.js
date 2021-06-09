module.exports = {
    type: 'message',
    run: async (client, message) => {
        const prefix = '$';
        const config = require('../config/config.json')
        if (!message.content.startsWith(prefix)) return;

            if (!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (cmd.length === 0) return;
            global.command = client.commands.get(cmd);
                if (!command) command = client.commands.find((command) => command.aliases && command.aliases.includes(cmd));
                if (!command) return;
            if (command.ownerOnly && !config.owners.includes(message.author.id)) {
                return
            }
            if (command)
            try {
                let blacklisted = [
                    '847600313694289950', '847600314681131072',
                    '847600315482374145', '847600316186624051'
                ]
                if ((blacklisted.includes(message.channel.id)) && (message.member.roles.cache.find(r => r.id === '847266614491742231') == null)) return message.channel.send('[DEBUG] Command couldn\'t be used');
                command.run(client, message, args, config);
            } catch(err){
                console.log(err.stack)
            }
        }}