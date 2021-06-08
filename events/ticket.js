module.exports = {
    type: 'messageReactionAdd',
    run: async (reaction, user) => {
        if (user.bot) return; // If the user was a bot, return.
        if (reaction.message.partial) {
            reaction.message.fetch()
          }
             if (reaction.emoji.name === "❌") {
       
                message.channel.send('You pressed a :x: Good Job now to this prize "      " See its nothing because all you did was press a X')
    }}}

