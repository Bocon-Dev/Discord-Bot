module.exports = {
    name: 'ping',
    description: "Get the ping",
    usage: "",
    category: "",
    aliases: [],
    run: async (client, message, args, config) => {
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Ping")
            .setDescription(`API Latency: ${Math.round(client.ws.ping)}ms`)
            .setTimestamp()
        message.channel.send(embed)
    }
}