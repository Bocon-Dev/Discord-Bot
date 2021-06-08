module.exports = {
    type: 'messageReactionAdd',
    run: async (client, reaction, user) => {
        if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if(!message) return;
  if(user.bot) return;
  if(!message.id == '851661776037740556') return logs.send('Wrong Message')
  message.channel.send('Right Message ID')
    }}