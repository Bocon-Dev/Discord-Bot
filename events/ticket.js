module.exports = {
    type: 'messageReactionAdd',
    run: async (reaction, user) => {
        if (user.bot) return; // If the user was a bot, return.
      
        if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
       
             if (reaction.emoji.name === "❌") {
       
                  message.channel.send('You pressed a :x: Good Job now to this prize "      " See its nothing because all you did was press a X')
    }}}

